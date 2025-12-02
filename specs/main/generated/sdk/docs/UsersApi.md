# UsersApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**usersUserIdGet**](UsersApi.md#usersuseridget) | **GET** /users/{userId} | Fetch a user profile |
| [**usersUserIdPatch**](UsersApi.md#usersuseridpatch) | **PATCH** /users/{userId} | Update profile fields |
| [**usersUserIdWorkspacesGet**](UsersApi.md#usersuseridworkspacesget) | **GET** /users/{userId}/workspaces | List workspaces accessible by a user |



## usersUserIdGet

> User usersUserIdGet(userId)

Fetch a user profile

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersUserIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    userId: userId_example,
  } satisfies UsersUserIdGetRequest;

  try {
    const data = await api.usersUserIdGet(body);
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

### Return type

[**User**](User.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdPatch

> User usersUserIdPatch(userId, updateUserRequest)

Update profile fields

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersUserIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    userId: userId_example,
    // UpdateUserRequest
    updateUserRequest: ...,
  } satisfies UsersUserIdPatchRequest;

  try {
    const data = await api.usersUserIdPatch(body);
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
| **updateUserRequest** | [UpdateUserRequest](UpdateUserRequest.md) |  | |

### Return type

[**User**](User.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated profile |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## usersUserIdWorkspacesGet

> UsersUserIdWorkspacesGet200Response usersUserIdWorkspacesGet(userId, page, perPage)

List workspaces accessible by a user

### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersUserIdWorkspacesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

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

