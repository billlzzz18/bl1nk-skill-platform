1) Model Profile Schema v1 (TypeScript)

เป้าหมาย: โปรไฟล์โมเดลเป็น “ข้อมูลจริง” สำหรับการตัดสินใจระดับโค้ด (cost/latency/capabilities/constraints) ไม่ใช่โน้ตใน prompt

// profiles/model-profile.v1.ts
export type Provider = 'bedrock' | 'anthropic' | 'openai' | 'google' | 'openrouter' | 'local';

export type Modality = 'text' | 'text+tools' | 'text+vision' | 'embeddings' | 'rerank';

export type StructuredOutput =
  | { kind: 'none' }
  | { kind: 'json_schema'; maxObjectBytes?: number }
  | { kind: 'json_mode' };

export type ToolingSupport =
  | { kind: 'none' }
  | { kind: 'function_calling'; maxTools?: number; parallel?: boolean };

export type PromptCachingSupport =
  | { kind: 'none' }
  | { kind: 'explicit'; minCacheTokens?: number; ttlSeconds?: number }
  | { kind: 'provider_managed' };

export interface PricePerMTokens {
  inputUSD: number;
  outputUSD: number;
}

export interface LatencyProfile {
  p50Ms: number;
  p95Ms: number;
  variance: 'low' | 'med' | 'high';
}

export interface ModelConstraints {
  regions?: string[];                // จำกัด region ที่เรียกได้
  maxRps?: number;                   // โควต้าโดยประมาณ
  disallowedRoutes?: string[];        // กันไม่ให้ใช้กับงานบางชนิด
  notes?: string;
}

export interface ModelReliability {
  // ค่าที่ระบบค่อยๆเรียนรู้เองจาก telemetry (เริ่ม 0.5 หรือ 1.0)
  successRate: number;               // 0..1
  jsonCompliance: number;            // 0..1
  toolSuccessRate: number;           // 0..1
  hallucinationRisk: 'low'|'med'|'high';
}

export interface ModelCapabilities {
  modality: Modality;
  contextWindowTokens: number;
  maxOutputTokens: number;
  supportsStreaming: boolean;
  structuredOutput: StructuredOutput;
  tooling: ToolingSupport;
  promptCaching: PromptCachingSupport;
  supportsCitations?: boolean;
  supportsLongContextReasoning?: boolean;
}

export interface DefaultParams {
  temperature: number;
  topP?: number;
  maxTokens?: number;                // ใช้เป็น default override บาง provider
  stopSequences?: string[];
}

export interface ModelProfileV1 {
  v: 1;
  id: string;                        // key ภายในแพลตฟอร์ม เช่น "claude.sonnet.4_5"
  provider: Provider;
  providerModelId: string;           // เช่น bedrock modelId
  displayName: string;

  capabilities: ModelCapabilities;
  pricing: PricePerMTokens;
  latency: LatencyProfile;

  strengths: string[];               // ['coding','agentic','summarize','multilingual',...]
  constraints?: ModelConstraints;

  reliability: ModelReliability;
  defaultParams: DefaultParams;

  // routing hints แบบ deterministic (ไม่พึ่ง prompt)
  routingHints?: {
    preferredForStages?: StageType[];    // step ไหนเหมาะ เช่น router/plan/execute/verify
    avoidForStages?: StageType[];
    preferWhen?: Array<{ feature: string; op: '>'|'>='|'<'|'<='|'=='|'!='; value: number|string|boolean }>;
  };
}

export type StageType =
  | 'route'
  | 'plan'
  | 'retrieve'
  | 'rerank'
  | 'execute'
  | 'verify'
  | 'summarize'
  | 'embed';


---

2) FlowGraph Schema v1 + “สคีม่าโฟลว์” (Graph + Nodes + Policies)

FlowGraph คือ “เครื่องจักร” ที่ทำให้ระบบไหลเอง ไม่ใช่ให้ผู้ใช้เลือก flow

