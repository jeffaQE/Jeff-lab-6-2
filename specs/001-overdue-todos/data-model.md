# Data Model: Overdue Todo Items Feature

**Date**: 2025-12-12  
**Feature**: Support for Overdue Todo Items  
**Status**: No data model changes required

## Overview

This feature does NOT require any changes to the data model. Overdue status is a **derived/calculated property** based on comparing the existing `dueDate` field against the current date. No new fields, tables, or storage mechanisms are needed.

## Existing Entity: Todo

The existing `Todo` entity already contains all necessary data:

```javascript
{
  id: string,           // Unique identifier
  title: string,        // Todo title/description
  dueDate: string,      // ISO 8601 date string (e.g., "2025-12-25"), optional
  completed: boolean,   // Completion status
  createdAt: string     // ISO 8601 timestamp
}
```

**No changes required to this schema.**

---

## Derived Properties (Calculated, Not Stored)

The following properties are calculated on the frontend during rendering and are **NOT persisted**:

### 1. `isOverdue`
- **Type**: boolean
- **Calculation**: `dueDate < currentDate && !completed && dueDate !== null`
- **Purpose**: Determines if red overdue styling should be applied

### 2. `isDueToday`
- **Type**: boolean  
- **Calculation**: `dueDate === currentDate && !completed && dueDate !== null`
- **Purpose**: Determines if yellow/warning styling should be applied

### 3. `daysOverdue`
- **Type**: number (integer, >= 0)
- **Calculation**: `Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24))`
- **Purpose**: Used for "Overdue X days" label
- **Note**: Only calculated when `isOverdue === true`

---

## Validation Rules (No Changes)

Existing validation rules remain unchanged:
- `title`: Required, max 255 characters
- `dueDate`: Optional, must be valid ISO 8601 date string if provided
- `completed`: Required, boolean
- `id` and `createdAt`: System-generated

---

## State Transitions (No Changes to Storage)

Overdue status changes are **purely presentational** and do not affect stored data:

```
Normal Todo (future due date or no due date)
  ↓
Due Today (due date === today) → Yellow styling, "Due today" label
  ↓
Overdue (due date < today) → Red styling, "Overdue X days" label
  ↓
Completed (user marks complete) → All temporal indicators removed
```

**Storage behavior**: Only the `completed` field is updated when user marks a todo complete. The `dueDate` remains unchanged. Overdue status is recalculated each time the todo list is rendered.

---

## Relationships (No Changes)

No relationships exist or are being added. This is a single-user application with a flat list of todos.

---

## Migration Strategy

**No migration required** - This is a frontend-only feature. All existing todos will automatically show overdue status based on their existing `dueDate` values when the feature is deployed.

---

## Backend Impact

**None** - The backend API remains unchanged:
- No new endpoints
- No schema modifications
- No database migrations
- Existing CRUD operations (GET, POST, PUT, DELETE) continue to work as-is

---

## Data Flow

```
Backend (unchanged)
  ↓
  Provides todos with dueDate field
  ↓
Frontend dateUtils.js (NEW)
  ↓
  Calculates isOverdue, isDueToday, daysOverdue
  ↓
TodoCard.js / TodoList.js (UPDATED)
  ↓
  Renders visual indicators based on calculated status
```

---

## Summary

| Aspect | Status | Details |
|--------|--------|---------|
| Schema Changes | ❌ None | Existing `dueDate` field is sufficient |
| New Fields | ❌ None | Status derived from calculation |
| Database Migration | ❌ Not needed | No schema changes |
| Backend API Changes | ❌ None | Frontend-only feature |
| Data Persistence | ❌ Not stored | Calculated on each render |
| Existing Data Compatibility | ✅ Fully compatible | Works with all existing todos |

