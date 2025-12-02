# ProvidersApi

All URIs are relative to *https://api.bl1nk.site/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**workspacesWorkspaceIdProvidersGet**](ProvidersApi.md#workspacesworkspaceidprovidersget) | **GET** /workspaces/{workspaceId}/providers | List provider credentials |
| [**workspacesWorkspaceIdProvidersProviderDelete**](ProvidersApi.md#workspacesworkspaceidprovidersproviderdelete) | **DELETE** /workspaces/{workspaceId}/providers/{provider} | Delete provider credentials |
| [**workspacesWorkspaceIdProvidersProviderPut**](ProvidersApi.md#workspacesworkspaceidprovidersproviderput) | **PUT** /workspaces/{workspaceId}/providers/{provider} | Upsert credentials for a provider |
| [**workspacesWorkspaceIdProvidersProviderTestPost**](ProvidersApi.md#workspacesworkspaceidprovidersprovidertestpost) | **POST** /workspaces/{workspaceId}/providers/{provider}/test | Test stored provider credentials |



## workspacesWorkspaceIdProvidersGet

> Array&lt;ProviderCredential&gt; workspacesWorkspaceIdProvidersGet(workspaceId)

List provider credentials

### Example

```ts
import {
  Configuration,
  ProvidersApi,
} from '';
import type { WorkspacesWorkspaceIdProvidersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProvidersApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
  } satisfies WorkspacesWorkspaceIdProvidersGetRequest;

  try {
    const data = await api.workspacesWorkspaceIdProvidersGet(body);
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

[**Array&lt;ProviderCredential&gt;**](ProviderCredential.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Provider list |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdProvidersProviderDelete

> workspacesWorkspaceIdProvidersProviderDelete(workspaceId, provider)

Delete provider credentials

### Example

```ts
import {
  Configuration,
  ProvidersApi,
} from '';
import type { WorkspacesWorkspaceIdProvidersProviderDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProvidersApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // 'bedrock' | 'openrouter' | 'openai' | 'anthropic' | 'ollama'
    provider: provider_example,
  } satisfies WorkspacesWorkspaceIdProvidersProviderDeleteRequest;

  try {
    const data = await api.workspacesWorkspaceIdProvidersProviderDelete(body);
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

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Provider removed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdProvidersProviderPut

> ProviderCredential workspacesWorkspaceIdProvidersProviderPut(workspaceId, provider, providerCredentialRequest)

Upsert credentials for a provider

### Example

```ts
import {
  Configuration,
  ProvidersApi,
} from '';
import type { WorkspacesWorkspaceIdProvidersProviderPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProvidersApi(config);

  const body = {
    // string
    workspaceId: workspaceId_example,
    // 'bedrock' | 'openrouter' | 'openai' | 'anthropic' | 'ollama'
    provider: provider_example,
    // ProviderCredentialRequest
    providerCredentialRequest: ...,
  } satisfies WorkspacesWorkspaceIdProvidersProviderPutRequest;

  try {
    const data = await api.workspacesWorkspaceIdProvidersProviderPut(body);
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
| **providerCredentialRequest** | [ProviderCredentialRequest](ProviderCredentialRequest.md) |  | |

### Return type

[**ProviderCredential**](ProviderCredential.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Stored credentials |  -  |
| **400** | Payload validation failed |  -  |
| **0** | Unexpected server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## workspacesWorkspaceIdProvidersProviderTestPost

> ProviderStatus workspacesWorkspaceIdProvidersProviderTestPost(workspaceId, provider)

Test stored provider credentials

### Example

```ts
import {
  Configuration,
  ProvidersApi,
} from '';
import type { WorkspacesWorkspaceIdProvidersProviderTestPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProvidersApi(config);

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