// flow/flowgraph.v1.ts
export type StepType =
  | 'route'
  | 'plan'
  | 'memory.read'
  | 'retrieve.vector'
  | 'retrieve.kb'
  | 'rerank'
  | 'context.pack'
  | 'llm.invoke'
  | 'tool.invoke'
  | 'validate'
  | 'memory.write'
  | 'observe';

export interface Budget {
  maxInputTokens?: number;
  maxOutputTokens?: number;
  maxTotalTokens?: number;
  maxCostUSD?: number;
  maxLatencyMs?: number;
}

export interface RetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  retryOn: Array<'timeout'|'rate_limit'|'5xx'|'tool_error'|'parse_error'>;
}

export interface Edge {
  to: string;
  when: 'always' | 'on_success' | 'on_fail' | 'on_condition';
  condition?: {
    // อ้าง output field ของ step ก่อนหน้า
    expr: string; // เช่น "output.validation.passed == true"
  };
}

export interface StepBase {
  id: string;
  type: StepType;
  name?: string;

  budget?: Budget;
  retry?: RetryPolicy;
  timeoutMs?: number;

  // enforcement hard-stop flags
  enforce?: {
    budgetHardStop?: boolean;     // เกิน budget แล้วหยุด (ไม่ถามผู้ใช้)
    scopeHardStop?: boolean;      // tool scope ผิดหยุด
    schemaHardStop?: boolean;     // json/schema ไม่ผ่าน หยุดหรือเข้า repair-loop
  };

  next: Edge[];
}

export interface RouteStep extends StepBase {
  type: 'route';
  params: {
    routerConfigRef: string;       // อ้าง config ที่จะ merge ตาม layer
  };
}

export interface PlanStep extends StepBase {
  type: 'plan';
  params: {
    // output ของ plan ต้องเป็น deterministic plan object
    planSchemaRef: string;         // JSON schema id หรือ zod id
  };
}

export interface RetrieveVectorStep extends StepBase {
  type: 'retrieve.vector';
  params: {
    storeRef: string;
    profileRef: string;            // retrieval profile
  };
}

export interface RerankStep extends StepBase {
  type: 'rerank';
  params: {
    rerankProfileRef: string;      // voyage rerank model + topK
  };
}

export interface ContextPackStep extends StepBase {
  type: 'context.pack';
  params: {
    tokenBudgetRef: string;        // rule สำหรับ pack context ให้พอดีงบ
    citationPolicyRef?: string;
  };
}

export interface LlmInvokeStep extends StepBase {
  type: 'llm.invoke';
  params: {
    modelPolicyRef: string;        // model routing policy (stage-based)
    promptTemplateRef: string;     // ใช้ได้ แต่ “logic” อยู่ที่ plan/route
    outputSchemaRef?: string;      // บังคับรูปแบบผลลัพธ์
  };
}

export interface ToolInvokeStep extends StepBase {
  type: 'tool.invoke';
  params: {
    toolGroupRef: string;
    // “ไม่ยืนยันทุกครั้ง” แต่ enforce scope+guardrail ที่นี่
    toolSelectionMode: 'planned'|'best_of_n';
  };
}

export interface ValidateStep extends StepBase {
  type: 'validate';
  params: {
    validatorStackRef: string;     // ชุด validator ตาม route/skill
    onFail: 'repair'|'fallback'|'stop';
  };
}

export type Step =
  | RouteStep
  | PlanStep
  | RetrieveVectorStep
  | RerankStep
  | ContextPackStep
  | LlmInvokeStep
  | ToolInvokeStep
  | ValidateStep
  | StepBase; // สำหรับ memory/observe ที่เรียบง่าย

export interface FlowGraphV1 {
  v: 1;
  id: string;
  name: string;
  entryStepId: string;

  // graph-level budgets/caps (กัน runaway)
  budget?: Budget;

  steps: Step[];

  // map สำหรับ “layered config”
  configLayerRefs: {
    router: string;           // base router config
    validation: string;       // base validation config
  };
}


---

3) DecisionLog Schema v1 (Event-sourced + audit + learning)

DecisionLog คือ “หลักฐาน” + “ข้อมูลฝึกปรับ policy” เพื่อทำให้ผลลัพธ์คงที่ระดับแบรนด์

