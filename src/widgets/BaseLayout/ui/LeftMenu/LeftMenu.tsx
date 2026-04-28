'use client';

import React from 'react';
import s from './LeftMenu.module.css';
import Link from 'next/link';
import Image from 'next/image';
import HomeIcon from '@/shared/assets/icons/home.svg';
import AddIcon from '@/shared/assets/icons/add.svg';
import VideoIcon from '@/shared/assets/icons/video.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { useRouter } from 'next/navigation';
import { logoutRequest } from '@/app/api/users/logoutRequest';

type LeftMenuProps = {
  userId?: string;
};

export const LeftMenu = ({ userId }: LeftMenuProps) => {
  const router = useRouter();

  const onLogOut = async () => {
    await logoutRequest();
    router.refresh();
  };

  return (
    <aside className={s.leftMenu}>
      <nav className={s.nav}>
        <Link href='/' className={s.link}>
          <Image
            src={HomeIcon}
            alt=''
            unoptimized
            aria-hidden
            width='24'
            height='24'
          />
          Home
        </Link>

        {userId && (
          <>
            <Link href='/editor/addVideo' className={s.link}>
              <Image
                src={AddIcon}
                alt=''
                unoptimized
                aria-hidden
                width='24'
                height='24'
              />
              Add video
            </Link>
            <div className={s.divider} />
            <Link href='/profile/123' className={s.link}>
              <Image
                src={ProfileIcon}
                alt=''
                unoptimized
                aria-hidden
                width='24'
                height='24'
              />
              Profile
            </Link>
            <Link href='/myVideos' className={s.link}>
              <Image
                src={VideoIcon}
                alt=''
                unoptimized
                aria-hidden
                width='24'
                height='24'
              />
              Your videos
            </Link>
            <button onClick={onLogOut} className={s.link}>
              <Image
                src={VideoIcon}
                alt=''
                unoptimized
                aria-hidden
                width='24'
                height='24'
              />
              Sign out
            </button>
          </>
        )}
      </nav>
    </aside>
  );
};
