# Tasks: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Input**: Design documents from `/specs/001-overdue-todos/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Test Strategy**: Following TDD approach per project constitution - tests written first (red), then implementation (green), then refactor.

## Format: `- [ ] [ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- All descriptions include exact file paths

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create directory structure and foundational utilities needed by all user stories

- [X] T001 Create packages/frontend/src/utils/ directory for date utility functions
- [X] T002 Create packages/frontend/src/utils/__tests__/ directory for date utility tests

**Checkpoint**: Directory structure ready for development

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Date utilities that ALL user stories depend on - MUST complete before user story work begins

**⚠️ CRITICAL**: No user story implementation can begin until dateUtils are complete and tested

### Tests for Date Utilities (TDD: Write First)

- [X] T003 [P] Write test for isOverdue() with past date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T004 [P] Write test for isOverdue() with today's date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T005 [P] Write test for isOverdue() with future date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T006 [P] Write test for isOverdue() with null date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T007 [P] Write test for isDueToday() with today's date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T008 [P] Write test for isDueToday() with yesterday's date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T009 [P] Write test for isDueToday() with null date in packages/frontend/src/utils/__tests__/dateUtils.test.js
- [X] T010 [P] Write test for getDaysOverdue() with various date ranges in packages/frontend/src/utils/__tests__/dateUtils.test.js

**Checkpoint**: Run tests - all should FAIL (red phase) ✅

### Implementation of Date Utilities

- [X] T011 Implement isOverdue() function in packages/frontend/src/utils/dateUtils.js
- [X] T012 Implement isDueToday() function in packages/frontend/src/utils/dateUtils.js
- [X] T013 Implement getDaysOverdue() function in packages/frontend/src/utils/dateUtils.js

**Checkpoint**: Run tests - all should PASS (green phase) ✅

### Refactoring

- [X] T014 Refactor dateUtils.js for code quality (DRY, defensive null checks) while keeping tests green

**Checkpoint**: Foundation complete - date utilities tested and ready. User stories can now begin in parallel.

---

## Phase 3: User Story 1 - Visual Identification of Overdue Todos (Priority: P1) 🎯 MVP

**Goal**: Users can immediately identify overdue todos through distinct visual styling (red text, warning icon, red background tint)

**Independent Test**: Create todo with past due date → verify red styling, icon, and background tint appear. Mark complete → verify indicators removed.

### CSS Styling for User Story 1

- [X] T015 [P] [US1] Add overdue color variables to packages/frontend/src/styles/theme.css (--danger-color-light, --danger-color-dark, --danger-background-light, --danger-background-dark)
- [X] T016 [P] [US1] Add CSS class .todo-card--overdue in packages/frontend/src/styles/theme.css
- [X] T017 [P] [US1] Add CSS class .overdue-icon in packages/frontend/src/styles/theme.css
- [X] T018 [P] [US1] Add CSS class .todo-card--completed in packages/frontend/src/styles/theme.css (if not exists)

### Tests for TodoCard Component (TDD: Write First)

- [X] T019 [US1] Write test: overdue todo renders with red text color in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T020 [US1] Write test: overdue todo renders warning icon (⚠️) before title in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T021 [US1] Write test: overdue todo renders with background tint in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T022 [US1] Write test: completed overdue todo has NO overdue styling in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T023 [US1] Write test: todo without due date has NO overdue styling in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T024 [US1] Write test: todo due today has NO overdue styling in packages/frontend/src/components/__tests__/TodoCard.test.js

**Checkpoint**: Run tests - all new tests should FAIL (red phase) ✅

### Implementation for TodoCard Component

- [X] T025 [US1] Import isOverdue from utils/dateUtils in packages/frontend/src/components/TodoCard.js
- [X] T026 [US1] Add function to determine CSS class based on overdue status in packages/frontend/src/components/TodoCard.js
- [X] T027 [US1] Apply conditional className to todo card container in packages/frontend/src/components/TodoCard.js
- [X] T028 [US1] Render warning icon (⚠️) before title for overdue todos in packages/frontend/src/components/TodoCard.js
- [X] T029 [US1] Ensure completed todos skip overdue rendering logic in packages/frontend/src/components/TodoCard.js