// obs/decisionlog.v1.ts
export type DecisionEventType =
  | 'route_decision'
  | 'plan_decision'
  | 'model_select'
  | 'retrieval_plan'
  | 'retrieval_result'
  | 'rerank_result'
  | 'tool_select'
  | 'tool_call'
  | 'validation_result'
  | 'repair_action'
  | 'budget_event'
  | 'final_outcome';

export interface DecisionCommon {
  ts: string;                 // ISO timestamp
  traceId: string;            // end-to-end
  runId: string;              // one execution
  flowId: string;
  stepId: string;
  eventType: DecisionEventType;
  severity?: 'info'|'warn'|'error';
}

export interface RouteDecisionEvent extends DecisionCommon {
  eventType: 'route_decision';
  inputFeatures: Record<string, unknown>;     // extracted features (no PII ideally)
  chosenRoute: string;
  chosenSkillId?: string;
  chosenAgentId?: string;
  budgets: {
    maxCostUSD?: number;
    maxLatencyMs?: number;
    maxTokens?: number;
  };
  scores?: Record<string, number>;            // route candidates scores
  reasonCodes: string[];                      // deterministic reason tags
}

export interface ModelSelectEvent extends DecisionCommon {
  eventType: 'model_select';
  stage: 'route'|'plan'|'execute'|'verify'|'summarize';
  candidates: Array<{ modelProfileId: string; score: number; reasonCodes: string[] }>;
  chosen: { modelProfileId: string; params: Record<string, unknown> };
}

export interface ValidationResultEvent extends DecisionCommon {
  eventType: 'validation_result';
  passed: boolean;
  checks: Array<{
    name: string;
    passed: boolean;
    metrics?: Record<string, number>;
    details?: string;
  }>;
  onFail: 'repair'|'fallback'|'stop';
}

export interface FinalOutcomeEvent extends DecisionCommon {
  eventType: 'final_outcome';
  status: 'success'|'fallback'|'failed';
  costUSD?: number;
  latencyMs?: number;
  tokens?: { input: number; output: number; total: number };
  artifacts?: Array<{ kind: string; uri: string; hash?: string }>;
}

export type DecisionEvent =
  | RouteDecisionEvent
  | ModelSelectEvent
  | ValidationResultEvent
  | FinalOutcomeEvent
  | (DecisionCommon & Record<string, unknown>);

export interface DecisionLogV1 {
  v: 1;
  traceId: string;
  runId: string;
  sessionId?: string;

  // สำหรับ debug/brand guarantee
  events: DecisionEvent[];

  // summary ที่สรุปทีหลัง (ไม่ใช้ตัดสินใจ realtime)
  summary?: {
    route?: string;
    modelPath?: string[];          // sequence ของ modelProfileId ที่ถูกใช้
    validationPassed?: boolean;
    finalStatus?: string;
  };
}


---

4) Router Config v1 (Layered, deterministic, ไม่พึ่ง prompt)

แนวคิด: Router config “ซ้อนเลเยอร์” ได้ (global → tenant → workspace → project → environment → runtime overrides) แล้ว merge ให้เหลือ policy ชุดเดียวต่อ request

// router/router-config.v1.ts
export type ConfigLayer = 'global'|'tenant'|'workspace'|'project'|'environment'|'runtime';

export interface RouterBudgets {
  defaultMaxCostUSD: number;
  defaultMaxLatencyMs: number;
  defaultMaxTokens: number;
  escalationMaxCostUSD?: number;    // เพดานเวลาต้อง escalate
}

export interface RouteRule {
  id: string;
  route: string;                    // เช่น "doc_qa"
  priority: number;

  // deterministic matchers
  matchAny?: Array<{ type: 'regex'|'keyword'|'mime'|'path_glob'; value: string }>;
  matchAll?: Array<{ type: 'regex'|'keyword'|'mime'|'path_glob'; value: string }>;
  exclude?: Array<{ type: 'regex'|'keyword'; value: string }>;

  // outputs
  skillId?: string;
  agentId?: string;
  retrievalProfileRef?: string;
  validationProfileRef?: string;
  riskTier?: 'low'|'med'|'high';
}

