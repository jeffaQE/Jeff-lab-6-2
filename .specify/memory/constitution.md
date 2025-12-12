<!--
SYNC IMPACT REPORT
==================
Version Change: N/A → 1.0.0
Rationale: Initial constitution derived from existing project documentation (coding-guidelines.md, testing-guidelines.md, functional-requirements.md, ui-guidelines.md)

Modified Principles: N/A (initial creation)
Added Sections: All (initial creation)
Removed Sections: N/A

Templates Requiring Updates:
✅ .specify/templates/plan-template.md - Reviewed, constitution check section aligns
✅ .specify/templates/spec-template.md - Reviewed, user story and requirements sections align
✅ .specify/templates/tasks-template.md - Reviewed, test-first and structure sections align

Follow-up TODOs: None
-->

# Copilot Bootcamp Todo App Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

**Tests MUST be written before implementation code.** Follow the TDD cycle:
- Write tests that describe expected behavior
- Tests MUST fail initially (red phase)
- Implement minimal code to pass tests (green phase)
- Refactor while keeping tests green
- Achieve 80%+ code coverage across all packages
- Unit tests for components/functions, integration tests for interactions
- Tests stored in `__tests__/` directories colocated with source files

**Rationale**: Test-first development ensures behavior is defined before implementation, creates living documentation, prevents regression, and maintains code quality. This is the foundation of project reliability.

### II. Single Responsibility & Component Isolation

**Each module, component, or function MUST have one well-defined responsibility.**
- React components handle rendering only, not data fetching or business logic
- Services handle business logic and API communication
- Utilities provide focused, reusable functions
- No circular dependencies between modules
- Clear separation between frontend (React) and backend (Express.js)

**Rationale**: Single responsibility makes code easier to test, maintain, debug, and understand. It enables parallel development and reduces the blast radius of changes.

### III. Code Quality Principles (DRY, KISS, SOLID)

**Code MUST adhere to established quality principles:**
- **DRY (Don't Repeat Yourself)**: Extract common code into shared utilities/components
- **KISS (Keep It Simple)**: Prefer simple, readable solutions over complex ones
- **SOLID Principles**: Especially Single Responsibility and Dependency Inversion
- No premature optimization; optimize only when necessary
- Code must be self-documenting; comments explain "why", not "what"

**Rationale**: Quality principles prevent technical debt accumulation, improve maintainability, and ensure the codebase remains approachable for all developers.

### IV. Formatting & Style Consistency

**All code MUST follow standardized formatting rules:**
- 2-space indentation for all files (JS, JSON, CSS, Markdown)
- `camelCase` for variables/functions, `PascalCase` for components/classes, `UPPER_SNAKE_CASE` for constants
- Import order: external libraries → internal modules → styles (separated by blank lines)
- ESLint rules enforced; no warnings or errors before committing
- Line length under 100 characters for code readability
- Unix-style (LF) line endings, no trailing whitespace

**Rationale**: Consistent formatting reduces cognitive load, eliminates style debates, and makes code reviews focus on logic rather than formatting.

### V. Error Handling & User Feedback

**All operations that can fail MUST include proper error handling:**
- Try-catch blocks around asynchronous operations and API calls
- Clear, actionable error messages for users
- Console errors for debugging (development only)
- Graceful degradation when features fail
- No unhandled promise rejections

**Rationale**: Robust error handling prevents application crashes, improves user experience, and provides debugging information when issues occur.

### VI. Testability & Maintainability

**Code MUST be written to be easily testable:**
- Dependencies injected via props/parameters, not hardcoded
- Pure functions preferred when possible
- Mock external dependencies (API calls, timers) in tests
- Test fixtures and utilities reduce test duplication
- Tests independent and able to run in any order

**Rationale**: Testable code is inherently better designed, with clear interfaces and minimal coupling. Maintainable tests provide long-term value.

## Development Standards

### Technology Stack Requirements

**MUST use approved technologies:**
- **Frontend**: React, React DOM, CSS for styling, Jest with React Testing Library
- **Backend**: Node.js (v16+), Express.js, Jest for testing
- **Monorepo**: npm workspaces for package management
- **Version Control**: Git with feature branch workflow

**File Organization**:
- Frontend: `packages/frontend/src/` with `components/`, `services/`, `utils/`, `__tests__/`
- Backend: `packages/backend/src/` with `routes/`, `controllers/`, `services/`, `__tests__/`
- Documentation: `docs/` at repository root

### Performance & Simplicity

**Optimize for simplicity first, performance second:**
- Desktop-focused UI (mobile optimization out of scope)
- Avoid unnecessary React re-renders (use `useMemo`, `useCallback` appropriately)
- Keep bundle sizes reasonable
- Lazy load components when beneficial
- Simple, single-user application (no multi-user complexity)

## Quality Gates

### Pre-Commit Requirements

Before committing code, developers MUST:
1. Run all tests locally and ensure they pass (`npm test`)
2. Fix all ESLint errors and warnings
3. Verify code coverage meets 80% threshold
4. Ensure error handling is implemented for all risky operations
5. Confirm code follows naming conventions and formatting rules
6. Review that components have single responsibility

### Pull Request Requirements

Before merging a pull request:
1. All automated tests MUST pass
2. Code review approval from at least one other developer
3. No ESLint errors or warnings
4. Code coverage maintained or improved
5. User-facing changes include updated documentation
6. Commit messages are clear and descriptive (explain "why")

### Code Review Checklist

Reviewers MUST verify:
- [ ] Code follows naming conventions
- [ ] Imports are organized correctly
- [ ] No linting errors or warnings
- [ ] Code is DRY and avoids repetition
- [ ] Functions/components have single responsibility
- [ ] Error handling is implemented
- [ ] Comments are clear and explain "why"
- [ ] Tests are written for new functionality
- [ ] Tests follow behavior-driven approach
- [ ] No console.log statements in production code

## Governance

### Constitution Authority

This constitution supersedes all other development practices and guidelines. When conflicts arise between this constitution and other documentation, the constitution takes precedence.

### Amendment Process

**To amend this constitution:**
1. Propose changes with clear rationale and impact analysis
2. Document affected areas (code, tests, templates, workflows)
3. Obtain team consensus and approval
4. Update version number following semantic versioning:
   - **MAJOR**: Breaking changes to principles or removal of core requirements
   - **MINOR**: New principles added or material expansion of existing ones
   - **PATCH**: Clarifications, wording improvements, non-semantic fixes
5. Update dependent templates and documentation
6. Communicate changes to all team members
7. Update `LAST_AMENDED_DATE` to date of approval

### Compliance Verification

**Ongoing compliance is maintained through:**
- Regular code reviews against constitution principles
- Automated checks (ESLint, test coverage reports)
- Periodic constitution review sessions (quarterly recommended)
- Documentation of justified exceptions with rationale
- Complexity justified when deviating from KISS principle

### Living Documentation

The constitution is a living document that evolves with the project. Developers should:
- Reference the constitution when making architectural decisions
- Propose amendments when principles no longer serve the project
- Use `docs/` folder documentation for detailed implementation guidance
- Report conflicts or ambiguities for resolution

**Version**: 1.0.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
