
# Skill


## Properties

Name | Type
------------ | -------------
`id` | string
`workspaceId` | string
`name` | string
`description` | string
`content` | string
`version` | number
`tags` | Array&lt;string&gt;
`isPublic` | boolean
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Skill } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "workspaceId": null,
  "name": null,
  "description": null,
  "content": null,
  "version": null,
  "tags": null,
  "isPublic": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Skill

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Skill
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


