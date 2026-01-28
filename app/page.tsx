'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  async function submit() {
    setError('');

    try {
      const res = await fetch('/api/pastes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: maxViews ? Number(maxViews) : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error');
        return;
      }

      setUrl(data.url);
    } catch {
      setError('Failed to create paste');
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Pastebin Lite
          </h1>
          <p className="text-sm text-gray-500">
            Create secure, temporary text pastes
          </p>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Paste Content
          </label>
          <textarea
            rows={8}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your text here..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              TTL (seconds)
            </label>
            <input
              type="number"
              placeholder="e.g. 3600"
              value={ttl}
              onChange={e => setTtl(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Views
            </label>
            <input
              type="number"
              placeholder="e.g. 5"
              value={maxViews}
              onChange={e => setMaxViews(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={submit}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50"
          disabled={!content.trim()}
        >
          Create Paste
        </button>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Result */}
        {url && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
            <span className="font-medium">Share link:</span>{' '}
            <Link
              href={url}
              target="_blank"
              className="underline break-all"
            >
              {url}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
