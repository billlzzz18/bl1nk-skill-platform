# AgentsApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdAgentsAgentIdDelete**](AgentsApi.md#workspacesworkspaceidagentsagentiddelete) | **DELETE** /workspaces/{workspaceId}/agents/{agentId} | Delete an agent |
| [**workspacesWorkspaceIdAgentsAgentIdGet**](AgentsApi.md#workspacesworkspaceidagentsagentidget) | **GET** /workspaces/{workspaceId}/agents/{agentId} | Fetch an agent |
| [**workspacesWorkspaceIdAgentsAgentIdPatch**](AgentsApi.md#workspacesworkspaceidagentsagentidpatch) | **PATCH** /workspaces/{workspaceId}/agents/{agentId} | Update an agent |
| [**workspacesWorkspaceIdAgentsAgentIdTestPost**](AgentsApi.md#workspacesworkspaceidagentsagentidtestpost) | **POST** /workspaces/{workspaceId}/agents/{agentId}/test | Chat-test an agent with optional tool calls |
| [**workspacesWorkspaceIdAgentsGet**](AgentsApi.md#workspacesworkspaceidagentsget) | **GET** /workspaces/{workspaceId}/agents | List agents |
| [**workspacesWorkspaceIdAgentsPost**](AgentsApi.md#workspacesworkspaceidagentspost) | **POST** /workspaces/{workspaceId}/agents | Create an agent |



## workspacesWorkspaceIdAgentsAgentIdDelete

> workspacesWorkspaceIdAgentsAgentIdDelete(workspaceId, agentId)

Delete an agent

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsAgentIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    agentId: agentId_example,
  } satisfies WorkspacesWorkspaceIdAgentsAgentIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsAgentIdDelete(body);
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

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Agent removed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdAgentsAgentIdGet

> Agent workspacesWorkspaceIdAgentsAgentIdGet(workspaceId, agentId)

Fetch an agent

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsAgentIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    agentId: agentId_example,
  } satisfies WorkspacesWorkspaceIdAgentsAgentIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsAgentIdGet(body);
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

### Return type

[**Agent**](Agent.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Agent detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdAgentsAgentIdPatch

> Agent workspacesWorkspaceIdAgentsAgentIdPatch(workspaceId, agentId, updateAgentRequest)

Update an agent

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsAgentIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    agentId: agentId_example,
    // UpdateAgentRequest
    updateAgentRequest: ...,
  } satisfies WorkspacesWorkspaceIdAgentsAgentIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsAgentIdPatch(body);
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
| **updateAgentRequest** | [UpdateAgentRequest](UpdateAgentRequest.md) |  | |

### Return type

[**Agent**](Agent.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated agent |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdAgentsAgentIdTestPost

> TestResponse workspacesWorkspaceIdAgentsAgentIdTestPost(workspaceId, agentId, agentTestRequest)

Chat-test an agent with optional tool calls

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsAgentIdTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

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


## workspacesWorkspaceIdAgentsGet

> WorkspacesWorkspaceIdAgentsGet200Response workspacesWorkspaceIdAgentsGet(workspaceId, page, perPage, search)

List agents

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesWorkspaceIdAgentsGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsGet(body);
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
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**WorkspacesWorkspaceIdAgentsGet200Response**](WorkspacesWorkspaceIdAgentsGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Agent list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdAgentsPost

> Agent workspacesWorkspaceIdAgentsPost(workspaceId, createAgentRequest, page, perPage, search)

Create an agent

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '';
import type { WorkspacesWorkspaceIdAgentsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // CreateAgentRequest
    createAgentRequest: ...,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesWorkspaceIdAgentsPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdAgentsPost(body);
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
| **createAgentRequest** | [CreateAgentRequest](CreateAgentRequest.md) |  | |
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Agent**](Agent.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Agent created |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

