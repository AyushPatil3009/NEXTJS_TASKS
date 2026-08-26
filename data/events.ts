export type Event = {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  tags: string[];
};

// In-memory array acting as our "database"
let events: Event[] = [
  {
    id: "1",
    title: "Next.js App Router Masterclass",
    date: "2026-10-15",
    description: "Deep dive into Server Components, Server Actions, and modern React features.",
    location: "Online",
    tags: ["next.js", "css"]
  },
  {
    id: "2",
    title: "React Developers Meetup",
    date: "2026-11-02",
    description: "Local meetup discussing the latest changes in React 19 and beyond.",
    location: "Mumbai, India",
    tags: ["react", "css", "html"]
  },
  {
    id: "3",
    title: "UI/UX for Developers",
    date: "2026-12-10",
    description: "Learn how to use Tailwind CSS to rapidly prototype and build production UIs.",
    location: "San Francisco, CA",
    tags: ["UI", "UX"]
  }
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getEvents(query?: string): Promise<Event[]> {
  await delay(800);

  if (!query) return events;

  const lowerQuery = query.toLowerCase();
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(lowerQuery) ||
      e.description.toLowerCase().includes(lowerQuery) ||
      e.location.toLowerCase().includes(lowerQuery)
  );
}

// Convert both IDs to strings so numeric vs string comparison does not fail
export async function getEventById(id: string | number): Promise<Event | undefined> {
  await delay(500);
  return events.find((event) => String(event.id) === String(id));
}

// Delete event by ID
export async function deleteEvent(id: string | number) {
  events = events.filter((e) => String(e.id) !== String(id));
  return true;
}

// Save handles both CREATE and UPDATE seamlessly
export async function saveEvent(eventData: Partial<Event> & { id?: string | number }) {
  await delay(1000);

  if (eventData.id) {
    const index = events.findIndex((e) => String(e.id) === String(eventData.id));
    if (index !== -1) {
      events[index] = {
        ...events[index],
        ...eventData,
        id: String(eventData.id),
      };
      return events[index];
    }
  }

  const newEvent: Event = {
    id: Date.now().toString(),
    title: eventData.title || "",
    date: eventData.date || "",
    description: eventData.description || "",
    location: eventData.location || "",
    tags: eventData.tags || [],
  };

  events.unshift(newEvent);
  return newEvent;
}