'use client';

import s from './VideoScreen.module.css';
import Link from 'next/link';
import { GetOneVideoDto } from '@/shared/types/typesFromBackend';

type VideoScreenProps = {
  data: NonNullable<GetOneVideoDto['data']>;
};

export const VideoScreen = ({ data }: VideoScreenProps) => {
  return (
    <div className={s.container}>
      <iframe
        className={s.iframe}
        width='560'
        height='315'
        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=0`}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
      />
      <b className={s.videoTitle}>{data.title}</b>
      <div className={s.videoInfoContainer}>
        <Link href={`/profile/${data.authorUrl}`} className={s.channelImage}>
          <div className={s.hiddenText}>{data.authorName}</div>
        </Link>
        <Link className={s.channelNameLink} href={`/profile/${data.authorUrl}`}>
          {data.authorName}
        </Link>
      </div>
    </div>
  );
};
