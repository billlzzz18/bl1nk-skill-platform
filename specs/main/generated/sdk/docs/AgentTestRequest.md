
# AgentTestRequest


## Properties

Name | Type
------------ | -------------
`message` | string
`context` | [Array&lt;ChatMessage&gt;](ChatMessage.md)
`providerOverride` | string
`model` | string
`enableTools` | boolean

## Example

```typescript
import type { AgentTestRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "message": null,
  "context": null,
  "providerOverride": null,
  "model": null,
  "enableTools": null,
} satisfies AgentTestRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AgentTestRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