**Checkpoint**: Run tests - all User Story 1 tests should PASS (green phase) ✅

### Manual Testing for User Story 1

- [X] T030 [US1] Manual test: Create todo with past due date → verify red text, icon, background tint
- [X] T031 [US1] Manual test: Mark overdue todo complete → verify all indicators removed
- [X] T032 [US1] Manual test: Create todo without due date → verify normal styling
- [X] T033 [US1] Manual test: Verify WCAG AA color contrast for red text on backgrounds

**Checkpoint**: User Story 1 is fully functional and independently testable ✅

---

## Phase 4: User Story 2 - Overdue Status Persists Across Sessions (Priority: P2)

**Goal**: Overdue status is calculated dynamically on each render, ensuring accuracy over time without user action

**Independent Test**: Create todo with tomorrow's date → wait/mock date change → refresh page → verify overdue styling appears automatically

### Tests for User Story 2 (TDD: Write First)

- [X] T034 [US2] Write test: todo becomes overdue when system date advances in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T035 [US2] Write test: overdue styling removed when todo marked complete in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T036 [US2] Write test: overdue status recalculated on component re-render in packages/frontend/src/components/__tests__/TodoCard.test.js

**Checkpoint**: Run tests - all new tests should FAIL (red phase) ✅

### Implementation for User Story 2

- [X] T037 [US2] Ensure isOverdue() called on every render (no caching/memoization of overdue status) in packages/frontend/src/components/TodoCard.js
- [X] T038 [US2] Update TodoList to re-render on data changes in packages/frontend/src/components/TodoList.js

**Checkpoint**: Run tests - all User Story 2 tests should PASS (green phase) ✅

### Manual Testing for User Story 2

- [X] T039 [US2] Manual test: Create todo with future date → mock system date change → verify overdue styling appears on refresh
- [X] T040 [US2] Manual test: Leave app open with overdue todo → refresh next day → verify styling still accurate

**Checkpoint**: User Story 2 is fully functional - overdue status dynamically calculated ✅

---

## Phase 5: User Story 3 - Clear Visual Feedback for Multiple Overdue States (Priority: P3)

**Goal**: Users see exact days overdue via "Overdue X days" label and "Due today" warning state with yellow styling

**Independent Test**: Create todos with dates: yesterday, 7 days ago, today → verify accurate labels ("Overdue 1 day", "Overdue 7 days", "Due today") with appropriate colors

### CSS Styling for User Story 3

- [X] T041 [P] [US3] Add warning color variables to packages/frontend/src/styles/theme.css (--warning-color-light, --warning-color-dark)
- [X] T042 [P] [US3] Add CSS class .todo-card--due-today in packages/frontend/src/styles/theme.css
- [X] T043 [P] [US3] Add CSS class .status-label in packages/frontend/src/styles/theme.css
- [X] T044 [P] [US3] Add CSS class .status-label--overdue in packages/frontend/src/styles/theme.css
- [X] T045 [P] [US3] Add CSS class .status-label--due-today in packages/frontend/src/styles/theme.css

### Tests for User Story 3 (TDD: Write First)

- [X] T046 [US3] Write test: todo due yesterday shows "Overdue 1 day" label in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T047 [US3] Write test: todo due 7 days ago shows "Overdue 7 days" label in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T048 [US3] Write test: todo due today shows "Due today" label with yellow styling in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T049 [US3] Write test: overdue label positioned after due date in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T050 [US3] Write test: "Due today" icon positioned before title in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T051 [US3] Write test: all overdue todos use same base styling regardless of days overdue in packages/frontend/src/components/__tests__/TodoCard.test.js
- [X] T052 [US3] Write test: completed todos show NO labels in packages/frontend/src/components/__tests__/TodoCard.test.js

**Checkpoint**: Run tests - all new tests should FAIL (red phase) ✅

### Implementation for User Story 3

