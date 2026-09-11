// lib/types/todo.ts

export type TodoPriority = "low" | "medium" | "high";
export type TodoStatus = "pending" | "in_progress" | "completed";
export type TodoCategory = "work" | "personal" | "learning" | "urgent";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  dueDate: string; // ISO 8601 date string (e.g., '2026-09-15')
  userId: string;  // Placeholder for Phase 6 Auth!
  createdAt: string;
  updatedAt: string;
}

// Payload expected when creating a new Todo (POST /api/todos)
export interface CreateTodoInput {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority: TodoPriority;
  category: TodoCategory;
  dueDate: string;
}

// Payload expected when updating an existing Todo (PATCH/PUT /api/todos/[id])
export interface UpdateTodoInput {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  category?: TodoCategory;
  dueDate?: string;
}

// Query parameters supported by GET /api/todos
export interface TodoQueryParams {
  search?: string;
  status?: TodoStatus | "all";
  priority?: TodoPriority | "all";
  category?: TodoCategory | "all";
  sortBy?: "dueDate" | "priority" | "createdAt" | "title";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

// Standardized API Response structure
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}

// Standardized Paginated Response structure
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}