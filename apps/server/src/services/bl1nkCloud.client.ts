import {
  AgentsApi,
  AuthApi,
  KnowledgeApi,
  MemoryApi,
  ProvidersApi,
  SkillsApi,
  TestingApi,
  ToolsApi,
  UsersApi,
  WorkspacesApi,
  Configuration,
} from 'sdk'

export interface Bl1nkClientContext {
  token?: string
  workspaceId?: string
  providerId?: string
}

const DEFAULT_BASE_URL = (process.env.BL1NK_API_BASE_URL ?? 'http://localhost:8081/v1').replace(/\/$/, '')
const DEFAULT_WORKSPACE_ID = process.env.BL1NK_WORKSPACE_ID ?? 'local-dev-workspace'
const DEFAULT_PROVIDER_ID = process.env.BL1NK_PROVIDER_ID

const buildHeaders = (context: Bl1nkClientContext) => {
  const headers: Record<string, string> = {}
  if (context.token) {
    headers['Authorization'] = context.token.startsWith('Bearer ')
      ? context.token
      : `Bearer ${context.token}`
  }
  if (context.workspaceId ?? DEFAULT_WORKSPACE_ID) {
    headers['x-workspace-id'] = context.workspaceId ?? DEFAULT_WORKSPACE_ID
  }
  const providerId = context.providerId ?? DEFAULT_PROVIDER_ID
  if (providerId) {
    headers['x-provider-id'] = providerId
  }
  return headers
}

class Bl1nkCloudClient {
  private static instance: Bl1nkCloudClient

  private constructor(
    private readonly basePath: string,
    private readonly defaults: Bl1nkClientContext
  ) {}

  static getInstance() {
    if (!Bl1nkCloudClient.instance) {
      Bl1nkCloudClient.instance = new Bl1nkCloudClient(DEFAULT_BASE_URL, {
        workspaceId: DEFAULT_WORKSPACE_ID,
        providerId: DEFAULT_PROVIDER_ID,
      })
    }
    return Bl1nkCloudClient.instance
  }

  createApis(overrides: Bl1nkClientContext = {}) {
    const headers = buildHeaders({ ...this.defaults, ...overrides })
    const configuration = new Configuration({
      basePath: this.basePath,
      headers,
    })

    return {
      auth: new AuthApi(configuration),
      users: new UsersApi(configuration),
      workspaces: new WorkspacesApi(configuration),
      skills: new SkillsApi(configuration),
      agents: new AgentsApi(configuration),
      tools: new ToolsApi(configuration),
      providers: new ProvidersApi(configuration),
      knowledge: new KnowledgeApi(configuration),
      memory: new MemoryApi(configuration),
      testing: new TestingApi(configuration),
    }
  }
}

export const getBl1nkClient = (context: Bl1nkClientContext = {}) =>
  Bl1nkCloudClient.getInstance().createApis(context)

export const CLOUD_WORKSPACE_ID = DEFAULT_WORKSPACE_ID
