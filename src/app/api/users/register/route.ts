import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { users } from '../../db';
import jsonwebtoken from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { env } from '@/shared/libs';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';

export async function POST(request: Request) {
  const data = await request.json();

  if (users.has(data.nickname)) {
    return Response.json(
      { ok: false, message: 'User already exists' },
      { status: 400 },
    );
  }

  const id = crypto.randomBytes(16).toString('hex');
  const hashedPassword = await bcrypt.hash(data.password, 10);

  users.set(data.nickname, {
    id,
    nickname: data.nickname,
    password: hashedPassword,
  });

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

  return Response.json({ ok: true });
}
