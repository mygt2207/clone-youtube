import type { Metadata } from 'next';
import { VideoScreen } from '@/screen/VideoScreen';
import { GetOneVideoDto } from '@/shared/types/typesFromBackend';

type VideoPageProps = {
  params: Promise<{
    videoId: string;
  }>;
};

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const data = await params;
  const videoId = data.videoId;

  try {
    const dataFromServer = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`,
    );
    const response = (await dataFromServer.json()) as GetOneVideoDto;

    if (!response.data) {
      throw new Error('Could not find video');
    }

    return {
      title: response.data
        ? `Video: ${response.data.title}`
        : 'Video Unknown title',
    };
  } catch (error) {
    console.log('error', error);
    return {
      title: 'something went wrong',
    };
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params;
  const videoId = data.videoId;

  let response: GetOneVideoDto;

  try {
    const dataFromServer = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`,
    );
    response = (await dataFromServer.json()) as GetOneVideoDto;
    if (!response.data) {
      throw new Error('Could not find video');
    }
  } catch (error) {
    console.log('error', error);
    return <div>Something went wrong</div>;
  }

  if (!data) return null;

  return <VideoScreen data={response.data} />;
}
