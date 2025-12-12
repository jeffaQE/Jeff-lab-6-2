# Developer Quickstart: Overdue Todo Items

**Feature**: Support for Overdue Todo Items  
**Branch**: `001-overdue-todos`  
**Estimated Time**: 4-6 hours

## What This Feature Does

Adds visual indicators to identify overdue todo items:
- **Overdue todos** (past due date): Red text, warning icon (⚠️), red background tint, "Overdue X days" label
- **Due today todos**: Yellow/orange text, caution icon (⚠️), "Due today" label
- **Completed todos**: No overdue indicators regardless of due date
- **Future/no due date todos**: Normal styling

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js v16+ installed
- ✅ Repository cloned and dependencies installed (`npm install`)
- ✅ Feature branch checked out (`git checkout 001-overdue-todos`)
- ✅ Familiarity with React, Jest, and React Testing Library
- ✅ Read the [feature specification](spec.md) and [research findings](research.md)

## Implementation Checklist

Follow these steps in order (TDD approach):

### Phase 1: Date Utilities (1-2 hours)

- [ ] **1.1**: Create `packages/frontend/src/utils/` directory
- [ ] **1.2**: Create `packages/frontend/src/utils/__tests__/` directory
- [ ] **1.3**: Write tests in `dateUtils.test.js`:
  - Test `isOverdue()` with past, today, future, and null dates
  - Test `isDueToday()` with today, yesterday, tomorrow, and null dates
  - Test `getDaysOverdue()` with various date ranges
  - Mock current date for deterministic tests
- [ ] **1.4**: Run tests - they should FAIL (red phase) ✅
- [ ] **1.5**: Implement `dateUtils.js` with:
  - `isOverdue(dueDate, currentDate)` function
  - `isDueToday(dueDate, currentDate)` function
  - `getDaysOverdue(dueDate, currentDate)` function
- [ ] **1.6**: Run tests - they should PASS (green phase) ✅
- [ ] **1.7**: Refactor if needed, ensure tests still pass
- [ ] **1.8**: Verify 100% coverage for dateUtils

**Expected Output**: 
```bash
$ npm test -- dateUtils.test.js
PASS src/utils/__tests__/dateUtils.test.js
  ✓ isOverdue returns true for past dates
  ✓ isOverdue returns false for today
  ✓ isOverdue returns false for future dates
  ...
```

---

### Phase 2: CSS Styling (30-45 minutes)

- [ ] **2.1**: Add overdue/warning color variables to `packages/frontend/src/styles/theme.css`:
  ```css
  --danger-color-light: #c62828;
  --danger-color-dark: #ef5350;
  --danger-background-light: #ffebee;
  --danger-background-dark: #5d1f1f;
  --warning-color-light: #ff6b35;
  --warning-color-dark: #ff8c42;
  ```
- [ ] **2.2**: Add CSS classes for overdue states (in `theme.css` or `App.css`):
  - `.todo-card--overdue` (red text, red background tint)
  - `.todo-card--due-today` (yellow/orange text)
  - `.overdue-icon`, `.warning-icon` (positioning, spacing)
  - `.status-label` (base styles)
  - `.status-label--overdue`, `.status-label--due-today` (color variations)
- [ ] **2.3**: Test dark mode styling manually
- [ ] **2.4**: Verify WCAG AA contrast ratios using browser dev tools

---

### Phase 3: TodoCard Component Updates (2-3 hours)

- [ ] **3.1**: Write failing tests in `TodoCard.test.js`:
  - Overdue todo renders with red styling, icon, and "Overdue X days" label
  - Due today todo renders with yellow styling, icon, and "Due today" label
  - Completed overdue todo has no overdue indicators
  - Todo without due date has no indicators
  - Icon is positioned before title
  - Label is positioned after due date
- [ ] **3.2**: Run tests - they should FAIL ✅
- [ ] **3.3**: Update `TodoCard.js`:
  - Import `isOverdue`, `isDueToday`, `getDaysOverdue` from `dateUtils`
  - Add function to determine CSS class based on todo status
  - Add icon rendering (⚠️) before title for overdue/due today
  - Add label rendering after due date
  - Ensure completed todos skip all overdue logic
  - Apply conditional className to card container
- [ ] **3.4**: Run tests - they should PASS ✅
- [ ] **3.5**: Manual testing:
  - Create todo with past due date → verify red styling, icon, label
  - Create todo with today's date → verify yellow styling, icon, "Due today"
  - Mark overdue todo complete → verify indicators removed
  - Create todo without due date → verify normal styling
- [ ] **3.6**: Verify test coverage for TodoCard > 80%

**Expected UI**:
```
┌─────────────────────────────────────────────────┐
│ ☐ ⚠️ Buy Halloween candy                       │
│    Due: Dec 1, 2025  Overdue 11 days           │  ← Red text, red background
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│ ☐ ⚠️ Finish bootcamp lab                       │
│    Due: Dec 12, 2025  Due today                │  ← Yellow/orange text
└─────────────────────────────────────────────────┘
```

---

### Phase 4: TodoList Component Updates (30 minutes)

- [ ] **4.1**: Write tests in `TodoList.test.js`:
  - List with mix of overdue, due today, and normal todos renders correctly
  - Overdue todos are visually distinct from others
- [ ] **4.2**: Run tests - they should FAIL (if any changes needed) ✅
- [ ] **4.3**: Update `TodoList.js` if needed:
  - Ensure todos are passed to TodoCard unchanged
  - No filtering or sorting by overdue status (out of scope)
