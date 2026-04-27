import { OEmbedVideoInfo } from './types';
import { GetOneVideoDto } from '@/shared/types/typesFromBackend';

type GetOneVideoProps = {
  videoId: string;
};

export const getOneVideo = async ({
  videoId,
}: GetOneVideoProps): Promise<GetOneVideoDto> => {
  const rawResult = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
  );
  const videoInfo = (await rawResult.json()) as OEmbedVideoInfo;

  const authorUrl = videoInfo.author_url.split('/').at(-1) || '';

  const result = {
    videoId,
    authorUrl,
    title: videoInfo.title,
    authorName: videoInfo.author_name,
  };
  return { ok: true, data: result };
};
