
```flowchart LR
  %% ======================
  %% 1) AUTHORING / SETUP
  %% ======================
  subgraph A[Authoring Plane (ครั้งเดียว/แก้ไขเป็นเวอร์ชัน)]
    A1[Skills (SKILL.md + py/ts adapters)] --> A2[Skill Registry + Versioning]
    A3[Agents 501 Templates (json)] --> A4[Agent Registry + Capability Tags]
    A5[MCP Tool Servers] --> A6[Tool Registry\n(schema, scope, quotas, reliability)]
    A7[Model Catalog\n(Bedrock: Claude/Nova/Titan/Mistral/Meta...)] --> A8[Model Profiles\n(cost/latency/context/strengths)]
    A9[Policies\n(risk rules, budgets, routing rules)] --> A10[Policy Store]
    A2 --> A11[Release Gate\n(static validate + eval suites)]
    A4 --> A11
    A6 --> A11
    A8 --> A11
    A10 --> A11
  end

  %% ======================
  %% 2) DATA INGESTION
  %% ======================
  subgraph B[Knowledge Plane (ข้อมูล)]
    B1[Sources\nDocs/PDF/Web/Code/Logs] --> B2[Extractor/Normalizer]
    B2 --> B3[Chunker Router\n(doc/code/pdf/log)]
    B3 -->|doc| B4[Doc Chunking]
    B3 -->|code| B5[Code Chunking]
    B3 -->|pdf| B6[Page/Layout Chunking]
    B3 -->|log| B7[Event/Window Chunking]
    B4 --> B8[Embeddings\n(Cohere / Titan / etc.)]
    B5 --> B8
    B6 --> B8
    B7 --> B8
    B8 --> B9[Local Vector Store\n(FAISS/Chroma/Milvus/...)]
    B8 --> B10[Optional: Bedrock Knowledge Base\n(managed store)]
    B11[Document Store\n(raw + canonical + metadata)] <--> B2
  end

  %% ======================
  %% 3) RUNTIME REQUEST
  %% ======================
  subgraph R[Runtime Plane (ทุก request)]
    U[User Query] --> R1[Session Context\n(user, tenant, app state)]
    R1 --> R2[Memory Fetch\n(short-term + long-term)]
    R2 --> R3[Router (code-level)\nroute + agent + skill + budgets]
    R3 --> R4[Planner (code-level)\nretrieval plan + tool plan + model plan]
    R4 --> R5[Retriever\n(vector search)]
    B9 --> R5
    B10 --> R5
    R5 --> R6[Reranker\n(Voyage rerank-2.5 / lite)]
    R6 --> R7[Context Packager\n(token budget + citations)]
    R7 --> R8[Executor\nLLM calls + Tool calls]
    R8 --> R9[Validator Stack\n(schema/tests/safety/grounding)]
    R9 -->|pass| R10[Delivery\n(answer/artifact)]
    R9 -->|fail| R11[Auto Repair Loop\n(replan/escalate/fallback)]
    R11 --> R4
    R10 --> R12[Memory Write\n(summaries, decisions, artifacts)]
    R10 --> R13[Telemetry\n(cost/latency/pass-rate/tools)]
    R13 --> R14[Online Learning Inputs\n(re-rank tuning, routing tuning)]
  end

  A11 -. publishes .-> R3
  A11 -. publishes .-> R8
  A11 -. publishes .-> R9
```

---

```mindmap
  root((bl1nk Decision Architecture))
    Goals
      "ผลลัพธ์สม่ำเสมอ (near-expert)"
      "ต้นทุนคุมได้ (budget-aware)"
      "เวลาคงที่ (latency SLO)"
      "ตรวจสอบย้อนกลับได้ (traceable)"
    Code-Level Orchestrator
      Router
        "route classification"
        "select Agent/Skill"
        "set budgets (tokens, $)"
        "risk tier"
      Planner
        Retrieval Planner
          "chunk policy"
          "k_initial / k_rerank"
          "filtering (tenant/doc_type/time)"
          "context budget"
        Model Planner
          "progressive escalation"
          "step models: cheap->strong"
          "fallback models"
        Tool Planner
          "tool shortlist (tool-RAG)"
          "tool gating by scope"
          "retry/timeout"
      Executor
        "LLM invoke (Bedrock providers)"
        "MCP tool invoke"
        "artifact ops (files/patches)"
      Validator Stack (Guarantee Engine)
        Output Schema
          "JSON schema / typed outputs"
        Task Tests
          "unit-like checks per skill"
          "golden set regression"
        Grounding
          "citations required when RAG"
          "conflict detection"
        Safety/Policy
          "tool scope enforcement"
          "rate limits, quotas"
      Enforcer (Hard Stops)
        "no unsafe tool calls"
        "no budget overruns"
        "no cross-tenant leakage"
        "no missing required checks"
      Observability
        "decision log"
        "tool reliability score"
        "cost/latency metrics"
        "pass/fail reasons"
      Memory Manager
        "short-term working summary"
        "long-term stable prefs"
        "artifact memory (links, patches)"
    Platform Assets
      "501 Agents (workers)"
      "30+ Skills (procedures)"
      "MCP Tools (capabilities)"
      "Model profiles (Bedrock + others)"
      "Knowledge (local vector + KB)"
```

---

