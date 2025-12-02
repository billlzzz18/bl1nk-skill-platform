
# CreateMemoryRequest


## Properties

Name | Type
------------ | -------------
`agentId` | string
`kind` | string
`content` | string
`tags` | Array&lt;string&gt;
`importance` | number

## Example

```typescript
import type { CreateMemoryRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "agentId": null,
  "kind": null,
  "content": null,
  "tags": null,
  "importance": null,
} satisfies CreateMemoryRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateMemoryRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


