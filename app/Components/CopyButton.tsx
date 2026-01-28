'use client';

export default function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
    >
      Copy
    </button>
  );
}
