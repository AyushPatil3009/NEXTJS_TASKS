// app/src/components/todos/TodoList.tsx
"use client";

import { PaginatedResponse, Todo } from "@/lib/types/todo";
import { useState } from "react";
import TodoToolbar from "./TodoToolbar";
import TodoCard from "./TodoCard";
import Pagination from "./Pagination";
import TodoFormModal from "./TodoFormModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface TodoListProps {
  initialData: PaginatedResponse<Todo>;
}

export default function TodoList({ initialData }: TodoListProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);

  const { items, pagination } = initialData;

  return (
    <div>
      <TodoToolbar onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900/60 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4 text-2xl">
            📋
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
            No tasks found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
            Try adjusting your search query, status filters, or create a brand new task.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all"
          >
            + Create First Task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={(t) => setEditingTodo(t)}
              onDelete={(t) => setDeletingTodo(t)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        totalItems={pagination.total}
        limit={pagination.limit}
      />

      {/* Modals */}
      <TodoFormModal
        isOpen={isCreateModalOpen || !!editingTodo}
        todoToEdit={editingTodo}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingTodo(null);
        }}
      />

      <DeleteConfirmModal
        todo={deletingTodo}
        onClose={() => setDeletingTodo(null)}
      />
    </div>
  );
}