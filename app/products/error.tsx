"use client";

export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">
        Something went wrong!
      </h2>

      <button
        onClick={() => reset()}
        className="rounded bg-black px-4 py-2 text-white"
      >
        Try Again
      </button>
    </div>
  );
}