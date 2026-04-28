'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '@/shared/libs/env';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';
import { getUsers } from '@/app/api/blobDB';

type LoginRequestProps = {
  nickname: string;
  password: string;
};

export const loginRequest = async (data: LoginRequestProps) => {
  const users = await getUsers();

  const user = users.get(data.nickname);

  if (!user) {
    return { ok: false, message: "User doesn't exist" };
  }
  const isPasswordsEqual = await bcrypt.compare(data.password, user.password);

  if (!isPasswordsEqual) {
    return { ok: false, message: 'Invalid nickname or password' };
  }
  const { id, nickname } = user;

  const jwt = jsonwebtoken.sign({ id, nickname }, env.JWT_SECRET, {
    expiresIn: '100d',
  });

  const cookiesStore = await cookies();

  cookiesStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 60 * 60 * 24 * 100,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return {
    ok: true,
    user: {
      id: user.id,
      nickname: user.nickname,
    },
  };
};
