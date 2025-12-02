
# TestResponse


## Properties

Name | Type
------------ | -------------
`transcript` | [Array&lt;ChatMessage&gt;](ChatMessage.md)
`provider` | string
`model` | string
`latencyMs` | number
`toolEvents` | [Array&lt;TestResponseToolEventsInner&gt;](TestResponseToolEventsInner.md)

## Example

```typescript
import type { TestResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "transcript": null,
  "provider": null,
  "model": null,
  "latencyMs": null,
  "toolEvents": null,
} satisfies TestResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TestResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


