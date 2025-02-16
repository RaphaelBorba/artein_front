// src/components/Loader.tsx
"use client";

export default function AuthLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 opacity-30">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="size-16 animate-spin rounded-full border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-white">Authenticating...</p>
      </div>
    </div>
  );
}
