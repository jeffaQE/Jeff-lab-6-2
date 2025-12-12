# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todos` | **Date**: 2025-12-12 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-overdue-todos/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add visual identification for overdue todo items in the existing todo application. Incomplete todos with past due dates will display with distinct visual styling (red text, warning icon, subtle background tint, and "Overdue X days" label). Todos due today will show a caution state with yellow/orange styling and "Due today" label. The feature is frontend-only using client-side date comparison; no backend or data model changes are required.

## Technical Context

**Language/Version**: JavaScript (ES6+), Node.js v16+  
**Primary Dependencies**: React 18.2.0, React DOM 18.2.0, React Scripts 5.0.1 (frontend)  
**Storage**: N/A (overdue status is calculated dynamically, not stored)  
**Testing**: Jest 29.7.0 with React Testing Library (@testing-library/react)  
**Target Platform**: Web browsers (desktop-focused)  
**Project Type**: Web application (React frontend + Express.js backend monorepo)  
**Performance Goals**: Client-side date calculation < 1ms per todo, no noticeable render delay  
**Constraints**: 80%+ test coverage, WCAG AA accessibility, no backend changes, Halloween-themed UI consistency  
**Scale/Scope**: Single-user application, frontend-only changes to TodoCard and TodoList components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Initial Check (Pre-Phase 0) ✅ PASS

All gates passed initially - see above for details.

### Re-Check After Phase 1 Design ✅ PASS

After completing research, data model, and API contracts, re-evaluating against constitution:

#### I. Test-First Development ✅ PASS
- **Status**: Quickstart.md documents TDD workflow with red-green-refactor cycle
- **Evidence**: 
  - Phase 1: Write tests first for dateUtils (failing → passing)
  - Phase 3: Write tests first for TodoCard updates (failing → passing)
  - Coverage target: 80%+ confirmed in quickstart
- **Conclusion**: TDD approach is well-defined and feasible

#### II. Single Responsibility & Component Isolation ✅ PASS  
- **Status**: Clear separation of concerns maintained
- **Evidence**:
  - `dateUtils.js`: Pure date calculation functions only
  - `TodoCard.js`: Rendering only, receives calculated status
  - `theme.css`: Styling only, no logic
  - No circular dependencies introduced
- **Conclusion**: Architecture maintains single responsibility

#### III. Code Quality Principles (DRY, KISS, SOLID) ✅ PASS
- **Status**: Simple, maintainable design
- **Evidence**:
  - DRY: Date utilities reused across components
  - KISS: No complex abstractions, straightforward implementation
  - SOLID: Single responsibility maintained, pure functions testable
- **Conclusion**: Design follows quality principles

#### IV. Formatting & Style Consistency ✅ PASS
- **Status**: Existing conventions maintained
- **Evidence**: Research specifies following existing patterns (CSS files, component structure, naming)
- **Conclusion**: No new formatting issues introduced

#### V. Error Handling & User Feedback ✅ PASS
- **Status**: Graceful degradation for edge cases
- **Evidence**:
  - Invalid dates: Treat as null, show normal styling
  - Missing dates: Defensive checks in utilities
  - No try-catch needed (synchronous, no external dependencies)
- **Conclusion**: Appropriate error handling for feature scope

#### VI. Testability & Maintainability ✅ PASS
- **Status**: Highly testable design
- **Evidence**:
  - Pure functions (dateUtils) easy to unit test
  - Components receive props, testable with React Testing Library
  - Mock date support for deterministic tests
  - 100% coverage target for utilities, 80%+ overall
- **Conclusion**: Design optimized for testability

