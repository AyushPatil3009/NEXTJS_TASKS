// app/src/components/todos/TodoCard.tsx
"use client";

import { Todo, TodoStatus } from "@/lib/types/todo";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const PRIORITY_STYLES = {
  high: "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/60",
  medium: "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/60",
  low: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60",
};

const STATUS_LABELS: Record<TodoStatus, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function TodoCard({ todo, onEdit, onDelete }: TodoCardProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  // Quick Status Toggle: Pending -> In Progress -> Completed -> Pending
  const handleToggleStatus = async () => {
    setIsUpdating(true);
    let nextStatus: TodoStatus = "pending";
    if (todo.status === "pending") nextStatus = "in_progress";
    else if (todo.status === "in_progress") nextStatus = "completed";

    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const isCompleted = todo.status === "completed";

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-200 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-md flex flex-col justify-between ${
      isCompleted
        ? "border-slate-200 dark:border-slate-800 opacity-75"
        : "border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700/60"
    }`}>
      <div>
        {/* Header: Priority & Category & Quick Toggle */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${PRIORITY_STYLES[todo.priority]}`}>
              {todo.priority}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
              {todo.category}
            </span>
          </div>

          <button
            onClick={handleToggleStatus}
            disabled={isUpdating}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
              isCompleted
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900"
                : todo.status === "in_progress"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900"
                : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
            }`}
            title="Click to cycle status"
          >
            <span className={`w-2 h-2 rounded-full ${
              isCompleted ? "bg-emerald-500" : todo.status === "in_progress" ? "bg-blue-500" : "bg-slate-400"
            }`} />
            <span>{STATUS_LABELS[todo.status]}</span>
          </button>
        </div>

        {/* Title */}
        <h3 className={`text-lg font-bold text-slate-900 dark:text-slate-50 mb-2 ${
          isCompleted ? "line-through text-slate-400 dark:text-slate-500" : ""
        }`}>
          {todo.title}
        </h3>

        {/* Description */}
        {todo.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            {todo.description}
          </p>
        )}
      </div>

      {/* Footer: Due Date & Action Buttons */}
      <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          <span>📅 Due: </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">{todo.dueDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(todo)}
            className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo)}
            className="px-3 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}