- [ ] **4.4**: Run tests - they should PASS ✅
- [ ] **4.5**: Manual testing with multiple todos in different states

---

### Phase 5: Integration & Regression Testing (1 hour)

- [ ] **5.1**: Run full test suite: `npm test --workspace=frontend`
- [ ] **5.2**: Verify coverage: `npm test --workspace=frontend -- --coverage`
  - Overall coverage should be 80%+
  - New files (dateUtils.js) should be 100% covered
- [ ] **5.3**: Fix any failing tests in existing components
- [ ] **5.4**: Test all existing functionality still works:
  - Create todo
  - Edit todo
  - Delete todo
  - Mark complete/incomplete
  - Dark/light mode toggle
- [ ] **5.5**: Test edge cases from spec:
  - Todo with no due date
  - Invalid date format (should gracefully fallback)
  - Timezone handling (client-side)
  - Completed overdue todos
- [ ] **5.6**: Run linter: `npm run lint` (if configured)
- [ ] **5.7**: Accessibility check:
  - Keyboard navigation works
  - Screen reader announces overdue status
  - Color contrast meets WCAG AA

---

## Running the Application

### Development Mode
```bash
# From repository root
npm run start

# Frontend will be at: http://localhost:3000
# Backend will be at: http://localhost:5000
```

### Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test -- dateUtils.test.js

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Manual Testing Scenarios

1. **Create overdue todo**:
   - Add todo with due date = yesterday
   - Verify: Red text, ⚠️ icon, red background, "Overdue 1 day" label

2. **Create due today todo**:
   - Add todo with due date = today
   - Verify: Yellow text, ⚠️ icon, "Due today" label

3. **Complete overdue todo**:
   - Mark overdue todo as complete
   - Verify: All overdue indicators removed, strikethrough applied

4. **Edit due date**:
   - Change due date from future to past
   - Verify: Overdue styling appears
   - Change from past to future
   - Verify: Overdue styling removed

5. **Dark mode**:
   - Toggle dark mode
   - Verify: Overdue colors adjust to dark theme (#ef5350, darker backgrounds)

---

## Common Issues & Solutions

### Issue: Tests fail with "Cannot find module 'utils/dateUtils'"
**Solution**: Ensure `utils/` directory is created in `packages/frontend/src/`

### Issue: Overdue todos show normal styling
**Solution**: Check that CSS classes are applied and theme.css is imported in index.js

### Issue: "Overdue X days" calculation is wrong
**Solution**: Verify date normalization (hours set to 0, 0, 0, 0) and timezone handling

### Issue: Icon doesn't display
**Solution**: Ensure emoji is in a `<span>` tag, check font rendering in browser

### Issue: Coverage below 80%
**Solution**: Add tests for edge cases (null dates, invalid dates, completed todos)

---

## Code Review Checklist

Before submitting PR, verify:
- [ ] All tests pass (`npm test`)
- [ ] Test coverage ≥ 80% (`npm test -- --coverage`)
- [ ] No linter errors (`npm run lint` if configured)
- [ ] Code follows naming conventions (camelCase, PascalCase)
- [ ] Imports organized (external → internal → styles)
- [ ] Comments explain "why", not "what"
- [ ] No console.log statements left in code
- [ ] Manual testing completed for all scenarios
- [ ] Accessibility verified (keyboard, screen reader, contrast)
- [ ] Dark/light mode both work correctly
- [ ] Existing features not broken (regression testing)

---

## Commit Strategy

Follow atomic commits with clear messages:

```bash
# Phase 1
git add packages/frontend/src/utils/
git commit -m "test: add date utility tests for overdue calculation"
git commit -m "feat: implement date utilities for overdue detection"

# Phase 2
git add packages/frontend/src/styles/
git commit -m "style: add overdue and warning color variables and classes"

# Phase 3
git add packages/frontend/src/components/TodoCard*
git commit -m "test: add TodoCard tests for overdue visual indicators"
git commit -m "feat: add overdue visual indicators to TodoCard component"

# Phase 4
git add packages/frontend/src/components/TodoList*
git commit -m "test: add TodoList integration tests for overdue todos"

# Push when ready
git push origin 001-overdue-todos
```

---

## Success Criteria

Feature is complete when:
- ✅ All acceptance scenarios from spec.md pass manual testing
- ✅ All automated tests pass
- ✅ Test coverage ≥ 80%
- ✅ No ESLint errors or warnings
- ✅ WCAG AA accessibility verified
- ✅ Dark/light mode both work correctly
- ✅ No regression in existing features
- ✅ Code reviewed and approved

---

## Next Steps After Completion

1. Create pull request with description linking to spec.md
2. Request code review
3. Address review feedback
4. Merge to main after approval
5. Deploy to production (if applicable)
6. Monitor for user feedback or issues

---

## Helpful Resources

- [Feature Specification](spec.md) - Full requirements and acceptance criteria
- [Research Document](research.md) - Technical decisions and alternatives
- [Data Model](data-model.md) - Entity structure (no changes needed)
- [API Contracts](contracts/api.md) - Backend API (unchanged)
- [MDN Date Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [React Testing Library](https://testing-library.com/react)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Estimated Time Breakdown

| Phase | Task | Time |
|-------|------|------|
| 1 | Date utilities (TDD) | 1-2 hours |
| 2 | CSS styling | 30-45 min |
| 3 | TodoCard updates (TDD) | 2-3 hours |
| 4 | TodoList updates | 30 min |
| 5 | Integration & testing | 1 hour |
| **Total** | **Full implementation** | **4-6 hours** |