**OVERALL AFTER PHASE 1**: ✅ ALL GATES STILL PASS - Proceed to Phase 2 (tasks)

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
packages/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── TodoCard.js          # UPDATE: Add overdue visual styling
│       │   ├── TodoList.js          # UPDATE: Pass overdue status to cards
│       │   └── __tests__/
│       │       ├── TodoCard.test.js # UPDATE: Add overdue styling tests
│       │       └── TodoList.test.js # UPDATE: Add overdue rendering tests
│       ├── utils/                   # NEW DIRECTORY
│       │   ├── dateUtils.js         # NEW: Date comparison & overdue calculation
│       │   └── __tests__/
│       │       └── dateUtils.test.js # NEW: Test date utilities
│       ├── styles/
│       │   └── theme.css            # UPDATE: Add overdue/warning color classes
│       └── App.css                  # POSSIBLY UPDATE: Global overdue styles
└── backend/
    └── (no changes required)
```

**Structure Decision**: Web application (Option 2) with React frontend and Express.js backend in npm workspaces monorepo. This feature only modifies the frontend package. New `utils/` directory will be created for date calculation logic following existing project structure patterns.

## Complexity Tracking

No constitution violations detected. This feature follows all established principles:
- Test-first development with comprehensive test coverage
- Single responsibility (date utils separate from components)
- Simple, maintainable implementation
- No new architectural patterns or complexity introduced

---

## Phase Completion Summary

### Phase 0: Outline & Research ✅ COMPLETE
**Artifacts Generated**:
- ✅ [research.md](research.md) - Technical decisions and implementation approach

**Key Decisions Made**:
- Date comparison: Native JavaScript Date API (no external libraries)
- Styling: CSS classes with CSS variables for theming
- Icons: Unicode emoji (⚠️) for zero-dependency solution
- Testing: Jest unit tests for utilities, React Testing Library for components
- Accessibility: Multi-cue design (icon + color + text + background)

**All Technical Unknowns Resolved**: ✅ No "NEEDS CLARIFICATION" items remain

---

### Phase 1: Design & Contracts ✅ COMPLETE
**Artifacts Generated**:
- ✅ [data-model.md](data-model.md) - Confirmed no database changes needed
- ✅ [contracts/api.md](contracts/api.md) - Confirmed no API changes needed
- ✅ [quickstart.md](quickstart.md) - Developer implementation guide

**Design Outcomes**:
- No data model changes required (overdue is derived)
- No backend API changes required (frontend-only feature)
- Clear component structure with separation of concerns
- Comprehensive developer guide with TDD workflow

**Constitution Re-Check**: ✅ All gates still pass after design phase

---

### Phase 2: Task Breakdown - NEXT STEP
**Command**: `/speckit.tasks` (NOT run by `/speckit.plan`)

**What Happens Next**:
- Break down implementation into atomic, testable tasks
- Create task list in `tasks.md`
- Define acceptance criteria for each task
- Establish task dependencies and ordering

**Do Not Proceed Yet**: This planning phase ends here. Developer should review plan artifacts and run `/speckit.tasks` when ready to create implementation tasks.

---

## Deliverables Status

| Artifact | Status | Location | Purpose |
|----------|--------|----------|---------|
| plan.md | ✅ Complete | This file | Overall implementation strategy |
| research.md | ✅ Complete | [research.md](research.md) | Technical decisions & alternatives |
| data-model.md | ✅ Complete | [data-model.md](data-model.md) | Entity structure (no changes) |
| contracts/api.md | ✅ Complete | [contracts/api.md](contracts/api.md) | API contracts (no changes) |
| quickstart.md | ✅ Complete | [quickstart.md](quickstart.md) | Developer implementation guide |
| tasks.md | ⏳ Pending | Run `/speckit.tasks` | Atomic task breakdown |

---

## Ready for Implementation

This feature is **ready for task breakdown** (`/speckit.tasks`). All planning artifacts are complete:

✅ Technical approach researched and decided  
✅ Constitution compliance verified (all gates pass)  
✅ Data model reviewed (no changes needed)  
✅ API contracts confirmed (no changes needed)  
✅ Developer quickstart guide created  
✅ Project structure defined  
✅ No blocking unknowns or clarifications needed  

**Estimated Implementation Time**: 4-6 hours (per quickstart.md)

**Next Command**: `/speckit.tasks` to generate task breakdown and begin implementation
