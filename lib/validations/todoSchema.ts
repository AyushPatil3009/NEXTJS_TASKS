// lib/validations/todoSchema.ts
import { CreateTodoInput, UpdateTodoInput, TodoPriority, TodoStatus, TodoCategory } from "@/lib/types/todo";

const VALID_PRIORITIES: TodoPriority[] = ["low", "medium", "high"];
const VALID_STATUSES: TodoStatus[] = ["pending", "in_progress", "completed"];
const VALID_CATEGORIES: TodoCategory[] = ["work", "personal", "learning", "urgent"];

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: string[];
}

/**
 * Validates payload for creating a new Todo (POST /api/todos)
 */
export function validateCreateTodo(body: unknown): ValidationResult<CreateTodoInput> {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { isValid: false, errors: ["Request body must be a valid JSON object."] };
  }

  const payload = body as Record<string, unknown>;

  // 1. Validate Title
  if (!payload.title || typeof payload.title !== "string" || payload.title.trim().length === 0) {
    errors.push("Title is required.");
  } else if (payload.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long.");
  } else if (payload.title.trim().length > 100) {
    errors.push("Title cannot exceed 100 characters.");
  }

  // 2. Validate Priority
  if (!payload.priority || !VALID_PRIORITIES.includes(payload.priority as TodoPriority)) {
    errors.push(`Priority is required and must be one of: ${VALID_PRIORITIES.join(", ")}`);
  }

  // 3. Validate Category
  if (!payload.category || !VALID_CATEGORIES.includes(payload.category as TodoCategory)) {
    errors.push(`Category is required and must be one of: ${VALID_CATEGORIES.join(", ")}`);
  }

  // 4. Validate Due Date
  if (!payload.dueDate || typeof payload.dueDate !== "string") {
    errors.push("Due date is required.");
  } else if (isNaN(Date.parse(payload.dueDate))) {
    errors.push("Due date must be a valid date string (e.g. YYYY-MM-DD).");
  }

  // 5. Optional Status
  let status: TodoStatus = "pending";
  if (payload.status) {
    if (!VALID_STATUSES.includes(payload.status as TodoStatus)) {
      errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
    } else {
      status = payload.status as TodoStatus;
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    data: {
      title: (payload.title as string).trim(),
      description: typeof payload.description === "string" ? payload.description.trim() : undefined,
      priority: payload.priority as TodoPriority,
      category: payload.category as TodoCategory,
      dueDate: payload.dueDate as string,
      status,
    },
    errors: [],
  };
}

/**
 * Validates payload for updating an existing Todo (PATCH/PUT /api/todos/[id])
 */
export function validateUpdateTodo(body: unknown): ValidationResult<UpdateTodoInput> {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { isValid: false, errors: ["Request body must be a valid JSON object."] };
  }

  const payload = body as Record<string, unknown>;
  const data: UpdateTodoInput = {};

  if (payload.title !== undefined) {
    if (typeof payload.title !== "string" || payload.title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long.");
    } else if (payload.title.trim().length > 100) {
      errors.push("Title cannot exceed 100 characters.");
    } else {
      data.title = payload.title.trim();
    }
  }

  if (payload.priority !== undefined) {
    if (!VALID_PRIORITIES.includes(payload.priority as TodoPriority)) {
      errors.push(`Priority must be one of: ${VALID_PRIORITIES.join(", ")}`);
    } else {
      data.priority = payload.priority as TodoPriority;
    }
  }

  if (payload.status !== undefined) {
    if (!VALID_STATUSES.includes(payload.status as TodoStatus)) {
      errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
    } else {
      data.status = payload.status as TodoStatus;
    }
  }

  if (payload.category !== undefined) {
    if (!VALID_CATEGORIES.includes(payload.category as TodoCategory)) {
      errors.push(`Category must be one of: ${VALID_CATEGORIES.join(", ")}`);
    } else {
      data.category = payload.category as TodoCategory;
    }
  }

  if (payload.dueDate !== undefined) {
    if (typeof payload.dueDate !== "string" || isNaN(Date.parse(payload.dueDate))) {
      errors.push("Due date must be a valid date string.");
    } else {
      data.dueDate = payload.dueDate;
    }
  }

  if (payload.description !== undefined) {
    data.description = typeof payload.description === "string" ? payload.description.trim() : undefined;
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true, data, errors: [] };
}