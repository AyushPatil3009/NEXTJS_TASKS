import { getEventById } from "@/data/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import DeleteEventButton from "../../src/components/DeleteEventButton";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("role")?.value === "admin";

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/events"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors"
        >
          ← Back to all events
        </Link>

        {isAdmin && (
          <div className="flex items-center gap-3">
            <Link
              href={`/events/new?edit=${event.id}`}
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Edit Event
            </Link>
            <DeleteEventButton eventId={event.id} eventTitle={event.title} />
          </div>
        )}
      </div>

      <article className="bg-white dark:bg-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <header className="mb-8 border-b border-slate-100 dark:border-slate-800/60 pb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
              {event.title}
            </h1>
            <span className="shrink-0 text-sm uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2 rounded-lg">
              {event.location}
            </span>
          </div>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
            📅 {event.date}
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            About this event
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
            {event.description}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
            Topics & Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {event.tags && event.tags.length > 0 ? (
              event.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold shadow-sm"
                >
                  #{tag}
                </span>
              ))
            ) : (
              <span className="text-slate-400 italic">No tags provided.</span>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}