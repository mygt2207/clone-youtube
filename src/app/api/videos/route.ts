import { videos } from '@/app/api/db';

type OEmbedVideoInfo = {
  title: string;
  author: string;
  author_url: string;
  type: string;
  author_name: string;
  height: number;
  width: number;
  version: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_width: number;
  thumbnail_url: string;
  html: string;
};

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const videoIdParam = urlObject.searchParams.get('videoId');
  const userIdParam = urlObject.searchParams.get('userId');

  const categoryIdParam = urlObject.searchParams.get('categoryId');

  if (videoIdParam) {
    try {
      const rawResult = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoIdParam}&format=json`,
      );
      const videoInfo = (await rawResult.json()) as OEmbedVideoInfo;

      const authorUrl = videoInfo.author_url.split('/').at(-1);

      const result = {
        videoId: videoIdParam,
        authorUrl,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      };
      return Response.json({ ok: true, data: result });
    } catch (error) {
      console.error('error', error);
      return Response.json({ ok: false, data: null }, { status: 500 });
    }
  }

  try {
    const categories = Array.from(
      new Set([...videos].map((data) => data[1].categoryId)),
    );

    const promises = [...videos]
      .filter(
        (data) =>
          !categoryIdParam ||
          categoryIdParam === 'all' ||
          data[1].categoryId === categoryIdParam,
      )
      .filter((data) => (userIdParam ? data[1].userId === userIdParam : true))
      .map(async (videoData) => {
        const videoId = videoData[1].id;
        const categoryId = videoData[1].categoryId;

        const rawResult = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );

        const videoInfo = (await rawResult.json()) as OEmbedVideoInfo;
        const authorUrl = videoInfo.author_url.split('/').at(-1);

        return {
          videoId,
          authorUrl,
          categoryId,
          title: videoInfo.title,
          authorName: videoInfo.author_name,
        };
      });

    const result = await Promise.all(promises);

    return Response.json({
      ok: true,
      data: result,
      categories,
    });
  } catch (error) {
    console.error('error', error);
    return Response.json({ ok: false, data: null }, { status: 500 });
  }
}

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
