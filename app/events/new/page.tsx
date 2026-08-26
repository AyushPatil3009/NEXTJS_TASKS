import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEventById } from "@/data/events";
import EventForm from "../../src/components/EventForm";
import Link from "next/link";

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }> | { edit?: string };
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("role")?.value === "admin";

  if (!isAdmin) {
    redirect("/events");
  }

  const resolvedParams = await searchParams;
  const editId = resolvedParams?.edit;

  const initialData = editId ? await getEventById(editId) : null;

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Link 
        href="/events" 
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-6 transition-colors"
      >
        ← Back to all events
      </Link>

      <div className="bg-white dark:bg-slate-950 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
            Admin Panel
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 mt-3">
            {initialData ? "Edit Event" : "Host a New Event"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {initialData
              ? "Update the details below to save changes to this meetup."
              : "Fill out the details below to publish a new meetup to the board."}
          </p>
        </div>

        <EventForm initialData={initialData} />
      </div>
    </main>
  );
}