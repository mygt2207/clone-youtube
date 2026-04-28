import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '@/shared/libs/env';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';
import { getUsers, UserInfoFromToken } from '@/app/api/blobDB';

export async function getUsersData() {
  const cookiesStore = await cookies();

  const token = cookiesStore.get(AUTH_COOKIE_NAME);

  if (!token?.value) {
    return { ok: false, message: 'Token expired' };
  }
  const users = await getUsers();

  const userInfo = jsonwebtoken.verify(
    token.value,
    env.JWT_SECRET,
  ) as UserInfoFromToken;

  const user = users.get(userInfo.nickname);

  if (!user) {
    return { ok: false, message: 'User not found' };
  }

  const { id, nickname } = user;

  return {
    ok: true,
    user: {
      id,
      nickname,
    },
  };
}
