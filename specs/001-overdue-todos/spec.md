# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: 2025-12-12  
**Status**: Draft  
**Input**: User description: "Support for Overdue Todo Items - As a todo application user, I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date."

## Clarifications

### Session 2025-12-12

- Q: What specific visual indicator should be used for overdue todos? → A: Red text + warning icon + subtle background tint
- Q: Should the feature implement progressive overdue indicators (different styling based on how long overdue)? → A: Yes - show exact "Overdue X days" text label only, no color variation
- Q: For the "Overdue X days" label, what should be displayed for todos due today (not yet overdue)? → A: "Due today" label with yellow/warning styling (caution state)
- Q: Where should the warning icon and "Overdue X days" / "Due today" labels be positioned within the todo card? → A: Icon before title, label after due date
- Q: Should the overdue/due today warnings be visible when a todo is marked as completed? → A: No - remove all warning styling when completed (follows existing spec)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Identification of Overdue Todos (Priority: P1)

When viewing the todo list, users need to quickly identify which todos have passed their due date without having to manually compare dates. Overdue todos are visually distinguished using color coding and/or styling that makes them stand out from on-time or completed todos.

**Why this priority**: This is the core value proposition of the feature - enabling users to immediately spot overdue items. Without this, the feature has no purpose. All other aspects of the feature depend on this visual distinction being present.

**Independent Test**: Can be fully tested by creating todos with past due dates and verifying they display with distinct visual styling. Delivers immediate value by helping users identify overdue items at a glance.

**Acceptance Scenarios**:

1. **Given** a todo with a due date in the past and incomplete status, **When** the user views the todo list, **Then** the todo displays with overdue visual styling: red text color, a warning icon (⚠️ or similar), and a subtle red/pink background tint
2. **Given** a todo with a due date of today and incomplete status, **When** the user views the todo list, **Then** the todo displays with normal styling (not overdue)
3. **Given** a todo with a due date in the past but marked as completed, **When** the user views the todo list, **Then** the todo displays with completed styling and no overdue indication (no red text, warning icon, or background tint)
4. **Given** multiple todos with varying due dates, **When** the user views the todo list, **Then** only todos with past due dates that are incomplete show overdue styling (red text, warning icon, background tint)

---

### User Story 2 - Overdue Status Persists Across Sessions (Priority: P2)

The overdue status is calculated dynamically based on the current date, ensuring that todos automatically become overdue when their due date passes without requiring user action or page refresh.

**Why this priority**: This ensures the feature works correctly over time and provides accurate information. Users expect overdue status to be current, not stale. This is secondary to P1 because P1 must exist first for this to have value.

**Independent Test**: Can be tested by creating todos with specific due dates, advancing the system date (or waiting), and verifying the overdue status updates automatically when the page is refreshed or accessed later.

**Acceptance Scenarios**:

1. **Given** a todo with a due date of tomorrow, **When** tomorrow arrives and the user views the todo list, **Then** the todo displays with overdue styling if still incomplete
2. **Given** an overdue todo, **When** the user marks it as complete, **Then** the overdue styling is removed and completed styling is applied
3. **Given** the user views the todo list on one day, **When** the user returns the next day, **Then** todos that became overdue overnight now display with overdue styling

---

### User Story 3 - Clear Visual Feedback for Multiple Overdue States (Priority: P3)

Users can see exactly how many days a todo is overdue through a text label (e.g., "Overdue 3 days"), while all overdue items maintain the same base visual styling (red text, warning icon, background tint). This provides additional context for prioritization without adding visual complexity.

**Why this priority**: This is a nice-to-have enhancement that provides precise temporal information. The core value (P1) works without this, but this adds useful detail to help users prioritize among overdue items without requiring mental date calculation.

**Independent Test**: Can be tested by creating todos with various due dates (yesterday, last week) and verifying each displays an accurate "Overdue X days" label.

**Acceptance Scenarios**:

1. **Given** a todo with a due date of yesterday and incomplete status, **When** the user views the todo list, **Then** the todo displays "Overdue 1 day" text along with standard overdue styling (red text, warning icon, background tint)
2. **Given** a todo with a due date of 7 days ago and incomplete status, **When** the user views the todo list, **Then** the todo displays "Overdue 7 days" text along with standard overdue styling
3. **Given** a todo due today and incomplete status, **When** the user views the todo list, **Then** the todo displays "Due today" text with yellow/warning styling (e.g., orange or yellow text color, caution icon) to indicate urgency without being overdue
4. **Given** multiple overdue todos with different overdue durations, **When** the user views the todo list, **Then** all use the same visual styling (same red color, same icon, same background tint) but each shows its specific "Overdue X days" label

---

### Edge Cases

