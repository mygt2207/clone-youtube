'use server';

import { videos } from '@/app/api/db';

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
  if (videos.has(videoId)) {
    return { ok: false };
  }

  videos.set(videoId, {
    id: videoId,
    userId,
    categoryId,
  });

  return { ok: true };
};
