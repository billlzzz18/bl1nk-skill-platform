
# Knowledgebase


## Properties

Name | Type
------------ | -------------
`id` | string
`workspaceId` | string
`name` | string
`description` | string
`type` | string
`embeddingModel` | string
`chunkSize` | number
`chunkOverlap` | number
`documentCount` | number
`createdAt` | Date

## Example

```typescript
import type { Knowledgebase } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "workspaceId": null,
  "name": null,
  "description": null,
  "type": null,
  "embeddingModel": null,
  "chunkSize": null,
  "chunkOverlap": null,
  "documentCount": null,
  "createdAt": null,
} satisfies Knowledgebase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Knowledgebase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


