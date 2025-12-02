
# UpdateAgentRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`summary` | string
`entrySkillId` | string
`skillIds` | Array&lt;string&gt;
`toolIds` | Array&lt;string&gt;
`memoryPolicy` | string
`defaultProvider` | string

## Example

```typescript
import type { UpdateAgentRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "summary": null,
  "entrySkillId": null,
  "skillIds": null,
  "toolIds": null,
  "memoryPolicy": null,
  "defaultProvider": null,
} satisfies UpdateAgentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateAgentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


