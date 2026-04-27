import Image from 'next/image';
import s from './NotFoundPage.module.css';
import Link from 'next/link';
import React from 'react';

export const NotFoundPage = () => {
  console.log('logger', 'test deploy');
  return (
    <div className={s.container}>
      <Image
        className={s.image}
        width='184'
        height='176'
        src='/monkey.png'
        alt='Not found page'
      />
      <p>This page is not available. Sorry about that.</p>
      <p>Try searching for something else.</p>
      <Link href='/'>
        <Image width='145' height='30' src='/logo.svg' alt='logo' />
      </Link>
    </div>
  );
};
