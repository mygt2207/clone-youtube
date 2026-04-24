'use client';

import { z } from 'zod';
import s from './RegisterScreen.module.css';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const schema = z.object({
  nickname: z.string().min(3, 'At least 3 characters long'),
  password: z.string().min(3, 'At least 8 characters long'),
  passwordRepeat: z.string().min(3, 'At least 8 characters long'),
});

type Inputs = {
  nickname: string;
  password: string;
  passwordRepeat: string;
};

export const RegisterScreen = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (data: Inputs) => {
    if (data.password !== data.passwordRepeat) {
      setError('passwordRepeat', {
        type: 'custom',
        message: 'Passwords do not match',
      });
      return;
    }

    const { nickname, password } = data;

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          nickname,
          password,
        }),
      });

      if (response.ok) {
        router.replace('/');
      }
    } catch (error) {
      console.error('error', error);
    }
  });

  const hasNicknameInputError = !!errors.nickname?.message;
  const hasPasswordInputError = !!errors.password?.message;
  const hasPasswordRepeatInputError = !!errors.passwordRepeat?.message;

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
        <label>
          <input
            {...register('passwordRepeat')}
            type='password'
            placeholder='Password'
          />
          {hasPasswordRepeatInputError && (
            <div className={s.error}>{errors.passwordRepeat?.message}</div>
          )}
        </label>
        <Link href='/auth/login'>Log in</Link>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
