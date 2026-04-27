import type { Metadata } from 'next';
import { MyVideosScreen } from '@/screen/MyVideoScreen';
import { getVideosData } from '@/app/api/videos/getVideosData';

export const metadata: Metadata = {
  title: 'My videos',
};

export default async function MyVideosPage() {
  const userId = '12345';

  try {
    const response = await getVideosData({ userIdParam: userId });

    if (!response.data) {
      throw new Error('Could not find video');
    }

    return <MyVideosScreen data={response.data} />;

  } catch (error) {
    console.log('error', error);
    return <div>Something went wrong</div>;
  }
}
