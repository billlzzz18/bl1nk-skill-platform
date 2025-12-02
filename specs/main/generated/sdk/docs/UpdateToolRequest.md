
# UpdateToolRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`runtime` | string
`entrypoint` | string
`schemaRef` | string
`permissions` | Array&lt;string&gt;

## Example

```typescript
import type { UpdateToolRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "runtime": null,
  "entrypoint": null,
  "schemaRef": null,
  "permissions": null,
} satisfies UpdateToolRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateToolRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


