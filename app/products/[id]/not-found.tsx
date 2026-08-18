import { notFound } from "next/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Product Not Found
      </h1>

      <p className="mt-2 text-gray-500">
        The product you are looking for does not exist.
      </p>
    </div>
  );
}