```flowchart TB
  %% “Straight Pattern” = มาตรฐานเดียวที่ทุกงานวิ่งผ่าน
  S0[INPUT\nUser asks goal, not steps] --> S1[UNDERSTAND\nRouter: route + skill + constraints]
  S1 --> S2[PLAN\nPlanner: retrieval/model/tool plan]
  S2 --> S3[FETCH\nRetriever + Rerank + Context Pack]
  S3 --> S4[ACT\nExecutor: LLM + Tools]
  S4 --> S5[CHECK\nValidator Stack]
  S5 -->|PASS| S6[DELIVER\nAnswer + Artifacts]
  S5 -->|FAIL| S7[REPAIR LOOP\nreplan/escalate/fallback]
  S7 --> S2
  S6 --> S8[LEARN\nTelemetry + Memory update + reliability scores]

  %% จุดบังคับ (Hard enforcement points)
  E1[[ENFORCE\nScope/Budget]] -.-> S2
  E2[[ENFORCE\nTool Gate]] -.-> S4
  E3[[ENFORCE\nOutput Contract]] -.-> S5
  E4[[ENFORCE\nCross-tenant isolation]] -.-> S3
```

### จุดไหน “ตัดสินใจ/วางแผน/ตรวจสอบ/บังคับ” (แบบละเอียด)

1) Decision Points (ตัดสินใจ)

Router (code-level): เลือก route + skill + agent + budget + riskTier

ทำให้ “ผู้ใช้ไม่ต้องเลือกโฟลว์” เพราะระบบเลือกให้

ทำให้ “ไม่ต้อง confirm ทุก action” เพราะ Router+Policy กำหนด upfront ว่าอะไรทำอัตโนมัติได้ในสกิลนี้


### Model Router (ใน Planner): เลือกโมเดล “รายสเต็ป” (ไม่ใช่ทั้งงาน)

cheap model: classify/plan/summarize

strong model: synthesize/coding/agentic

verify model: ตรวจ/ให้คะแนน/จับความขัดแย้ง



## 2) Planning Points (วางแผน)

Retrieval Planner: กำหนด chunking + k + filters + context budget

ตั้งต้นที่ recursive splitter 400–512 tokens overlap 10–20% สำหรับข้อความทั่วไป

factoid: 256–512 tokens, analytical: 1024+ tokens

code: เพิ่ม separators ตาม class/def เพื่อไม่ตัดกลางฟังก์ชัน

pdf/table-heavy: route ไป page-level chunking ตามชนิดเอกสาร


Tool Planner: shortlist tools จาก Tool Registry (เหมือน retrieval แต่กับ “tool metadata”) แล้วค่อยเลือกตัวจริงตอน run


## 3) Verification Points (ตรวจสอบ)

นี่คือ “เกราะเหล็ก” ที่ทำให้ novice ได้ผลลัพธ์ใกล้ expert โดยไม่ต้องกด confirm ทีละก้าว

Output Contract: schema validation (typed JSON / strict format)

Task Validators: unit-like checks ต่อ skill (เช่น code patch ต้อง build ผ่าน, RAG answer ต้องมี citations, action ต้องได้ผลลัพธ์จาก tool)

Grounding Checks: ถ้าเป็นงาน RAG บังคับให้มีหลักฐาน/อ้างอิง และตรวจว่ามีความขัดแย้งระหว่างแหล่งข้อมูลหรือไม่

Regression Harness: golden set + score threshold ต่อ skill/version ก่อน “ปล่อย” เข้า runtime


## 4) Enforcement Points (บังคับ/Hard Stop)

Tool Gate (ก่อนเรียก MCP): ตรวจ scope, tenant isolation, quotas, allowlist, rate limit

Budget Gate: ถ้า token/$ เกินเพดาน ให้ลด retrieval หรือ downgrade model หรือหยุดพร้อมข้อเสนอทางเลือก

Cross-tenant Gate: ห้ามดึงเอกสาร/ความจำข้าม tenant เด็ดขาด

No-surprise Actions: ไม่ใช่ “confirm ทุกครั้ง” แต่คือ “ห้ามทำสิ่งที่อยู่นอก pattern ของ skill”


**เอเจนต์คอร์ “จะว่างไหม” และต้องทบทวนยังไง**

AgentCore “ว่าง” ในความหมายที่ถูกคือ: มัน ไม่ต้องคิดทุกอย่างเองแบบ LLM-driven เพราะมันทำงานเป็น orchestrator เชิงโค้ด

งานคิดเชิงโครงสร้างถูกย้ายไป: Router/Planner/Validator (deterministic)

LLM ทำงานที่ถนัด: ตีความ/สังเคราะห์/เขียน/แก้

การทบทวนเกิดด้วย Auto validation + telemetry ไม่ใช่ให้ผู้ใช้ยืนยันทุกขั้น

ถ้า fail: เข้าสู่ Repair Loop (replan/escalate/fallback) โดยอัตโนมัติ


## “จุดขายแบรนด์: ประสิทธิภาพที่การันตีได้” ควรพูดเป็นสัญญาแบบไหน

คุณจะ “การันตี” ได้จริงในเชิงผลิตภัณฑ์เมื่อคุณทำให้มัน measurable:

Outcome SLO ต่อ skill: pass-rate บน golden set ≥ X, latency p95 ≤ Y, cost/request ≤ Z

Runtime Guardrails: ถ้า confidence ต่ำหรือ validation fail -> escalate model หรือ fallback flow อัตโนมัติ

Versioned Skills + Rollback: ปล่อยเวอร์ชันใหม่เมื่อผ่าน harness เท่านั้น ถ้าตกให้ rollback อัตโนมัติ

