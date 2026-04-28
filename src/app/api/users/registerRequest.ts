'use server';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { env } from '@/shared/libs/env';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';
import { getUsers, saveUsers } from '@/app/api/blobDB';

type RegisterRequestProps = {
  nickname: string;
  password: string;
};

export const registerRequest = async (data: RegisterRequestProps) => {
  const users = await getUsers();

  if (users.has(data.nickname)) {
    return { ok: false, message: 'User already exists' };
  }

  const id = crypto.randomBytes(16).toString('hex');
  const hashedPassword = await bcrypt.hash(data.password, 10);

  users.set(data.nickname, {
    id,
    nickname: data.nickname,
    password: hashedPassword,
  });

  await saveUsers(users);

  const jwt = jsonwebtoken.sign(
    { id, nickname: data.nickname },
    env.JWT_SECRET,
    { expiresIn: '100d' },
  );

  const cookiesStore = await cookies();

  cookiesStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  });

  return { ok: true };
};
