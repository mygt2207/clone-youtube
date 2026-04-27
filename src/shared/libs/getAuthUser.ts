// src/shared/lib/getAuthUser.ts
import { cookies } from 'next/headers';
import { AuthUserDto } from '@/shared/types/typesFromBackend';
// import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

const AUTH_COOKIE_NAME = 'x-auth-token';

export async function getAuthUser(): Promise<AuthUserDto | null> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(AUTH_COOKIE_NAME);

    if (!authToken) return null;

    const response = await fetch(`${process.env.SERVER_API_URL}/api/users`, {
      method: 'GET',
      headers: {
        cookie: `${AUTH_COOKIE_NAME}=${authToken.value}`,
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.user;
  } catch (error) {
    return null;
  }
}
