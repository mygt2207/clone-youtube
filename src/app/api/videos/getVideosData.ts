import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { OEmbedVideoInfo } from './types';
import { getVideos } from '@/app/api/blobDB';

type GetVideosDataProps = {
  categoryIdParam?: string;
  userIdParam?: string;
};

export const getVideosData = async ({
  categoryIdParam,
  userIdParam,
}: GetVideosDataProps = {}): Promise<GetAllVideosDto> => {
  const dataFromVercel = await getVideos();

  const categories = Array.from(
    new Set([...dataFromVercel].map((data) => data[1].categoryId)),
  );

  const promises = [...dataFromVercel]
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
      const authorUrl = videoInfo.author_url.split('/').at(-1) || '';

      return {
        videoId,
        authorUrl,
        categoryId,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      };
    });

  const result = await Promise.all(promises);

  return {
    ok: true,
    data: result,
    categories,
  };
};
