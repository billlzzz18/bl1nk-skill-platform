# Entity Relationship Diagram

```mermaid
erDiagram
    Skill ||--o{ SkillVersion : has
    Skill {
        string id
        string name
        int version
    }
```
