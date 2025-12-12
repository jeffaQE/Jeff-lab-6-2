# Research: Overdue Todo Items Feature

**Date**: 2025-12-12  
**Feature**: Support for Overdue Todo Items  
**Purpose**: Resolve technical unknowns and establish implementation approach

## Research Questions & Findings

### 1. Date Comparison in JavaScript

**Question**: What's the best practice for comparing dates in JavaScript for client-side overdue calculation?

**Decision**: Use JavaScript Date objects with date-only comparison (ignore time component)

**Rationale**:
- Native `Date` object is well-supported across all browsers
- No external libraries needed (keeps bundle size small)
- Comparing calendar days only (per spec requirement) requires normalizing times to midnight
- Spec explicitly states "todos due today are NOT considered overdue"

**Implementation Approach**:
```javascript
function isOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return false;
  
  // Normalize to midnight for date-only comparison
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  return due < current; // true if due date is before today
}

function isDueToday(dueDate, currentDate = new Date()) {
  if (!dueDate) return false;
  
  const due = new Date(dueDate);
  const current = new Date(currentDate);
  
  return due.toDateString() === current.toDateString();
}

function getDaysOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return 0;
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  const diffMs = current - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
```

**Alternatives Considered**:
- ❌ Moment.js: Deprecated, too large for this simple need
- ❌ date-fns: Overkill for basic date comparison
- ✅ Native Date: Simple, no dependencies, sufficient for requirements

---

### 2. React Styling Approach for Overdue Visual Indicators

**Question**: How should we implement the three-state visual styling (normal, due today, overdue) in React components?

**Decision**: Conditional CSS classes with CSS variables for theme colors

**Rationale**:
- Existing codebase uses CSS files for styling (App.css, theme.css)
- Conditional className approach is idiomatic React
- CSS variables support theme (light/dark mode) per UI guidelines
- Separation of concerns: logic in JS, styling in CSS

**Implementation Approach**:
```javascript
// In TodoCard.js
const getStatusClassName = (todo) => {
  if (todo.completed) return 'todo-card--completed';
  if (!todo.dueDate) return 'todo-card--normal';
  if (isOverdue(todo.dueDate)) return 'todo-card--overdue';
  if (isDueToday(todo.dueDate)) return 'todo-card--due-today';
  return 'todo-card--normal';
};

// In CSS
.todo-card--overdue {
  color: var(--danger-color);
  background-color: var(--danger-background);
}

.todo-card--due-today {
  color: var(--warning-color);
}
```

**Alternatives Considered**:
- ❌ Inline styles: Doesn't support theming, harder to maintain
- ❌ CSS-in-JS library: Adds dependency, not used elsewhere in codebase
- ✅ CSS classes with variables: Consistent with existing patterns

---

### 3. Icon Implementation for Warning States

**Question**: Should we use emoji, SVG icons, or an icon library for the warning/caution icons?

**Decision**: Unicode emoji (⚠️) for simplicity

**Rationale**:
- No additional dependencies required
- Emoji are accessible and work across all browsers
- Existing codebase doesn't use an icon library
- Emoji have good contrast for accessibility
- Spec explicitly mentions "⚠️ or similar" indicating emoji is acceptable

**Implementation Approach**:
```javascript
{isOverdue(todo.dueDate) && <span className="overdue-icon" aria-label="Warning">⚠️</span>}
{isDueToday(todo.dueDate) && <span className="warning-icon" aria-label="Caution">⚠️</span>}
```

**Alternatives Considered**:
- ❌ Font Awesome / React Icons: Adds dependency, download size
- ❌ Custom SVG: More work, same visual result
- ✅ Unicode emoji: Zero dependencies, universally supported

---

### 4. Label Text Formatting

**Question**: How should we format the "Overdue X days" and "Due today" labels?

**Decision**: Simple text spans with conditional rendering

**Rationale**:
- Spec requires labels positioned "after the due date"
- Clear, readable labels help accessibility
- Simple implementation aligns with KISS principle

**Implementation Approach**:
```javascript
const getStatusLabel = (todo) => {
  if (!todo.dueDate || todo.completed) return null;
  
  if (isDueToday(todo.dueDate)) {
    return <span className="status-label status-label--due-today">Due today</span>;
  }
  
  if (isOverdue(todo.dueDate)) {
    const days = getDaysOverdue(todo.dueDate);
    const dayLabel = days === 1 ? 'day' : 'days';
    return <span className="status-label status-label--overdue">Overdue {days} {dayLabel}</span>;
  }
  
  return null;
};
```

**Alternatives Considered**:
- ❌ Tooltips: Less discoverable, requires hover
- ❌ Separate component: Overkill for simple text
- ✅ Inline spans with classes: Simple, direct, testable

