# KnowledgeApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdKnowledgebasesGet**](KnowledgeApi.md#workspacesworkspaceidknowledgebasesget) | **GET** /workspaces/{workspaceId}/knowledgebases | List knowledgebases |
| [**workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDelete**](KnowledgeApi.md#workspacesworkspaceidknowledgebasesknowledgebaseiddelete) | **DELETE** /workspaces/{workspaceId}/knowledgebases/{knowledgebaseId} | Delete a knowledgebase |
| [**workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGet**](KnowledgeApi.md#workspacesworkspaceidknowledgebasesknowledgebaseidget) | **GET** /workspaces/{workspaceId}/knowledgebases/{knowledgebaseId} | Fetch a knowledgebase |
| [**workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatch**](KnowledgeApi.md#workspacesworkspaceidknowledgebasesknowledgebaseidpatch) | **PATCH** /workspaces/{workspaceId}/knowledgebases/{knowledgebaseId} | Update a knowledgebase |
| [**workspacesWorkspaceIdKnowledgebasesPost**](KnowledgeApi.md#workspacesworkspaceidknowledgebasespost) | **POST** /workspaces/{workspaceId}/knowledgebases | Create a knowledgebase |



## workspacesWorkspaceIdKnowledgebasesGet

> Array&lt;Knowledgebase&gt; workspacesWorkspaceIdKnowledgebasesGet(workspaceId)

List knowledgebases

### Example

```ts
import {
  Configuration,
  KnowledgeApi,
} from '';
import type { WorkspacesWorkspaceIdKnowledgebasesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new KnowledgeApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
  } satisfies WorkspacesWorkspaceIdKnowledgebasesGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdKnowledgebasesGet(body);
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

[**Array&lt;Knowledgebase&gt;**](Knowledgebase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Knowledgebase list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDelete

> workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDelete(workspaceId, knowledgebaseId)

Delete a knowledgebase

### Example

```ts
import {
  Configuration,
  KnowledgeApi,
} from '';
import type { WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new KnowledgeApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    knowledgebaseId: knowledgebaseId_example,
  } satisfies WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdDelete(body);
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
| **knowledgebaseId** | `string` |  | [Defaults to `undefined`] |

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
| **204** | Knowledgebase deleted |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGet

> Knowledgebase workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGet(workspaceId, knowledgebaseId)

Fetch a knowledgebase

### Example

```ts
import {
  Configuration,
  KnowledgeApi,
} from '';
import type { WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new KnowledgeApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    knowledgebaseId: knowledgebaseId_example,
  } satisfies WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdGet(body);
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
| **knowledgebaseId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**Knowledgebase**](Knowledgebase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Knowledgebase detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatch

> Knowledgebase workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatch(workspaceId, knowledgebaseId, updateKnowledgebaseRequest)

Update a knowledgebase

### Example

```ts
import {
  Configuration,
  KnowledgeApi,
} from '';
import type { WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new KnowledgeApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    knowledgebaseId: knowledgebaseId_example,
    // UpdateKnowledgebaseRequest
    updateKnowledgebaseRequest: ...,
  } satisfies WorkspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdKnowledgebasesKnowledgebaseIdPatch(body);
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
| **knowledgebaseId** | `string` |  | [Defaults to `undefined`] |
| **updateKnowledgebaseRequest** | [UpdateKnowledgebaseRequest](UpdateKnowledgebaseRequest.md) |  | |

### Return type

[**Knowledgebase**](Knowledgebase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated knowledgebase |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdKnowledgebasesPost

> Knowledgebase workspacesWorkspaceIdKnowledgebasesPost(workspaceId, createKnowledgebaseRequest)

Create a knowledgebase

### Example

```ts
import {
  Configuration,
  KnowledgeApi,
} from '';
import type { WorkspacesWorkspaceIdKnowledgebasesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new KnowledgeApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // CreateKnowledgebaseRequest
    createKnowledgebaseRequest: ...,
  } satisfies WorkspacesWorkspaceIdKnowledgebasesPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdKnowledgebasesPost(body);
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
| **createKnowledgebaseRequest** | [CreateKnowledgebaseRequest](CreateKnowledgebaseRequest.md) |  | |

### Return type

[**Knowledgebase**](Knowledgebase.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Knowledgebase created |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

