/**
 * Date utility functions for todo overdue status calculation
 * All functions use date-only comparison (ignoring time component)
 */

/**
 * Determines if a todo is overdue based on its due date
 * @param {string|null|undefined} dueDate - ISO 8601 date string (e.g., "2025-12-25")
 * @param {Date} currentDate - Current date for comparison (defaults to today)
 * @returns {boolean} True if due date is before current date (excluding today)
 */
export function isOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return false;
  
  // Normalize to midnight for date-only comparison
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  return due < current; // true if due date is before today
}

/**
 * Determines if a todo is due today
 * @param {string|null|undefined} dueDate - ISO 8601 date string (e.g., "2025-12-25")
 * @param {Date} currentDate - Current date for comparison (defaults to today)
 * @returns {boolean} True if due date is today
 */
export function isDueToday(dueDate, currentDate = new Date()) {
  if (!dueDate) return false;
  
  const due = new Date(dueDate);
  const current = new Date(currentDate);
  
  return due.toDateString() === current.toDateString();
}

/**
 * Calculates number of days a todo is overdue
 * @param {string|null|undefined} dueDate - ISO 8601 date string (e.g., "2025-12-25")
 * @param {Date} currentDate - Current date for comparison (defaults to today)
 * @returns {number} Number of days overdue (0 if not overdue or no due date)
 */
export function getDaysOverdue(dueDate, currentDate = new Date()) {
  if (!dueDate) return 0;
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const current = new Date(currentDate);
  current.setHours(0, 0, 0, 0);
  
  const diffMs = current - due;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}
