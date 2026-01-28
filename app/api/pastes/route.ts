import { NextRequest, NextResponse } from 'next/server';
import kv from '@/lib/kv';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  const { content, ttl_seconds, max_views } = await req.json();

  if (!content || typeof content !== 'string') {
    return NextResponse.json(
      { error: 'Content is required' },
      { status: 400 }
    );
  }

  const id = nanoid(8);

  const paste = {
    id,
    content,
    expiresAt:
      typeof ttl_seconds === 'number'
        ? Date.now() + ttl_seconds * 1000
        : null,
    maxViews: typeof max_views === 'number' ? max_views : null,
    views: 0,
  };

  await kv.set(`paste:${id}`, paste);

  const origin = req.headers.get('origin');

  return NextResponse.json({
    url: `${origin}/p/${id}`,
  });
}
