# REST API v1 Reference

The REST API provides standard HTTP endpoints for skill management and cloud synchronization. By default, it is available at `/api/v1` (or as configured in the server).

## Authentication

Some endpoints require a Bearer token in the `Authorization` header when `USE_BL1NK_CLOUD` is enabled.

```http
Authorization: Bearer <your_token>
```

---

## Skills Endpoints

### `GET /skills`
Lists skills with support for search, pagination, and sorting.

**Query Parameters:**
- `search` (string): Search in name or description.
- `limit` (number, default 50): Items per page.
- `offset` (number, default 0): Number of items to skip.
- `sortBy` (string, default 'createdAt'): Field to sort by.
- `sortOrder` ('asc' | 'desc', default 'desc'): Sort direction.
- `workspaceId` (string): Cloud workspace ID (optional).

**Response:**
```json
{
  "items": [],
  "total": 0,
  "limit": 50,
  "offset": 0,
  "hasMore": false
}
```

---

### `GET /skills/:id`
Retrieves a single skill by ID.

**Response:** `Skill` object.

---

### `POST /skills`
Creates a new skill.

**Body:**
```json
{
  "name": "Skill Name",
  "description": "Optional description",
  "content": "Skill content/instructions"
}
```

**Response:** `Skill` object (Status 201).

---

### `PUT /skills/:id`
Updates an existing skill.

**Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "content": "Updated content",
  "isPublic": false
}
```

**Response:** `Skill` object.

---

### `DELETE /skills/:id`
Deletes a skill.

**Response:** `{ "success": true }`

---

### `GET /skills/:id/versions`
Retrieves the version history for a skill.

**Query Parameters:**
- `limit` (number, default 10): Number of versions to retrieve.

**Response:** `SkillVersion[]`

---

### `POST /skills/:id/restore`
Restores a skill to a previous version (local mode only).

**Body:**
```json
{
  "version": 2
}
```

**Response:** `Skill` object (the newly created version).

---

## Cloud Auth Endpoints

### `POST /auth/register`
Registers a new user on bl1nk cloud.

### `POST /auth/login`
Logs in to bl1nk cloud and receives a token.

### `GET /auth/me`
Retrieves information about the currently authenticated user.
