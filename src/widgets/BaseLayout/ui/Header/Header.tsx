import React from 'react';
import Image from 'next/image';
import s from './Header.module.css';
import Link from 'next/link';

type HeaderProps = {
  userId?: string;
};

export const Header = ({ userId }: HeaderProps) => {
  return (
    <header className={s.header}>
      <Link href='/'>
        <Image width='101' height='20' src='/logo.svg' alt='logo' />
      </Link>
      <div className={s.rightPart}>
        {userId ? (
          <>
            <Link href='/editor/addVideo' className={s.createVideoLink}>
              Create
            </Link>
            <Link href={`/profile/${userId}`} className={s.yourProfileLink}>
              <div className={s.hiddenText}>Go to profile</div>
            </Link>
          </>
        ) : (
          <Link href='/auth/login' className={s.createVideoLink}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
};
