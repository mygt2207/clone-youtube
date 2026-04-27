import type { Metadata } from 'next';
import { VideoScreen } from '@/screen/VideoScreen';
import { getOneVideo } from '@/app/api/videos/getOneVideo';

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
    const response = await getOneVideo({ videoId });

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

  try {
    const response = await getOneVideo({ videoId });

    if (!response.data) {
      throw new Error('Could not find video');
    }

    return <VideoScreen data={response.data} />;
  } catch (error) {
    console.log('error', error);
    return <div>Something went wrong</div>;
  }
}
