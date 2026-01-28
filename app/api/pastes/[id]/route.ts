import kv from '@/lib/kv';
import { nowMs } from '@/lib/time';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // ✅ unwrap params
  const { id } = await params;

  const key = `paste:${id}`;
  const paste = await kv.get<any>(key);

  if (!paste) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const now = nowMs();

  if (paste.expiresAt && now >= paste.expiresAt) {
    await kv.del(key);
    return Response.json({ error: 'Expired' }, { status: 404 });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return Response.json({ error: 'View limit exceeded' }, { status: 404 });
  }

  paste.views += 1;
  await kv.set(key, paste);

  return Response.json({
    content: paste.content,
    views: paste.views,
    remainingViews:
      paste.maxViews === null
        ? null
        : paste.maxViews - paste.views,
  });
}
