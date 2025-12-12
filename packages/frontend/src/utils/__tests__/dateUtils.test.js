import { isOverdue, isDueToday, getDaysOverdue } from '../dateUtils';

describe('dateUtils', () => {
  describe('isOverdue', () => {
    test('should return true for past date', () => {
      const pastDate = '2025-11-01';
      const currentDate = new Date('2025-12-12');
      expect(isOverdue(pastDate, currentDate)).toBe(true);
    });

    test('should return false for today\'s date', () => {
      const today = '2025-12-12';
      const currentDate = new Date('2025-12-12');
      expect(isOverdue(today, currentDate)).toBe(false);
    });

    test('should return false for future date', () => {
      const futureDate = '2025-12-25';
      const currentDate = new Date('2025-12-12');
      expect(isOverdue(futureDate, currentDate)).toBe(false);
    });

    test('should return false for null date', () => {
      const currentDate = new Date('2025-12-12');
      expect(isOverdue(null, currentDate)).toBe(false);
    });

    test('should return false for undefined date', () => {
      const currentDate = new Date('2025-12-12');
      expect(isOverdue(undefined, currentDate)).toBe(false);
    });

    test('should use current date when currentDate not provided', () => {
      const pastDate = '2020-01-01';
      expect(isOverdue(pastDate)).toBe(true);
    });
  });

  describe('isDueToday', () => {
    test('should return true for today\'s date', () => {
      const today = '2025-12-12';
      const currentDate = new Date('2025-12-12');
      expect(isDueToday(today, currentDate)).toBe(true);
    });

    test('should return false for yesterday\'s date', () => {
      const yesterday = '2025-12-11';
      const currentDate = new Date('2025-12-12');
      expect(isDueToday(yesterday, currentDate)).toBe(false);
    });

    test('should return false for tomorrow\'s date', () => {
      const tomorrow = '2025-12-13';
      const currentDate = new Date('2025-12-12');
      expect(isDueToday(tomorrow, currentDate)).toBe(false);
    });

    test('should return false for null date', () => {
      const currentDate = new Date('2025-12-12');
      expect(isDueToday(null, currentDate)).toBe(false);
    });

    test('should return false for undefined date', () => {
      const currentDate = new Date('2025-12-12');
      expect(isDueToday(undefined, currentDate)).toBe(false);
    });
  });

  describe('getDaysOverdue', () => {
    test('should return 1 for yesterday', () => {
      const yesterday = '2025-12-11';
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(yesterday, currentDate)).toBe(1);
    });

    test('should return 7 for one week ago', () => {
      const weekAgo = '2025-12-05';
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(weekAgo, currentDate)).toBe(7);
    });

    test('should return 0 for today', () => {
      const today = '2025-12-12';
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(today, currentDate)).toBe(0);
    });

    test('should return 0 for future date', () => {
      const futureDate = '2025-12-25';
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(futureDate, currentDate)).toBe(0);
    });

    test('should return 0 for null date', () => {
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(null, currentDate)).toBe(0);
    });

    test('should return 0 for undefined date', () => {
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(undefined, currentDate)).toBe(0);
    });

    test('should return 30 for one month ago', () => {
      const monthAgo = '2025-11-12';
      const currentDate = new Date('2025-12-12');
      expect(getDaysOverdue(monthAgo, currentDate)).toBe(30);
    });
  });
});
