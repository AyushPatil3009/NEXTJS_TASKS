// app/src/components/todos/TodoToolbar.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface TodoToolbarProps {
  onOpenCreateModal: () => void;
}

export default function TodoToolbar({ onOpenCreateModal }: TodoToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", searchTerm.trim());
  };

  const currentStatus = searchParams.get("status") || "all";
  const currentPriority = searchParams.get("priority") || "all";
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sortBy") || "createdAt";
  const currentOrder = searchParams.get("sortOrder") || "desc";

  return (
    <div className="space-y-4 mb-8">
      {/* Top Row: Search + New Task Button */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
          >
            Search
          </button>
        </form>

        <button
          onClick={onOpenCreateModal}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <span>+</span>
          <span>New Task</span>
        </button>
      </div>

      {/* Bottom Controls: Status Pills & Dropdowns */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
          {[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "In Progress", value: "in_progress" },
            { label: "Completed", value: "completed" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => updateParam("status", tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentStatus === tab.value
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Priority & Category & Sort Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Priority Filter */}
          <select
            value={currentPriority}
            onChange={(e) => updateParam("priority", e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Category Filter */}
          <select
            value={currentCategory}
            onChange={(e) => updateParam("category", e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="learning">Learning</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* Sort By */}
          <select
            value={`${currentSort}-${currentOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split("-");
              const params = new URLSearchParams(searchParams.toString());
              params.set("sortBy", sortBy);
              params.set("sortOrder", sortOrder);
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Earliest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="title-asc">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}