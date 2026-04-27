import { HomeScreen } from '@/screen/HomeScreen';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';
import { getVideosData } from '@/app/api/videos/getVideosData';

export default async function HomePage() {
  let data;
  let finalCategories;

  try {
    const response = await getVideosData();
    data = response.data;

    finalCategories = VIDEO_CATEGORIES.filter(({ id }) =>
      response?.categories.includes(id),
    );
  } catch (e) {
    console.log('logger', 'error', e);
    return <div>Something went wrong</div>;
  }

  if (!data) return null;

  return <HomeScreen data={data} categories={finalCategories} />;
}
