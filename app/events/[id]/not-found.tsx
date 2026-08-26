import Link from "next/link";

export default function EventNotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-full mb-6">
        {/* A simple magnifying glass SVG icon */}
        <svg className="w-12 h-12 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
        Event Not Found
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg max-w-md">
        Whoops! We couldn't find the tech meetup you are looking for. It might have been deleted, or the link is broken.
      </p>
      
      <Link
        href="/events"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
      >
        Return to all events
      </Link>
    </main>
  );
}