- What happens when a todo has no due date set? (It should never show as overdue)
- What happens when the system date/time is incorrect? (Overdue calculation should use the system's current date)
- What happens when a user's timezone differs from the server? (Use client-side date comparison for consistency with user's local time)
- What happens when todos become overdue while the user is actively viewing the list? (Overdue status updates on next page refresh, not dynamically in real-time)
- What happens to overdue styling when a todo is edited but remains incomplete? (Overdue styling persists if due date is still in the past)
- What happens when an overdue or due-today todo is marked as completed? (All warning indicators - icon, red/yellow text, background tint, "Overdue X days"/"Due today" labels - are immediately removed and replaced with standard completed styling)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST calculate overdue status by comparing a todo's due date against the current date
- **FR-002**: System MUST display incomplete todos with past due dates using overdue visual styling: red text color (using danger color from theme: #c62828 light mode / #ef5350 dark mode), a warning icon positioned before the todo title, and a subtle background tint (light red/pink)
- **FR-003**: System MUST NOT display overdue styling for completed todos, regardless of due date (no red text, no warning icon, no background tint, no "Overdue X days" label, no "Due today" label - all temporal warning indicators are removed upon completion)
- **FR-004**: System MUST NOT display overdue styling for todos without a due date
- **FR-005**: System MUST use client-side date comparison to determine overdue status (ensures consistency with user's local timezone)
- **FR-006**: System MUST recalculate overdue status each time the todo list is rendered or refreshed
- **FR-007**: Users MUST be able to identify overdue todos at a glance without reading dates
- **FR-008**: System MUST maintain existing todo functionality (create, edit, delete, complete) without regression
- **FR-009**: System MUST display a text label indicating the number of days overdue (e.g., "Overdue 3 days") positioned after the due date for incomplete todos with past due dates, while maintaining consistent visual styling (same red color intensity, same icon, same background tint) across all overdue items regardless of duration
- **FR-010**: System MUST display "Due today" text label positioned after the due date with yellow/warning styling (orange or yellow text color, caution icon such as ⚠️ positioned before the todo title) for incomplete todos with a due date of today, providing a visual caution state that is distinct from both overdue (red) and normal (default) styling

### Key Entities *(include if feature involves data)*

- **Todo**: Existing entity with attributes including id, title, dueDate (optional), completed (boolean), createdAt. No data model changes required - overdue status is derived, not stored.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify an overdue todo within 2 seconds of viewing the todo list (visual distinction is immediately obvious)
- **SC-002**: 100% of incomplete todos with past due dates display with overdue styling
- **SC-003**: 0% of completed todos display with overdue styling (regardless of due date)
- **SC-004**: Overdue status accurately reflects current date across different user sessions and time zones
- **SC-005**: All existing todo features continue to work without degradation or bugs

## Assumptions *(mandatory)*

1. **Date Comparison Logic**: Overdue is defined as "due date is before today's date" - todos due today are NOT considered overdue
2. **Time Precision**: Date comparison uses calendar days only, not time-of-day (a todo due "today" at 9am is not overdue at 10am, but becomes overdue tomorrow)
3. **Visual Design**: Three visual states exist with specific positioning: (a) Overdue todos display with a warning icon (⚠️) positioned before the title, red text using the danger color from UI guidelines (#c62828 light mode / #ef5350 dark mode), a subtle red/pink background tint, and an "Overdue X days" label positioned after the due date. (b) Due today todos display with a caution icon (⚠️) positioned before the title, yellow/orange warning styling (using accent color #ff6b35 from Halloween theme or similar), and a "Due today" label positioned after the due date. (c) Future or no-due-date todos display with normal styling. This multi-cue approach ensures accessibility for users with different visual perception capabilities.
4. **No Real-Time Updates**: Overdue status updates on page load/refresh, not in real-time while user is viewing the page
5. **Timezone Handling**: Client-side date comparison ensures overdue status matches user's local timezone perception
6. **No Notifications**: This feature provides visual identification only - no alerts, emails, or push notifications for overdue items
7. **Existing Data**: All existing todos with due dates will automatically show as overdue if applicable when feature is deployed

## Constraints *(mandatory)*

- Must maintain 80%+ test coverage as per project constitution
- Must follow existing coding standards (DRY, KISS, SOLID principles)
- Must not modify backend data model (overdue is calculated, not stored)
- Must work within existing React frontend architecture
- Must not break existing todo list functionality
- Visual styling must be consistent with Halloween-themed UI guidelines
- Must be keyboard accessible and meet WCAG AA contrast requirements

## Out of Scope

- Notifications or reminders for overdue todos
- Filtering or sorting by overdue status
- Bulk operations on overdue todos
- Different overdue thresholds or user-configurable overdue rules
- Snooze or defer functionality for overdue todos
- Historical tracking of when todos became overdue
- Analytics or reporting on overdue patterns
- Email digests of overdue items
