import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import getYouTubeID from 'get-youtube-id';

const schema = z.object({
  videoUrl: z
    .string()
    .trim()
    .min(1, { message: 'Required' })
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    }, 'Invalid URL'),
  videoCategory: z.string(),
});

type Inputs = {
  videoUrl: string;
  videoCategory: string;
};

export const useVideoForm = () => {
  const [videoId, setVideoId] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (data: Inputs) => {
    const videoId = getYouTubeID(data.videoUrl);

    if (!videoId) return;

    setVideoId(videoId);

    await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({
        userId: '12345',
        videoId,
        categoryId: data.videoCategory,
      }),
    });
    reset();
  };

  const onError = (errors: FieldErrors<Inputs>) => {
    console.log('errors', errors);
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmitHandler, onError),
    videoId,
    errors,
  };
};
