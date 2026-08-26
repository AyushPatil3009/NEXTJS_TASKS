import { getEvents } from "@/data/events";
import SearchBar from "../src/components/Searchbar";
import { cookies } from "next/headers";
import Link from "next/link";

// Static list of popular tags
const POPULAR_TAGS = ["React", "Next.js", "TypeScript", "AI", "Backend", "UI/UX"];

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: "upcoming" | "expired";
  }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const status = resolvedParams.status;

  const events = await getEvents(query);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter((event) => {
    if (!status) return true;

    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    if (status === "expired") {
      return eventDate < today;
    }

    if (status === "upcoming") {
      return eventDate >= today;
    }

    return true;
  });

  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("role")?.value === "admin";

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Upcoming Tech Meetups
          </h1>
          <p className="text-slate-500 dark:text-white text-sm mt-1">
            Discover community events, talks, and workshops.
          </p>
        </div>

        {isAdmin && (
          <Link
            href="/events/new"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm self-start sm:self-auto"
          >
            + Add New Event
          </Link>
        )}
      </div>

      <SearchBar tags={POPULAR_TAGS} />

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 w-3xl">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md bg-white dark:bg-slate-950 transition-all duration-200"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {event.title}
              </h2>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-md">
                {event.location}
              </span>
            </div>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold my-2">
              📅 {event.date}
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {event.description}
            </p>
            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/60">
              <Link
                href={`/events/${event.id}`}
                className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:underline flex items-center gap-1"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
            <p className="text-slate-500">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}