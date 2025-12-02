# SkillsApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdSkillsGet**](SkillsApi.md#workspacesworkspaceidskillsget) | **GET** /workspaces/{workspaceId}/skills | List workspace skills |
| [**workspacesWorkspaceIdSkillsPost**](SkillsApi.md#workspacesworkspaceidskillspost) | **POST** /workspaces/{workspaceId}/skills | Create a skill |
| [**workspacesWorkspaceIdSkillsSkillIdDelete**](SkillsApi.md#workspacesworkspaceidskillsskilliddelete) | **DELETE** /workspaces/{workspaceId}/skills/{skillId} | Delete a skill |
| [**workspacesWorkspaceIdSkillsSkillIdGet**](SkillsApi.md#workspacesworkspaceidskillsskillidget) | **GET** /workspaces/{workspaceId}/skills/{skillId} | Fetch a skill |
| [**workspacesWorkspaceIdSkillsSkillIdPatch**](SkillsApi.md#workspacesworkspaceidskillsskillidpatch) | **PATCH** /workspaces/{workspaceId}/skills/{skillId} | Update a skill |
| [**workspacesWorkspaceIdSkillsSkillIdTestPost**](SkillsApi.md#workspacesworkspaceidskillsskillidtestpost) | **POST** /workspaces/{workspaceId}/skills/{skillId}/test | Test a skill via chat completion |
| [**workspacesWorkspaceIdSkillsSkillIdVersionsGet**](SkillsApi.md#workspacesworkspaceidskillsskillidversionsget) | **GET** /workspaces/{workspaceId}/skills/{skillId}/versions | List version history |



## workspacesWorkspaceIdSkillsGet

> WorkspacesWorkspaceIdSkillsGet200Response workspacesWorkspaceIdSkillsGet(workspaceId, page, perPage, search)

List workspace skills

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesWorkspaceIdSkillsGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsGet(body);
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

[**WorkspacesWorkspaceIdSkillsGet200Response**](WorkspacesWorkspaceIdSkillsGet200Response.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Skill list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsPost

> Skill workspacesWorkspaceIdSkillsPost(workspaceId, createSkillRequest, page, perPage, search)

Create a skill

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // CreateSkillRequest
    createSkillRequest: ...,
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
    // string (optional)
    search: search_example,
  } satisfies WorkspacesWorkspaceIdSkillsPostRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsPost(body);
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
| **createSkillRequest** | [CreateSkillRequest](CreateSkillRequest.md) |  | |
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `20`] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**Skill**](Skill.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Skill created |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsSkillIdDelete

> workspacesWorkspaceIdSkillsSkillIdDelete(workspaceId, skillId)

Delete a skill

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    skillId: skillId_example,
  } satisfies WorkspacesWorkspaceIdSkillsSkillIdDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsSkillIdDelete(body);
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
| **204** | Skill deleted |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsSkillIdGet

> Skill workspacesWorkspaceIdSkillsSkillIdGet(workspaceId, skillId)

Fetch a skill

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    skillId: skillId_example,
  } satisfies WorkspacesWorkspaceIdSkillsSkillIdGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsSkillIdGet(body);
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

### Return type

[**Skill**](Skill.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Skill detail |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsSkillIdPatch

> Skill workspacesWorkspaceIdSkillsSkillIdPatch(workspaceId, skillId, updateSkillRequest)

Update a skill

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdPatchRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    skillId: skillId_example,
    // UpdateSkillRequest
    updateSkillRequest: ...,
  } satisfies WorkspacesWorkspaceIdSkillsSkillIdPatchRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsSkillIdPatch(body);
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
| **updateSkillRequest** | [UpdateSkillRequest](UpdateSkillRequest.md) |  | |

### Return type

[**Skill**](Skill.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated skill |  -  |
| **400** | Payload validation failed |  -  |
| **404** | Resource not found |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdSkillsSkillIdTestPost

> TestResponse workspacesWorkspaceIdSkillsSkillIdTestPost(workspaceId, skillId, skillTestRequest)

Test a skill via chat completion

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

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


## workspacesWorkspaceIdSkillsSkillIdVersionsGet

> Array&lt;SkillVersion&gt; workspacesWorkspaceIdSkillsSkillIdVersionsGet(workspaceId, skillId, limit)

List version history

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { WorkspacesWorkspaceIdSkillsSkillIdVersionsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SkillsApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // string
    skillId: skillId_example,
    // number (optional)
    limit: 56,
  } satisfies WorkspacesWorkspaceIdSkillsSkillIdVersionsGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdSkillsSkillIdVersionsGet(body);
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
| **limit** | `number` |  | [Optional] [Defaults to `10`] |

### Return type

[**Array&lt;SkillVersion&gt;**](SkillVersion.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Skill versions |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

