'use client';

import { z } from 'zod';
import s from './LoginScreen.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { AuthUserDto } from '@/shared/types/typesFromBackend';

const schema = z.object({
  nickname: z.string().min(3, 'At least 3 characters long'),
  password: z.string().min(3, 'At least 8 characters long'),
});

type Inputs = {
  nickname: string;
  password: string;
};

export const LoginScreen = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: Inputs) => {
    const { nickname, password } = data;

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
          nickname,
          password,
        }),
      });

      // const data = (await rawData.json()) as AuthUserDto;

      if (response.ok) {
        router.replace('/');
      }
    } catch (error) {
      console.log('error', error);
    }
  });

  const hasNicknameInputError = !!errors.nickname?.message;
  const hasPasswordInputError = !!errors.password?.message;

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <label>
          <input {...register('nickname')} type='text' placeholder='Nickname' />
          {hasNicknameInputError && (
            <div className={s.error}>{errors.nickname?.message}</div>
          )}
        </label>
        <label>
          <input
            {...register('password')}
            type='password'
            placeholder='Password'
          />
          {hasPasswordInputError && (
            <div className={s.error}>{errors.password?.message}</div>
          )}
        </label>
        <Link href='/auth/register'>Create account</Link>
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};
