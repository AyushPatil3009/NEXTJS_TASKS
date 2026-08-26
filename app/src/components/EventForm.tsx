"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createEventAction } from "../../actions/eventActions";

// Define the interface for event data
interface EventData {
  id?: string | number;
  title?: string;
  date?: string;
  location?: string;
  description?: string;
  tags?: string[];
}

interface EventFormProps {
  initialData?: EventData | null;
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-900/60 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
    >
      {pending ? (
        <span>{isEditing ? "Updating Event..." : "Publishing Event..."}</span>
      ) : (
        <span>{isEditing ? "Update Event" : "Publish Event"}</span>
      )}
    </button>
  );
}

// Accept initialData in the component arguments
export default function EventForm({ initialData }: EventFormProps) {
  const [state, formAction] = useActionState(createEventAction, null);
  const isEditing = Boolean(initialData?.id);

  return (
    <form action={formAction} className="space-y-6">
      {/* Hidden input to pass ID when updating */}
      {initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      {/* Error Alert Box */}
      {state?.error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm">
          {state.error}
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Event Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialData?.title || ""}
          placeholder="e.g. Next.js 16 App Router Masterclass"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
        />
      </div>

      {/* Date and Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialData?.date || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={initialData?.location || ""}
            placeholder="e.g. Online or Mumbai, India"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* Tags Field */}
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Tags (Comma separated)
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            defaultValue={initialData?.tags ? initialData.tags.join(", ") : ""}
            placeholder="e.g. React, Next.js, Workshop"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Event Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={initialData?.description || ""}
          placeholder="Describe what attendees will learn, speakers, agenda, etc."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <SubmitButton isEditing={isEditing} />
      </div>
    </form>
  );
}