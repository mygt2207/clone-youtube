import type { Metadata } from 'next';
import { MyVideosScreen } from '@/screen/MyVideoScreen';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';

export const metadata: Metadata = {
  title: 'My videos',
};

export default async function MyVideosPage() {
  const userId = '12345';
  let response: GetAllVideosDto | null = null;

  try {
    const dataFromServer = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?userId=${userId}`,
    );
    response = (await dataFromServer.json()) as GetAllVideosDto;

    if (!response.data) {
      throw new Error('Could not find video');
    }
  } catch (error) {
    console.log('error', error);
    return <div>Something went wrong</div>;
  }

  return <MyVideosScreen data={response.data} />;
}
