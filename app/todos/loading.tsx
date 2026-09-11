// app/todos/loading.tsx
export default function TodosLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
      <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mb-3" />
      <div className="h-4 w-96 bg-slate-100 dark:bg-slate-800/60 rounded-md mb-8" />

      {/* Skeleton Toolbar */}
      <div className="h-12 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-8" />

      {/* Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-52 bg-slate-100 dark:bg-slate-800/40 rounded-2xl border border-slate-200/60 dark:border-slate-800"
          />
        ))}
      </div>
    </main>
  );
}