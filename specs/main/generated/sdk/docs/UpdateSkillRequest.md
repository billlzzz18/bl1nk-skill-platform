
# UpdateSkillRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`content` | string
`tags` | Array&lt;string&gt;
`isPublic` | boolean

## Example

```typescript
import type { UpdateSkillRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "content": null,
  "tags": null,
  "isPublic": null,
} satisfies UpdateSkillRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSkillRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


