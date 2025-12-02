# TestingApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdAgentsAgentIdTestPost**](TestingApi.md#workspacesworkspaceidagentsagentidtestpost) | **POST** /workspaces/{workspaceId}/agents/{agentId}/test | Chat-test an agent with optional tool calls |
| [**workspacesWorkspaceIdProvidersProviderTestPost**](TestingApi.md#workspacesworkspaceidprovidersprovidertestpost) | **POST** /workspaces/{workspaceId}/providers/{provider}/test | Test stored provider credentials |
| [**workspacesWorkspaceIdSkillsSkillIdTestPost**](TestingApi.md#workspacesworkspaceidskillsskillidtestpost) | **POST** /workspaces/{workspaceId}/skills/{skillId}/test | Test a skill via chat completion |



## workspacesWorkspaceIdAgentsAgentIdTestPost

> TestResponse workspacesWorkspaceIdAgentsAgentIdTestPost(workspaceId, agentId, agentTestRequest)

Chat-test an agent with optional tool calls

### Example

```ts
import {
  Configuration,
  TestingApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsAgentIdTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TestingApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    agentId: agentId_example,
    // AgentTestRequest
    agentTestRequest: ...,
  } satisfies WorkspacesWorkspaceIdAgentsAgentIdTestPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsAgentIdTestPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **workspaceId** | `string` |  | [Defaults to `undefined`] |
| **agentId** | `string` |  | [Defaults to `undefined`] |
| **agentTestRequest** | [AgentTestRequest](AgentTestRequest.md) |  | |

### Return type

[**TestResponse**](TestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Agent test response |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdProvidersProviderTestPost

> ProviderStatus workspacesWorkspaceIdProvidersProviderTestPost(workspaceId, provider)

Test stored provider credentials

### Example

```ts
import {
  Configuration,
  TestingApi,
} from '';
import type { WorkspacesWorkspaceIdProvidersProviderTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TestingApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // 'bedrock' | 'openrouter' | 'openai' | 'anthropic' | 'ollama'
    provider: provider_example,
  } satisfies WorkspacesWorkspaceIdProvidersProviderTestPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdProvidersProviderTestPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **workspaceId** | `string` |  | [Defaults to `undefined`] |
| **provider** | `bedrock`, `openrouter`, `openai`, `anthropic`, `ollama` |  | [Defaults to `undefined`] [Enum: bedrock, openrouter, openai, anthropic, ollama] |

### Return type

[**ProviderStatus**](ProviderStatus.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Provider status |  -  |
| **409** | Conflicting state or duplicate resource |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsSkillIdTestPost

> TestResponse workspacesWorkspaceIdSkillsSkillIdTestPost(workspaceId, skillId, skillTestRequest)

Test a skill via chat completion

### Example

```ts
import {
  Configuration,
  TestingApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new TestingApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    skillId: skillId_example,
    // SkillTestRequest
    skillTestRequest: ...,
  } satisfies WorkspacesWorkspaceIdSkillsSkillIdTestPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsSkillIdTestPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **workspaceId** | `string` |  | [Defaults to `undefined`] |
| **skillId** | `string` |  | [Defaults to `undefined`] |
| **skillTestRequest** | [SkillTestRequest](SkillTestRequest.md) |  | |

### Return type

[**TestResponse**](TestResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Test response |  -  |
| **412** | Provider missing |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

