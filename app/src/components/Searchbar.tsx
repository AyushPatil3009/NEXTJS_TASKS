"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface SearchBarProps {
  tags: string[];
}

export default function SearchBar({ tags }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("q") || "");

  function handleSearch(searchTerm = term) {
    const params = new URLSearchParams(searchParams.toString());
    const trimmedTerm = searchTerm.trim();

    if (trimmedTerm) {
      params.set("q", trimmedTerm);
    } else {
      params.delete("q");
    }

    router.push(`/events?${params.toString()}`);
  }

  function handleTagClick(tag: string) {
    setTerm(tag);
    handleSearch(tag);
  }

  function handleStatusFilter(status: "upcoming" | "expired") {
    const params = new URLSearchParams(searchParams.toString());

    if (searchParams.get("status") === status) {
      params.delete("status");
    } else {
      params.set("status", status);
    }

    router.push(`/events?${params.toString()}`);
  }

  const currentStatus = searchParams.get("status");

  return (
    <div className="mb-8 w-full">
      {/* Search Input */}
      <div className="flex gap-2 w-full">
        <input
          type="text"
          placeholder="Search events (e.g. React, Online)..."
          className="flex-grow p-3 border border-slate-200 rounded-lg bg-white text-slate-900 placeholder-slate-400 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          type="button"
          onClick={() => handleSearch()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* Status Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
          Filter:
        </p>

        <button
          type="button"
          onClick={() => handleStatusFilter("upcoming")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
            currentStatus === "upcoming"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-900"
          }`}
        >
          Upcoming
        </button>

        <button
          type="button"
          onClick={() => handleStatusFilter("expired")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
            currentStatus === "expired"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-900"
          }`}
        >
          Expired
        </button>
      </div>

      {/* Tag Filters */}
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Popular Tags
        </p>
        <div className="flex flex-wrap gap-2 max-w-full">
          {tags.map((tag) => {
            const isActive =
              searchParams.get("q")?.toLowerCase() === tag.toLowerCase();

            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-400 dark:border-indigo-900"
                }`}
              >
                #{tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}