---

### 5. Testing Strategy

**Question**: How should we structure tests to achieve 80%+ coverage for this feature?

**Decision**: Unit tests for date utilities, integration tests for component rendering

**Rationale**:
- Constitution requires test-first development and 80%+ coverage
- Date utility functions are pure - easy to unit test
- React Testing Library for component tests (already in use)
- Mock dates for deterministic tests

**Implementation Approach**:

**Unit Tests (`dateUtils.test.js`)**:
```javascript
describe('isOverdue', () => {
  it('returns false for todos due today', () => {
    const today = new Date('2025-12-12');
    expect(isOverdue('2025-12-12', today)).toBe(false);
  });
  
  it('returns true for todos due yesterday', () => {
    const today = new Date('2025-12-12');
    expect(isOverdue('2025-12-11', today)).toBe(true);
  });
  
  it('returns false for todos without due date', () => {
    expect(isOverdue(null)).toBe(false);
  });
});

describe('getDaysOverdue', () => {
  it('calculates correct days overdue', () => {
    const today = new Date('2025-12-12');
    expect(getDaysOverdue('2025-12-05', today)).toBe(7);
  });
});
```

**Integration Tests (`TodoCard.test.js`)**:
```javascript
describe('TodoCard overdue styling', () => {
  it('displays overdue styling for past due date', () => {
    const todo = { id: '1', title: 'Test', dueDate: '2025-12-01', completed: false };
    render(<TodoCard todo={todo} />);
    expect(screen.getByText(/Overdue/)).toBeInTheDocument();
    expect(screen.getByLabelText('Warning')).toBeInTheDocument();
  });
  
  it('displays due today styling for today\'s date', () => {
    const today = new Date().toISOString().split('T')[0];
    const todo = { id: '1', title: 'Test', dueDate: today, completed: false };
    render(<TodoCard todo={todo} />);
    expect(screen.getByText('Due today')).toBeInTheDocument();
  });
  
  it('removes overdue styling when completed', () => {
    const todo = { id: '1', title: 'Test', dueDate: '2025-12-01', completed: true };
    render(<TodoCard todo={todo} />);
    expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
  });
});
```

---

### 6. Accessibility Considerations

**Question**: How do we ensure WCAG AA compliance for the overdue visual indicators?

**Decision**: Multiple visual cues + ARIA labels + sufficient color contrast

**Rationale**:
- Spec requires WCAG AA compliance and "multi-cue approach"
- Color alone is insufficient for colorblind users
- Icon + color + text label provides redundancy
- ARIA labels make icons screen-reader friendly

**Implementation Approach**:
- **Color Contrast**: Red (#c62828 / #ef5350) and yellow (#ff6b35) meet WCAG AA
- **Icons**: Include `aria-label` for screen readers
- **Text Labels**: Explicit "Overdue X days" / "Due today" text
- **Multiple Cues**: Icon + color + background tint + text = 4 indicators

**Validation**:
- Test with browser dev tools color contrast analyzer
- Verify keyboard navigation still works
- Ensure screen readers announce overdue status

---

## Summary of Decisions

| Area | Decision | Key Benefit |
|------|----------|-------------|
| Date Comparison | Native Date objects, normalized to midnight | No dependencies, simple, meets spec |
| Styling | CSS classes with CSS variables | Supports theming, separation of concerns |
| Icons | Unicode emoji (⚠️) | Zero dependencies, universally supported |
| Labels | Conditional text spans | Simple, accessible, clear |
| Testing | Unit tests for utils, integration for components | Achieves 80%+ coverage, follows TDD |
| Accessibility | Multi-cue design (icon + color + text + background) | WCAG AA compliant, inclusive |

---

## Dependencies Required

**None** - This feature requires no new npm packages. All functionality can be implemented using:
- Native JavaScript Date API
- Existing React and React DOM
- Existing Jest and React Testing Library
- Existing CSS styling approach

---

## Performance Considerations

**Date Calculation Performance**:
- Each date comparison: O(1), ~1ms
- For 100 todos: ~100ms total (acceptable)
- No re-rendering issues if memoized properly

**Optimization Strategy**:
- Calculate overdue status once per render
- Use React.memo on TodoCard to prevent unnecessary re-renders
- No real-time updates needed (per spec)

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Invalid date formats | Defensive checks, return false for invalid dates |
| Timezone issues | Client-side calculation uses user's local time (per spec) |
| Missing due dates | Explicit null checks, treat as not overdue |
| Browser compatibility | Native Date API supported in all modern browsers |
| Test brittleness | Mock current date in tests for determinism |

