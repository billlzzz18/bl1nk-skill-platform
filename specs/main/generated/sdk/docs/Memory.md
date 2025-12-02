
# Memory


## Properties

Name | Type
------------ | -------------
`id` | string
`workspaceId` | string
`agentId` | string
`kind` | string
`content` | string
`tags` | Array&lt;string&gt;
`importance` | number
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Memory } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "workspaceId": null,
  "agentId": null,
  "kind": null,
  "content": null,
  "tags": null,
  "importance": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Memory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Memory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


