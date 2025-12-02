# MemoryApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdMemoriesGet**](MemoryApi.md#workspacesworkspaceidmemoriesget) | **GET** /workspaces/{workspaceId}/memories | List memory artifacts |
| [**workspacesWorkspaceIdMemoriesMemoryIdDelete**](MemoryApi.md#workspacesworkspaceidmemoriesmemoryiddelete) | **DELETE** /workspaces/{workspaceId}/memories/{memoryId} | Delete a memory entry |
| [**workspacesWorkspaceIdMemoriesMemoryIdGet**](MemoryApi.md#workspacesworkspaceidmemoriesmemoryidget) | **GET** /workspaces/{workspaceId}/memories/{memoryId} | Fetch a memory entry |
| [**workspacesWorkspaceIdMemoriesMemoryIdPatch**](MemoryApi.md#workspacesworkspaceidmemoriesmemoryidpatch) | **PATCH** /workspaces/{workspaceId}/memories/{memoryId} | Update a memory entry |
| [**workspacesWorkspaceIdMemoriesPost**](MemoryApi.md#workspacesworkspaceidmemoriespost) | **POST** /workspaces/{workspaceId}/memories | Create a memory entry |



## workspacesWorkspaceIdMemoriesGet

> WorkspacesWorkspaceIdMemoriesGet200Response workspacesWorkspaceIdMemoriesGet(workspaceId, page, perPage)

List memory artifacts

### Example

```ts
import {
  Configuration,
  MemoryApi,
} from '';
import type { WorkspacesWorkspaceIdMemoriesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemoryApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
  } satisfies WorkspacesWorkspaceIdMemoriesGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdMemoriesGet(body);
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

### Return type

[**WorkspacesWorkspaceIdMemoriesGet200Response**](WorkspacesWorkspaceIdMemoriesGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Memory list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdMemoriesMemoryIdDelete

> workspacesWorkspaceIdMemoriesMemoryIdDelete(workspaceId, memoryId)

Delete a memory entry

### Example

```ts
import {
  Configuration,
  MemoryApi,
} from '';
import type { WorkspacesWorkspaceIdMemoriesMemoryIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemoryApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    memoryId: memoryId_example,
  } satisfies WorkspacesWorkspaceIdMemoriesMemoryIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdMemoriesMemoryIdDelete(body);
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
| **memoryId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | Memory removed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdMemoriesMemoryIdGet

> Memory workspacesWorkspaceIdMemoriesMemoryIdGet(workspaceId, memoryId)

Fetch a memory entry

### Example

```ts
import {
  Configuration,
  MemoryApi,
} from '';
import type { WorkspacesWorkspaceIdMemoriesMemoryIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemoryApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    memoryId: memoryId_example,
  } satisfies WorkspacesWorkspaceIdMemoriesMemoryIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdMemoriesMemoryIdGet(body);
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
| **memoryId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Memory**](Memory.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Memory detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdMemoriesMemoryIdPatch

> Memory workspacesWorkspaceIdMemoriesMemoryIdPatch(workspaceId, memoryId, updateMemoryRequest)

Update a memory entry

### Example

```ts
import {
  Configuration,
  MemoryApi,
} from '';
import type { WorkspacesWorkspaceIdMemoriesMemoryIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemoryApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    memoryId: memoryId_example,
    // UpdateMemoryRequest
    updateMemoryRequest: ...,
  } satisfies WorkspacesWorkspaceIdMemoriesMemoryIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdMemoriesMemoryIdPatch(body);
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
| **memoryId** | `string` |  | [Defaults to `undefined`] |
| **updateMemoryRequest** | [UpdateMemoryRequest](UpdateMemoryRequest.md) |  | |

### Return type

[**Memory**](Memory.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated memory |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdMemoriesPost

> Memory workspacesWorkspaceIdMemoriesPost(workspaceId, createMemoryRequest, page, perPage)

Create a memory entry

### Example

```ts
import {
  Configuration,
  MemoryApi,
} from '';
import type { WorkspacesWorkspaceIdMemoriesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new MemoryApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // CreateMemoryRequest
    createMemoryRequest: ...,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
  } satisfies WorkspacesWorkspaceIdMemoriesPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdMemoriesPost(body);
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
| **createMemoryRequest** | [CreateMemoryRequest](CreateMemoryRequest.md) |  | |
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |

### Return type

[**Memory**](Memory.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Memory created |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

