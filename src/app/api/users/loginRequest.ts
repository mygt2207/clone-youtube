'use server';

import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { users } from '../db';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '@/shared/libs/env';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

type LoginRequestProps = {
  nickname: string;
  password: string;
};

export const loginRequest = async (data: LoginRequestProps) => {
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
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  });

  return {
    ok: true,
    user: {
      id: user.id,
      nickname: user.nickname,
    },
  };
};
