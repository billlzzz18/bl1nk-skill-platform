# ToolsApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdToolsGet**](ToolsApi.md#workspacesworkspaceidtoolsget) | **GET** /workspaces/{workspaceId}/tools | List MCP tools in a workspace |
| [**workspacesWorkspaceIdToolsPost**](ToolsApi.md#workspacesworkspaceidtoolspost) | **POST** /workspaces/{workspaceId}/tools | Create a tool definition |
| [**workspacesWorkspaceIdToolsToolIdDelete**](ToolsApi.md#workspacesworkspaceidtoolstooliddelete) | **DELETE** /workspaces/{workspaceId}/tools/{toolId} | Delete a tool |
| [**workspacesWorkspaceIdToolsToolIdGet**](ToolsApi.md#workspacesworkspaceidtoolstoolidget) | **GET** /workspaces/{workspaceId}/tools/{toolId} | Fetch a tool definition |
| [**workspacesWorkspaceIdToolsToolIdPatch**](ToolsApi.md#workspacesworkspaceidtoolstoolidpatch) | **PATCH** /workspaces/{workspaceId}/tools/{toolId} | Update a tool |



## workspacesWorkspaceIdToolsGet

> Array&lt;Tool&gt; workspacesWorkspaceIdToolsGet(workspaceId)

List MCP tools in a workspace

### Example

```ts
import {
  Configuration,
  ToolsApi,
} from '';
import type { WorkspacesWorkspaceIdToolsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ToolsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
  } satisfies WorkspacesWorkspaceIdToolsGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdToolsGet(body);
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

### Return type

[**Array&lt;Tool&gt;**](Tool.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Tool list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdToolsPost

> Tool workspacesWorkspaceIdToolsPost(workspaceId, createToolRequest)

Create a tool definition

### Example

```ts
import {
  Configuration,
  ToolsApi,
} from '';
import type { WorkspacesWorkspaceIdToolsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ToolsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // CreateToolRequest
    createToolRequest: ...,
  } satisfies WorkspacesWorkspaceIdToolsPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdToolsPost(body);
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
| **createToolRequest** | [CreateToolRequest](CreateToolRequest.md) |  | |

### Return type

[**Tool**](Tool.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Tool created |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdToolsToolIdDelete

> workspacesWorkspaceIdToolsToolIdDelete(workspaceId, toolId)

Delete a tool

### Example

```ts
import {
  Configuration,
  ToolsApi,
} from '';
import type { WorkspacesWorkspaceIdToolsToolIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ToolsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    toolId: toolId_example,
  } satisfies WorkspacesWorkspaceIdToolsToolIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdToolsToolIdDelete(body);
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
| **toolId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | Tool removed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdToolsToolIdGet

> Tool workspacesWorkspaceIdToolsToolIdGet(workspaceId, toolId)

Fetch a tool definition

### Example

```ts
import {
  Configuration,
  ToolsApi,
} from '';
import type { WorkspacesWorkspaceIdToolsToolIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ToolsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    toolId: toolId_example,
  } satisfies WorkspacesWorkspaceIdToolsToolIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdToolsToolIdGet(body);
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
| **toolId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Tool**](Tool.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Tool |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdToolsToolIdPatch

> Tool workspacesWorkspaceIdToolsToolIdPatch(workspaceId, toolId, updateToolRequest)

Update a tool

### Example

```ts
import {
  Configuration,
  ToolsApi,
} from '';
import type { WorkspacesWorkspaceIdToolsToolIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ToolsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    toolId: toolId_example,
    // UpdateToolRequest
    updateToolRequest: ...,
  } satisfies WorkspacesWorkspaceIdToolsToolIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdToolsToolIdPatch(body);
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
| **toolId** | `string` |  | [Defaults to `undefined`] |
| **updateToolRequest** | [UpdateToolRequest](UpdateToolRequest.md) |  | |

### Return type

[**Tool**](Tool.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated tool |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