- [X] T053 [US3] Import isDueToday and getDaysOverdue from utils/dateUtils in packages/frontend/src/components/TodoCard.js
- [X] T054 [US3] Create getStatusLabel() helper function to generate label text in packages/frontend/src/components/TodoCard.js
- [X] T055 [US3] Render "Overdue X days" label after due date for overdue todos in packages/frontend/src/components/TodoCard.js
- [X] T056 [US3] Render "Due today" label after due date for due-today todos in packages/frontend/src/components/TodoCard.js
- [X] T057 [US3] Apply yellow/warning styling to due-today todos in packages/frontend/src/components/TodoCard.js
- [X] T058 [US3] Render caution icon (⚠️) before title for due-today todos in packages/frontend/src/components/TodoCard.js
- [X] T059 [US3] Handle plural/singular for days (1 day vs 7 days) in packages/frontend/src/components/TodoCard.js

**Checkpoint**: Run tests - all User Story 3 tests should PASS (green phase) ✅

### Manual Testing for User Story 3

- [X] T060 [US3] Manual test: Create todo due yesterday → verify "Overdue 1 day" label
- [X] T061 [US3] Manual test: Create todo due last week → verify "Overdue 7 days" label
- [X] T062 [US3] Manual test: Create todo due today → verify "Due today" label with yellow styling
- [X] T063 [US3] Manual test: Verify label positioning (after due date) is correct
- [X] T064 [US3] Manual test: Verify icon positioning (before title) is correct for both states

**Checkpoint**: User Story 3 is fully functional - all temporal states have clear visual feedback ✅

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final integration, testing, and refinements affecting multiple user stories

### Integration Testing

- [X] T065 [P] Write test: TodoList renders mix of normal, due-today, and overdue todos correctly in packages/frontend/src/components/__tests__/TodoList.test.js
- [X] T066 [P] Write test: Multiple overdue todos with different durations all display properly in packages/frontend/src/components/__tests__/TodoList.test.js
- [X] T067 Run full test suite: npm test --workspace=frontend
- [X] T068 Verify test coverage ≥ 80%: npm test --workspace=frontend -- --coverage

### Regression Testing

- [ ] T069 Test existing functionality: Create todo still works
- [ ] T070 Test existing functionality: Edit todo title/due date still works
- [ ] T071 Test existing functionality: Delete todo still works
- [ ] T072 Test existing functionality: Mark todo complete/incomplete still works
- [ ] T073 Test existing functionality: Dark/light mode toggle still works

### Edge Cases & Error Handling

- [ ] T074 Test edge case: Invalid date format gracefully falls back to normal styling
- [ ] T075 Test edge case: Null/undefined due date shows no overdue indicators
- [ ] T076 Test edge case: Editing overdue todo's due date updates styling immediately

### Accessibility & Polish

- [ ] T077 Verify keyboard navigation works for all todo states
- [ ] T078 Test screen reader announces overdue status correctly
- [ ] T079 Verify WCAG AA contrast ratios for all color combinations
- [ ] T080 Test dark mode styling for overdue, due-today, and normal states

### Code Quality

- [ ] T081 Run linter (if configured): npm run lint --workspace=frontend
- [ ] T082 Remove any console.log statements from production code
- [ ] T083 Add JSDoc comments to dateUtils functions
- [ ] T084 Verify import organization follows project standards

### Documentation

- [ ] T085 Update README.md with overdue feature description (if applicable)
- [ ] T086 Validate quickstart.md instructions match actual implementation

---

## Dependencies & Execution Order

### Phase Dependencies

1. **Setup (Phase 1)** → No dependencies
2. **Foundational (Phase 2)** → Depends on Setup - **BLOCKS all user stories**
3. **User Stories (Phases 3-5)** → All depend on Foundational completion
4. **Polish (Phase 6)** → Depends on all implemented user stories

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Foundational phase
- **US2 (P2)**: Can start after Foundational phase - integrates with US1 but is independently testable
- **US3 (P3)**: Can start after Foundational phase - extends US1/US2 but is independently testable

**Key Insight**: Once Foundational is complete, US1, US2, and US3 can all be worked on in parallel by different developers if desired.

### Within Each User Story

