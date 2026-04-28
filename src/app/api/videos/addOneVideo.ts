'use server';

import { getVideos, saveVideos } from '@/app/api/blobDB';

type AddOneVideoProps = {
  videoId: string;
  userId: string;
  categoryId: string;
};

export const addOneVideo = async ({
  videoId,
  userId,
  categoryId,
}: AddOneVideoProps) => {
  const dataFromVercel = await getVideos();

  if (dataFromVercel.has(videoId)) {
    return { ok: false };
  }
  dataFromVercel.set(videoId, {
    id: videoId,
    userId,
    categoryId,
  });

  await saveVideos(dataFromVercel);

  return { ok: true };
};
