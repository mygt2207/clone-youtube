import { HomeScreen } from '@/screen/HomeScreen';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

export default async function HomePage() {
  let response: GetAllVideosDto | null = null;
  let finalCategories;
  const cookieStore = await cookies();
  const authToken = cookieStore.get(AUTH_COOKIE_NAME);

  try {
    const dataFromServer = await fetch(
      `${process.env.SERVER_API_URL}/api/videos`,
    );

    response = (await dataFromServer.json()) as GetAllVideosDto;

    const userFromServer = await fetch(
      `${process.env.SERVER_API_URL}/api/users`,
      {
        method: 'GET',
        headers: authToken?.value
          ? { cookie: `${AUTH_COOKIE_NAME}=${authToken.value}` }
          : {},
      },
    );

    const userInfo = await userFromServer.json();

    console.log('logger', 'user token data', userInfo);

    finalCategories = VIDEO_CATEGORIES.filter(({ id }) =>
      response?.categories.includes(id),
    );
  } catch (e) {
    console.log('logger', 'error', e);
    return <div>Something went wrong</div>;
  }

  if (!response) return null;

  return <HomeScreen data={response.data} categories={finalCategories} />;
}
