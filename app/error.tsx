"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-gray-50 p-8 text-center">
      <h2 className="text-xl font-semibold text-gray-900">
        Что-то пошло не так!
      </h2>
      <p className="mt-2 text-sm text-gray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
      >
        Попробовать снова
      </button>
    </div>
  );
}
