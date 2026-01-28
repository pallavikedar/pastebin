import { notFound } from 'next/navigation';
import CopyButton from '@/app/Components/CopyButton';
import config from '@/lib/config';


export default async function PastePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${config.BASE_URL}/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) notFound();

  const data = await res.json();

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">
            Paste
          </h1>
          <span className="text-sm text-gray-500">
            ID: {id}
          </span>
        </div>

        {/* Paste Card */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2 rounded-t-xl">
            <span className="text-sm font-medium text-gray-600">
              Plain Text
            </span>

            <CopyButton text={data.content} />
          </div>

          {/* Content */}
          <pre className="p-4 text-sm font-mono text-gray-800 whitespace-pre-wrap break-words leading-relaxed overflow-x-auto">
            {data.content}
          </pre>
        </div>

      </div>
    </main>
  );
}
