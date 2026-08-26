// "use client";

// export default function ErrorPage() {
//   return <h2>Something went wrong!</h2>;
// }

"use client";

export default function Error({reset}: {reset: () => void;}) 
{
  return (
    <div>
      <h2>Something went wrong.</h2>

      <button onClick={() => reset()}>
        Try Again
      </button>
    </div>
  );
}