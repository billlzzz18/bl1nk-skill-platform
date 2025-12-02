
# UpdateKnowledgebaseRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`type` | string
`embeddingModel` | string
`chunkSize` | number
`chunkOverlap` | number

## Example

```typescript
import type { UpdateKnowledgebaseRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "type": null,
  "embeddingModel": null,
  "chunkSize": null,
  "chunkOverlap": null,
} satisfies UpdateKnowledgebaseRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateKnowledgebaseRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


