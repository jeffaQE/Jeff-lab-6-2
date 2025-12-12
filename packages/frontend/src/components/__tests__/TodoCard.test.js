import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from '../TodoCard';

describe('TodoCard Component', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    dueDate: '2025-12-25',
    completed: 0,
    createdAt: '2025-11-01T00:00:00Z'
  };

  const mockHandlers = {
    onToggle: jest.fn(),
    onEdit: jest.fn(),
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render todo title and due date', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText(/December 25, 2025/)).toBeInTheDocument();
  });

  it('should render unchecked checkbox when todo is incomplete', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should render checked checkbox when todo is complete', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should show edit button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    expect(editButton).toBeInTheDocument();
  });

  it('should show delete button', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onDelete when delete button is clicked and confirmed', () => {
    window.confirm = jest.fn(() => true);
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const deleteButton = screen.getByLabelText(/Delete/);
    fireEvent.click(deleteButton);
    
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should enter edit mode when edit button is clicked', () => {
    render(<TodoCard todo={mockTodo} {...mockHandlers} isLoading={false} />);
    
    const editButton = screen.getByLabelText(/Edit/);
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Test Todo')).toBeInTheDocument();
  });

  it('should apply completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: 1 };
    const { container } = render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
    
    const card = container.querySelector('.todo-card');
    expect(card).toHaveClass('completed');
  });

  it('should not render due date when dueDate is null', () => {
    const todoNoDate = { ...mockTodo, dueDate: null };
    render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
    
    expect(screen.queryByText(/Due:/)).not.toBeInTheDocument();
  });

  // User Story 1: Visual Identification of Overdue Todos
  describe('Overdue Visual Indicators (US1)', () => {
    it('should render with overdue class for past due date', () => {
      const overdueTodo = { ...mockTodo, dueDate: '2025-11-01', completed: 0 };
      const { container } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).toHaveClass('todo-card--overdue');
    });

    it('should render warning icon for overdue todo', () => {
      const overdueTodo = { ...mockTodo, dueDate: '2025-11-01', completed: 0 };
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('should NOT render overdue styling for completed overdue todo', () => {
      const completedOverdueTodo = { ...mockTodo, dueDate: '2025-11-01', completed: 1 };
      const { container } = render(<TodoCard todo={completedOverdueTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('todo-card--overdue');
      expect(screen.queryByText('⚠️')).not.toBeInTheDocument();
    });

    it('should NOT render overdue styling for todo without due date', () => {
      const todoNoDate = { ...mockTodo, dueDate: null, completed: 0 };
      const { container } = render(<TodoCard todo={todoNoDate} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('todo-card--overdue');
      expect(screen.queryByText('⚠️')).not.toBeInTheDocument();
    });

    it('should NOT render overdue styling for todo due today', () => {
      const todayDate = new Date().toISOString().split('T')[0];
      const todayTodo = { ...mockTodo, dueDate: todayDate, completed: 0 };
      const { container } = render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('todo-card--overdue');
    });

    it('should NOT render overdue styling for future due date', () => {
      const futureTodo = { ...mockTodo, dueDate: '2026-12-25', completed: 0 };
      const { container } = render(<TodoCard todo={futureTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('todo-card--overdue');
      expect(screen.queryByText('⚠️')).not.toBeInTheDocument();
    });
  });

  // User Story 2: Overdue Status Persists Across Sessions
  describe('Dynamic Overdue Calculation (US2)', () => {
    it('should recalculate overdue status on re-render', () => {
      const overdueTodo = { ...mockTodo, dueDate: '2025-11-01', completed: 0 };
      const { container, rerender } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Initially overdue
      let card = container.querySelector('.todo-card');
      expect(card).toHaveClass('todo-card--overdue');
      
      // Re-render with same todo - should still be overdue
      rerender(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      card = container.querySelector('.todo-card');
      expect(card).toHaveClass('todo-card--overdue');
    });

    it('should remove overdue styling when todo is marked complete', () => {
      const overdueTodo = { ...mockTodo, dueDate: '2025-11-01', completed: 0 };
      const { container, rerender } = render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      // Initially overdue
      let card = container.querySelector('.todo-card');
      expect(card).toHaveClass('todo-card--overdue');
      expect(screen.getByText('⚠️')).toBeInTheDocument();
      
      // Mark as completed
      const completedTodo = { ...overdueTodo, completed: 1 };
      rerender(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
      
      // Overdue styling removed
      card = container.querySelector('.todo-card');
      expect(card).not.toHaveClass('todo-card--overdue');
      expect(screen.queryByText('⚠️')).not.toBeInTheDocument();
    });
  });
  
  // User Story 3: Clear Visual Feedback for Multiple Overdue States
  describe('Enhanced Overdue States (US3)', () => {
    it('should show "Overdue 1 day" label for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const overdueTodo = { ...mockTodo, dueDate: yesterdayStr, completed: 0 };
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/Overdue 1 day/)).toBeInTheDocument();
    });

    it('should show "Overdue 7 days" label for one week ago', () => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekAgoStr = weekAgo.toISOString().split('T')[0];
      
      const overdueTodo = { ...mockTodo, dueDate: weekAgoStr, completed: 0 };
      render(<TodoCard todo={overdueTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/Overdue 7 days/)).toBeInTheDocument();
    });

    it('should show "Due today" label for today', () => {
      const today = new Date().toISOString().split('T')[0];
      const todayTodo = { ...mockTodo, dueDate: today, completed: 0 };
      
      render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText(/Due today/)).toBeInTheDocument();
    });

    it('should apply due-today class for todo due today', () => {
      const today = new Date().toISOString().split('T')[0];
      const todayTodo = { ...mockTodo, dueDate: today, completed: 0 };
      const { container } = render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      const card = container.querySelector('.todo-card');
      expect(card).toHaveClass('todo-card--due-today');
    });

    it('should show warning icon for due today todo', () => {
      const today = new Date().toISOString().split('T')[0];
      const todayTodo = { ...mockTodo, dueDate: today, completed: 0 };
      
      render(<TodoCard todo={todayTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.getByText('⚠️')).toBeInTheDocument();
    });

    it('should NOT show labels for completed todos', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      const completedTodo = { ...mockTodo, dueDate: yesterdayStr, completed: 1 };
      render(<TodoCard todo={completedTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Due today/)).not.toBeInTheDocument();
    });

    it('should NOT show labels for future todos', () => {
      const futureTodo = { ...mockTodo, dueDate: '2026-12-25', completed: 0 };
      render(<TodoCard todo={futureTodo} {...mockHandlers} isLoading={false} />);
      
      expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Due today/)).not.toBeInTheDocument();
    });
  });
});

