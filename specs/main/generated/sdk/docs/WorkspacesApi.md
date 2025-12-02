# WorkspacesApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**usersUserIdWorkspacesGet**](WorkspacesApi.md#usersuseridworkspacesget) | **GET** /users/{userId}/workspaces | List workspaces accessible by a user |
| [**workspacesGet**](WorkspacesApi.md#workspacesget) | **GET** /workspaces | List workspaces |
| [**workspacesPost**](WorkspacesApi.md#workspacespost) | **POST** /workspaces | Create a workspace |
| [**workspacesWorkspaceIdDelete**](WorkspacesApi.md#workspacesworkspaceiddelete) | **DELETE** /workspaces/{workspaceId} | Archive a workspace |
| [**workspacesWorkspaceIdGet**](WorkspacesApi.md#workspacesworkspaceidget) | **GET** /workspaces/{workspaceId} | Retrieve workspace detail |
| [**workspacesWorkspaceIdPatch**](WorkspacesApi.md#workspacesworkspaceidpatch) | **PATCH** /workspaces/{workspaceId} | Update workspace metadata |



## usersUserIdWorkspacesGet

> UsersUserIdWorkspacesGet200Response usersUserIdWorkspacesGet(userId, page, perPage)

List workspaces accessible by a user

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { UsersUserIdWorkspacesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // string
    userId: userId_example,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
  } satisfies UsersUserIdWorkspacesGetRequest;

  try {
    const data = await api.usersUserIdWorkspacesGet(body);
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
| **userId** | `string` |  | [Defaults to `undefined`] |
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |

### Return type

[**UsersUserIdWorkspacesGet200Response**](UsersUserIdWorkspacesGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Workspace list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesGet

> UsersUserIdWorkspacesGet200Response workspacesGet(page, perPage, search)

List workspaces

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { WorkspacesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesGetRequest;

  try {
    const data = await api.workspacesGet(body);
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
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**UsersUserIdWorkspacesGet200Response**](UsersUserIdWorkspacesGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Workspace collection |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesPost

> Workspace workspacesPost(createWorkspaceRequest, page, perPage, search)

Create a workspace

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { WorkspacesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // CreateWorkspaceRequest
    createWorkspaceRequest: ...,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesPostRequest;

  try {
    const data = await api.workspacesPost(body);
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
| **createWorkspaceRequest** | [CreateWorkspaceRequest](CreateWorkspaceRequest.md) |  | |
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Workspace**](Workspace.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Workspace created |  -  |
| **400** | Payload validation failed |  -  |
| **409** | Conflicting state or duplicate resource |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdDelete

> workspacesWorkspaceIdDelete(workspaceId)

Archive a workspace

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { WorkspacesWorkspaceIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
  } satisfies WorkspacesWorkspaceIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdDelete(body);
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

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Workspace archived |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdGet

> Workspace workspacesWorkspaceIdGet(workspaceId)

Retrieve workspace detail

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { WorkspacesWorkspaceIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
  } satisfies WorkspacesWorkspaceIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdGet(body);
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

[**Workspace**](Workspace.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Workspace detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdPatch

> Workspace workspacesWorkspaceIdPatch(workspaceId, updateWorkspaceRequest)

Update workspace metadata

### Example

```ts
import {
  Configuration,
  WorkspacesApi,
} from '';
import type { WorkspacesWorkspaceIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WorkspacesApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // UpdateWorkspaceRequest
    updateWorkspaceRequest: ...,
  } satisfies WorkspacesWorkspaceIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdPatch(body);
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
| **updateWorkspaceRequest** | [UpdateWorkspaceRequest](UpdateWorkspaceRequest.md) |  | |

### Return type

[**Workspace**](Workspace.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated workspace |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

