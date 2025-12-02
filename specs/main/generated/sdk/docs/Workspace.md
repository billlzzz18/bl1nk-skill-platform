
# Workspace


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`slug` | string
`description` | string
`visibility` | string
`defaultProvider` | string
`stats` | [WorkspaceStats](WorkspaceStats.md)
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { Workspace } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "slug": null,
  "description": null,
  "visibility": null,
  "defaultProvider": null,
  "stats": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies Workspace

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Workspace
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


