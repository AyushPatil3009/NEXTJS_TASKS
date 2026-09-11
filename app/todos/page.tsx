// app/todos/page.tsx
import { todoService } from "@/lib/services/todoService";
import { TodoQueryParams } from "@/lib/types/todo";
import TodoList from "@/src/components/todos/TodoList";

export const dynamic = "force-dynamic";

interface TodosPageProps {
  searchParams: Promise<{
    search?: string;
    status?: TodoQueryParams["status"];
    priority?: TodoQueryParams["priority"];
    category?: TodoQueryParams["category"];
    sortBy?: TodoQueryParams["sortBy"];
    sortOrder?: TodoQueryParams["sortOrder"];
    page?: string;
    limit?: string;
  }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const resolvedParams = await searchParams;

  const queryParams: TodoQueryParams = {
    search: resolvedParams.search || undefined,
    status: resolvedParams.status || "all",
    priority: resolvedParams.priority || "all",
    category: resolvedParams.category || "all",
    sortBy: resolvedParams.sortBy || "createdAt",
    sortOrder: resolvedParams.sortOrder || "desc",
    page: resolvedParams.page ? parseInt(resolvedParams.page, 10) : 1,
    limit: resolvedParams.limit ? parseInt(resolvedParams.limit, 10) : 6,
  };

  // Phase 4: Server Component fetches data via the Service Layer
  const data = await todoService.getTodos(queryParams);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
          Phase 4 • Architecture
        </span>
        <h1 className="text-4xl font-black text-slate-900 dark:text-slate-50 mt-3 tracking-tight">
          Task Management System
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Production-grade task workflow with Route Handlers, Caching, Filtering, and Modals.
        </p>
      </div>

      <TodoList initialData={data} />
    </main>
  );
}