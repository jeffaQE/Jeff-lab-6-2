import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  const mockTodos = [
    {
      id: 1,
      title: 'Todo 1',
      dueDate: '2025-12-25',
      completed: 0,
      createdAt: '2025-11-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Todo 2',
      dueDate: null,
      completed: 1,
      createdAt: '2025-11-02T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render empty state when todos array is empty', () => {
    render(<TodoList todos={[]} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText(/No todos yet. Add one to get started!/)).toBeInTheDocument();
  });

  it('should render all todos when provided', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('should render correct number of todo cards', () => {
    const { container } = render(
      <TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />
    );
    
    const cards = container.querySelectorAll('.todo-card');
    expect(cards).toHaveLength(2);
  });

  it('should pass handlers to TodoCard components', () => {
    render(<TodoList todos={mockTodos} {...mockHandlers} isLoading={false} />);
    
    // Verify that edit buttons exist for each todo
    expect(screen.getAllByLabelText(/Edit/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Delete/)).toHaveLength(2);
  });

  // Integration tests for overdue functionality
  describe('Overdue Todos Integration', () => {
    it('should render mix of normal, due-today, and overdue todos correctly', () => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const mixedTodos = [
        { id: 1, title: 'Normal Todo', dueDate: '2026-12-25', completed: 0, createdAt: '2025-11-01T00:00:00Z' },
        { id: 2, title: 'Due Today', dueDate: today, completed: 0, createdAt: '2025-11-02T00:00:00Z' },
        { id: 3, title: 'Overdue Todo', dueDate: yesterdayStr, completed: 0, createdAt: '2025-11-03T00:00:00Z' }
      ];

      const { container } = render(<TodoList todos={mixedTodos} {...mockHandlers} isLoading={false} />);

      // Check all todos are rendered
      expect(screen.getByText('Normal Todo')).toBeInTheDocument();
      expect(screen.getByText('Due Today')).toBeInTheDocument();
      expect(screen.getByText('Overdue Todo')).toBeInTheDocument();

      // Check overdue styling
      const cards = container.querySelectorAll('.todo-card');
      expect(cards).toHaveLength(3);
      
      const overdueCard = Array.from(cards).find(card => 
        card.textContent.includes('Overdue Todo')
      );
      expect(overdueCard).toHaveClass('todo-card--overdue');

      const dueTodayCard = Array.from(cards).find(card => 
        card.textContent.includes('Due Today')
      );
      expect(dueTodayCard).toHaveClass('todo-card--due-today');
    });

    it('should display multiple overdue todos with different durations correctly', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const overdueTodos = [
        { id: 1, title: 'Overdue 1 Day', dueDate: yesterday.toISOString().split('T')[0], completed: 0, createdAt: '2025-11-01T00:00:00Z' },
        { id: 2, title: 'Overdue 7 Days', dueDate: weekAgo.toISOString().split('T')[0], completed: 0, createdAt: '2025-11-02T00:00:00Z' }
      ];

      render(<TodoList todos={overdueTodos} {...mockHandlers} isLoading={false} />);

      expect(screen.getByText(/Overdue 1 day/)).toBeInTheDocument();
      expect(screen.getByText(/Overdue 7 days/)).toBeInTheDocument();
    });
  });
});