1. CSS styles first (can run in parallel, marked [P])
2. Tests written before implementation (TDD red phase)
3. Implementation to make tests pass (TDD green phase)
4. Manual testing for validation

### Parallel Opportunities

**Setup (Phase 1)**:
- T001 and T002 are sequential (directory creation)

**Foundational (Phase 2)**:
- Tests T003-T010 can all be written in parallel [P]
- Implementation T011-T013 should be done together (same file)

**User Story 1 (Phase 3)**:
- CSS tasks T015-T018 can all run in parallel [P]
- Tests T019-T024 can be written simultaneously
- Implementation T025-T029 should be done together

**User Story 3 (Phase 5)**:
- CSS tasks T041-T045 can all run in parallel [P]

**Polish (Phase 6)**:
- Integration tests T065-T066 can run in parallel [P]
- Edge case tests can run in parallel
- Accessibility checks can run in parallel

---

## Parallel Example: After Foundational Phase

If you have 3 developers, they can work simultaneously on different user stories:

```bash
# Developer 1: User Story 1 (MVP)
git checkout -b feature/US1-overdue-visual-styling
# Work on Phase 3 tasks T015-T033

# Developer 2: User Story 2  
git checkout -b feature/US2-dynamic-calculation
# Work on Phase 4 tasks T034-T040

# Developer 3: User Story 3
git checkout -b feature/US3-status-labels
# Work on Phase 5 tasks T041-T064
```

Each story can be developed, tested, and deployed independently!

---

## Implementation Strategy

### MVP First (Recommended)

**Iteration 1**: Complete User Story 1 only (Phase 1 → Phase 2 → Phase 3 → Phase 6)
- Delivers core value: visual identification of overdue todos
- ~2-3 hours of work
- Can deploy and get user feedback before continuing

**Iteration 2**: Add User Story 2 (Phase 4 → Phase 6)
- Ensures dynamic calculation works correctly over time
- ~1 hour of additional work

**Iteration 3**: Add User Story 3 (Phase 5 → Phase 6)
- Polish with precise day counts and "Due today" state
- ~1-2 hours of additional work

### All-at-Once (If Time Permits)

Complete all phases sequentially: Phase 1 → 2 → 3 → 4 → 5 → 6
- Total estimated time: 4-6 hours (per quickstart.md)
- Delivers complete feature in one iteration

---

## Success Criteria

Feature is complete when:

- ✅ All tasks in implemented user stories are checked off
- ✅ All tests pass: `npm test --workspace=frontend`
- ✅ Test coverage ≥ 80%: `npm test --workspace=frontend -- --coverage`
- ✅ No linter errors (if configured)
- ✅ All acceptance scenarios from spec.md validated manually
- ✅ WCAG AA accessibility verified
- ✅ Dark/light mode both work correctly
- ✅ No regression in existing features
- ✅ Code reviewed and approved

---

## Task Count Summary

| Phase | Task Count | Estimated Time |
|-------|------------|----------------|
| Phase 1: Setup | 2 tasks | 5 min |
| Phase 2: Foundational | 12 tasks | 1-2 hours |
| Phase 3: User Story 1 (P1) | 19 tasks | 2-3 hours |
| Phase 4: User Story 2 (P2) | 7 tasks | 1 hour |
| Phase 5: User Story 3 (P3) | 24 tasks | 1-2 hours |
| Phase 6: Polish | 22 tasks | 1 hour |
| **TOTAL** | **86 tasks** | **4-6 hours** |

**Tasks per User Story**:
- US1 (P1 - MVP): 19 tasks
- US2 (P2): 7 tasks  
- US3 (P3): 24 tasks
- Infrastructure/Polish: 36 tasks

**Parallel opportunities**: 21 tasks marked [P] can run simultaneously

---

## Next Steps

1. Review this task list with team
2. Decide on implementation strategy (MVP first vs all-at-once)
3. Assign tasks to developers
4. Create feature branch: `git checkout -b 001-overdue-todos`
5. Begin with Phase 1 (Setup)
6. Follow TDD workflow: Test → Implement → Refactor
7. Check off tasks as completed
8. Create PR when user story(ies) complete