export interface StageModelPolicy {
  stage: 'route'|'plan'|'execute'|'verify'|'summarize';
  // เลือกแบบ score จาก profile (cost/latency/reliability)
  candidateModelProfileIds: string[];
  selection: {
    mode: 'min_cost'|'min_latency'|'max_reliability'|'balanced';
    weights?: { cost: number; latency: number; reliability: number };
  };
  // escalation policy (ถ้า validation fail หรือ confidence ต่ำ)
  escalate?: {
    on: Array<'validation_fail'|'low_confidence'|'tool_fail'|'retrieval_conflict'>;
    toModelProfileIds: string[]; // รุ่นที่แรงกว่า
    maxHops: number;             // กันลูป
  };
}

export interface RouterConfigV1 {
  v: 1;
  id: string;
  layer: ConfigLayer;

  budgets: RouterBudgets;

  routeRules: RouteRule[];

  modelPolicies: StageModelPolicy[];

  // guardrails ระดับโค้ด (ไม่ใช่ prompt)
  enforcement: {
    scopeHardStop: boolean;
    budgetHardStop: boolean;
    schemaHardStop: boolean;
    crossTenantIsolation: boolean;
  };

  // fallback เมื่อ route ไม่ชัด
  fallback: {
    defaultRoute: string;
    defaultModelPolicyStage: 'execute';
  };
}

Merge behavior (สำคัญมากสำหรับแพลตฟอร์ม)

routeRules: รวมและ sort ด้วย priority (project override ชนะ global)

modelPolicies: merge ตาม stage (ถ้ามี stage เดียวกัน layer หลัง override)

budgets: runtime override ปรับลดได้เสมอ (เพิ่มงบต้องผ่าน policy)

enforcement: global เปิดไว้ชนะทุกชั้น (ปิดไม่ได้ในชั้นล่าง)



---

5) Validation Concept + Blueprint (Guarantee Engine)

คุณไม่ได้ขาย “เอเจนต์” คุณขาย “ผลลัพธ์ที่คาดการณ์ได้” ดังนั้น validation ต้องเป็น “ระบบ” ไม่ใช่ prompt

A) Validator Stack (เรียกจาก validate step)

โครงเป็นชั้นๆ (fail fast):

1. Contract Validators

schema/type checks (JSON schema / zod)

required fields / format / deterministic constraints



2. Task Validators

unit-like checks เฉพาะงาน (เช่น output ต้องมี patch, ต้องมี list ของไฟล์ที่แก้)



3. Grounding Validators

ถ้า route เป็น RAG: ต้องมี citations/provenance, ตรวจ conflict/coverage



4. Tool Outcome Validators

tool call status, side-effects, idempotency guard (กันยิงซ้ำ)



5. Budget/Policy Validators

cost/latency/tokens เกินปุ๊บ “หยุด/ลดแผน/เปลี่ยนโมเดล” ตาม policy




B) Repair Loop (อัตโนมัติ, ไม่ให้ผู้ใช้ confirm รายสเต็ป)

ถ้า fail:

repair_action = replan retrieval (เปลี่ยน k/chunk/filters) หรือ escalate model ที่ stage “execute/verify”

จำกัด hop ด้วย modelPolicies.escalate.maxHops

ถ้าเกิน hop: fallback route หรือ stop พร้อม report สั้นๆ


C) Offline + Online

Offline Gate (Release Gate): golden set ต่อ route/skill/version, score threshold ก่อนปล่อย

Online Shadow Eval: วิ่งเงียบๆกับ subset traffic เพื่อปรับ routing weights/reliability

Telemetry-driven Reliability: feed กลับเข้า ModelReliability เพื่อให้ router ตัดสินใจดีขึ้นเรื่อยๆ



---

ชุดไฟล์ที่คุณเอาไปลงโปรเจกต์ได้ทันที (V1)

profiles/model-profile.v1.ts

flow/flowgraph.v1.ts

router/router-config.v1.ts

obs/decisionlog.v1.ts

engine/ (ตัวรัน flowgraph: step executor + enforcement + validator runner)

