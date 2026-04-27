import { videos } from '@/app/api/db';

export async function POST(request: Request) {
  const data = await request.json();

  if (videos.has(data.videoId)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  videos.set(data.videoId, {
    id: data.videoId,
    userId: data.userId,
    categoryId: data.videoCategoryId,
  });

  return Response.json({ ok: true });
}
