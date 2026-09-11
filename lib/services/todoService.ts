// lib/services/todoService.ts
import { 
  Todo, 
  CreateTodoInput, 
  UpdateTodoInput, 
  TodoQueryParams, 
  PaginatedResponse 
} from "@/lib/types/todo";

// Replace lines 11-73 in lib/services/todoService.ts with:
const globalStore = globalThis as unknown as { __todos?: Todo[] };
if (!globalStore.__todos) {
  globalStore.__todos = [
    {
      id: "task-1",
      title: "Implement Next.js Route Handlers",
      description: "Build RESTful GET, POST, PATCH, and DELETE endpoints with standard error handling.",
      status: "in_progress",
      priority: "high",
      category: "learning",
      dueDate: "2026-09-12",
      userId: "user-1",
      createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
    id: "task-2",
    title: "Configure Tailwind CSS v4 Dark Mode",
    description: "Ensure custom variants and glassmorphism styling work across all components.",
    status: "completed",
    priority: "medium",
    category: "work",
    dueDate: "2026-09-10",
    userId: "user-1",
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
  },
  {
    id: "task-3",
    title: "Setup Prisma Schema & Migrations",
    description: "Design relational models for Users and Tasks with PostgreSQL in Phase 5.",
    status: "pending",
    priority: "high",
    category: "learning",
    dueDate: "2026-09-18",
    userId: "user-1",
    createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
  {
    id: "task-4",
    title: "Weekly Grocery & Meal Prep",
    description: "Buy fresh vegetables, fruits, and groceries for the week.",
    status: "pending",
    priority: "low",
    category: "personal",
    dueDate: "2026-09-14",
    userId: "user-1",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "task-5",
    title: "Submit Q3 Performance Review",
    description: "Complete self-assessment and submit metrics before the deadline.",
    status: "pending",
    priority: "high",
    category: "urgent",
    dueDate: "2026-09-11",
    userId: "user-1",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: "task-6",
    title: "Refactor Auth Middleware",
    description: "Prepare session validation hooks for NextAuth integration in Phase 6.",
    status: "pending",
    priority: "medium",
    category: "work",
    dueDate: "2026-09-22",
    userId: "user-1",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  }
    // ... rest of your mock tasks ...
  ];
}
// Always reference the global shared store:
let todos = globalStore.__todos;

// In-memory data store for Phase 4 (Will be swapped with Prisma in Phase 5!)
// let todos: Todo[] = [
//   {
//     id: "task-1",
//     title: "Implement Next.js Route Handlers",
//     description: "Build RESTful GET, POST, PATCH, and DELETE endpoints with standard error handling.",
//     status: "in_progress",
//     priority: "high",
//     category: "learning",
//     dueDate: "2026-09-12",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
//   },
//   {
//     id: "task-2",
//     title: "Configure Tailwind CSS v4 Dark Mode",
//     description: "Ensure custom variants and glassmorphism styling work across all components.",
//     status: "completed",
//     priority: "medium",
//     category: "work",
//     dueDate: "2026-09-10",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
//   },
//   {
//     id: "task-3",
//     title: "Setup Prisma Schema & Migrations",
//     description: "Design relational models for Users and Tasks with PostgreSQL in Phase 5.",
//     status: "pending",
//     priority: "high",
//     category: "learning",
//     dueDate: "2026-09-18",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
//   },
//   {
//     id: "task-4",
//     title: "Weekly Grocery & Meal Prep",
//     description: "Buy fresh vegetables, fruits, and groceries for the week.",
//     status: "pending",
//     priority: "low",
//     category: "personal",
//     dueDate: "2026-09-14",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
//   },
//   {
//     id: "task-5",
//     title: "Submit Q3 Performance Review",
//     description: "Complete self-assessment and submit metrics before the deadline.",
//     status: "pending",
//     priority: "high",
//     category: "urgent",
//     dueDate: "2026-09-11",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
//   },
//   {
//     id: "task-6",
//     title: "Refactor Auth Middleware",
//     description: "Prepare session validation hooks for NextAuth integration in Phase 6.",
//     status: "pending",
//     priority: "medium",
//     category: "work",
//     dueDate: "2026-09-22",
//     userId: "user-1",
//     createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
//     updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
//   }
// ];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const PRIORITY_WEIGHTS = { high: 3, medium: 2, low: 1 };

export const todoService = {
  /**
   * Fetches paginated, filtered, and sorted todos
   */
  async getTodos(params: TodoQueryParams = {}): Promise<PaginatedResponse<Todo>> {
    await delay(300); // Simulate network latency

    const {
      search = "",
      status = "all",
      priority = "all",
      category = "all",
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 6,
    } = params;

    let filtered = [...todos];

    // 1. Search Query Filter (Title & Description)
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
      );
    }

    // 2. Status Filter
    if (status !== "all") {
      filtered = filtered.filter(t => t.status === status);
    }

    // 3. Priority Filter
    if (priority !== "all") {
      filtered = filtered.filter(t => t.priority === priority);
    }

    // 4. Category Filter
    if (category !== "all") {
      filtered = filtered.filter(t => t.category === category);
    }

    // 5. Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "priority") {
        comparison = PRIORITY_WEIGHTS[a.priority] - PRIORITY_WEIGHTS[b.priority];
      } else if (sortBy === "dueDate") {
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      } else {
        // Default: createdAt
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    // 6. Pagination Calculations
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (currentPage - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);

    return {
      items: paginatedItems,
      pagination: {
        total,
        page: currentPage,
        limit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  },

  /**
   * Fetches a single todo by ID
   */
  async getTodoById(id: string): Promise<Todo | null> {
    await delay(200);
    const todo = todos.find(t => t.id === id);
    return todo || null;
  },

  /**
   * Creates a new todo
   */
  async createTodo(input: CreateTodoInput, userId: string = "user-1"): Promise<Todo> {
    await delay(300);
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: `task-${Date.now().toString(36)}`,
      title: input.title,
      description: input.description,
      status: input.status || "pending",
      priority: input.priority,
      category: input.category,
      dueDate: input.dueDate,
      userId,
      createdAt: now,
      updatedAt: now,
    };

    todos.unshift(newTodo);
    return newTodo;
  },

  /**
   * Updates an existing todo (partial or full update)
   */
  async updateTodo(id: string, input: UpdateTodoInput): Promise<Todo | null> {
    await delay(300);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;

    const existing = todos[index];
    const updated: Todo = {
      ...existing,
      ...input,
      updatedAt: new Date().toISOString(),
    };

    todos[index] = updated;
    return updated;
  },

  /**
   * Deletes a todo by ID
   */
  async deleteTodo(id: string): Promise<boolean> {
    await delay(300);
    const store = (globalThis as unknown as { __todos?: Todo[] }).__todos || [];
    const index = store.findIndex(t => t.id === id);
    
    if (index === -1) return false;

    // Remove 1 item directly from the shared array
    store.splice(index, 1);
    return true;
  },
};