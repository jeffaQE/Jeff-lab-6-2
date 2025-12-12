# API Contracts: Overdue Todo Items Feature

**Date**: 2025-12-12  
**Feature**: Support for Overdue Todo Items  
**Status**: No API changes required

## Overview

This feature is **frontend-only** and requires **no changes** to the backend API. All existing endpoints continue to work as-is. This document confirms the existing API contracts are sufficient for the feature.

---

## Existing Endpoints (Unchanged)

### GET /api/todos
**Purpose**: Retrieve all todos  
**Method**: GET  
**URL**: `/api/todos`  
**Authentication**: None (single-user app)

**Response**: 200 OK
```json
{
  "todos": [
    {
      "id": "1",
      "title": "Buy Halloween decorations",
      "dueDate": "2025-12-25",
      "completed": false,
      "createdAt": "2025-12-01T10:00:00Z"
    },
    {
      "id": "2",
      "title": "Prepare for bootcamp",
      "dueDate": null,
      "completed": false,
      "createdAt": "2025-12-10T14:30:00Z"
    }
  ]
}
```

**Usage for Overdue Feature**:
- Frontend receives `dueDate` field (ISO 8601 string or null)
- Frontend calculates overdue status client-side using date comparison
- No backend processing or filtering needed

---

### POST /api/todos
**Purpose**: Create a new todo  
**Method**: POST  
**URL**: `/api/todos`  
**Authentication**: None

**Request Body**:
```json
{
  "title": "New todo item",
  "dueDate": "2025-12-31"
}
```

**Response**: 201 Created
```json
{
  "id": "3",
  "title": "New todo item",
  "dueDate": "2025-12-31",
  "completed": false,
  "createdAt": "2025-12-12T12:00:00Z"
}
```

**Usage for Overdue Feature**:
- No changes to creation logic
- Created todos with past `dueDate` will automatically show as overdue when rendered

---

### PUT /api/todos/:id
**Purpose**: Update an existing todo  
**Method**: PUT  
**URL**: `/api/todos/:id`  
**Authentication**: None

**Request Body** (all fields optional):
```json
{
  "title": "Updated title",
  "dueDate": "2025-12-20",
  "completed": true
}
```

**Response**: 200 OK
```json
{
  "id": "1",
  "title": "Updated title",
  "dueDate": "2025-12-20",
  "completed": true,
  "createdAt": "2025-12-01T10:00:00Z"
}
```

**Usage for Overdue Feature**:
- When user marks todo as complete (`completed: true`), frontend removes all overdue styling
- `dueDate` can be updated; frontend recalculates overdue status on next render
- No backend logic needed for overdue status

---

### DELETE /api/todos/:id
**Purpose**: Delete a todo  
**Method**: DELETE  
**URL**: `/api/todos/:id`  
**Authentication**: None

**Response**: 204 No Content

**Usage for Overdue Feature**:
- No changes to deletion logic
- Overdue todos can be deleted same as any other todo

---

## Frontend Calculation Contract

While not an API contract, this defines the "contract" between date utilities and components:

### `dateUtils.js` Exports

```typescript
// Type definitions for clarity (not enforced in JavaScript)

function isOverdue(dueDate: string | null, currentDate?: Date): boolean
// Returns true if dueDate is before today (normalized to midnight)
// Returns false if dueDate is null/undefined or today/future

function isDueToday(dueDate: string | null, currentDate?: Date): boolean
// Returns true if dueDate is today (calendar day comparison)
// Returns false if dueDate is null/undefined or not today

function getDaysOverdue(dueDate: string | null, currentDate?: Date): number
// Returns integer number of days overdue (0 or positive)
// Returns 0 if dueDate is null/undefined or not overdue

function getStatusLabel(todo: Todo): string | null
// Returns "Due today" | "Overdue X day(s)" | null
// null for completed todos, future dates, or no due date
```

### Component Usage Contract

```javascript
// TodoCard.js expects:
const todo = {
  id: string,
  title: string,
  dueDate: string | null,
  completed: boolean,
  createdAt: string
};

// TodoCard.js will:
// 1. Call dateUtils functions to determine status
// 2. Apply CSS classes based on status
// 3. Render icon if overdue or due today
// 4. Render status label after due date
// 5. Remove all indicators if completed === true
```

---

## Error Handling Contract

### Invalid Date Strings
If backend returns invalid `dueDate` format:
- **Frontend behavior**: Treat as null (no overdue status shown)
- **Logged**: Console warning in development mode
- **User impact**: None (graceful degradation)

### Missing `dueDate` Field
If todo object lacks `dueDate`:
- **Frontend behavior**: Treat as null (normal styling)
- **User impact**: None

### Server Errors
If API calls fail:
- **Frontend behavior**: Existing error handling continues to work
- **Overdue feature**: Shows status for already-loaded todos, degrades gracefully for failed fetches

---

## Compatibility

### Backward Compatibility
✅ **Fully compatible** - Existing backend and frontend code continue to work. New overdue visual indicators are additive only.

### Forward Compatibility
✅ **Future-proof** - If backend later adds overdue-related fields or endpoints, this frontend implementation can easily adapt or be replaced.

---

## Testing Contracts

### Unit Test Expectations
```javascript
// dateUtils tests verify:
- isOverdue(pastDate) → true
- isOverdue(todayDate) → false
- isOverdue(futureDate) → false
- isOverdue(null) → false
- getDaysOverdue(pastDate) → correct integer
```

### Integration Test Expectations
```javascript
// Component tests verify:
- Overdue todo renders with red styling, icon, label
- Due today todo renders with yellow styling, icon, label
- Completed overdue todo renders without indicators
- Todo without due date renders normally
```

---

## Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| Backend API Changes | ❌ None | All existing endpoints unchanged |
| New Endpoints | ❌ None | Not needed for frontend feature |
| Response Schema Changes | ❌ None | `dueDate` field already exists |
| Request Schema Changes | ❌ None | No new fields to send |
| Authentication Changes | ❌ None | Single-user app unchanged |
| Frontend Contracts | ✅ Defined | dateUtils and component interfaces documented |
| Error Handling | ✅ Documented | Graceful degradation for invalid dates |
| Compatibility | ✅ Full | Backward and forward compatible |

