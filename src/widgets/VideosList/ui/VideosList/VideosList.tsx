import s from './VideosList.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';

type VideosListProps = {
  data: GetAllVideosDto['data'];
};

export const VideosList = ({ data }: VideosListProps) => {
  if (data.length <= 0) {
    return <div className={s.noVideos}>No video</div>;
  }

  return (
    <div className={s.videoGrid}>
      {data?.map((videoInfo) => (
        <div className={s.videoBlock} key={videoInfo.videoId}>
          <Link href={`/video/${videoInfo.videoId}`} className={s.videoPreview}>
            <Image
              fill
              unoptimized
              src={`https://img.youtube.com/vi/${videoInfo.videoId}/hqdefault.jpg`}
              alt=''
              className={s.videoImg}
            />
          </Link>
          <div className={s.videoInfoContainer}>
            <Link
              href={`/profile/${videoInfo.authorUrl}`}
              className={s.channelImage}
            >
              <div className={s.hiddenText}>{videoInfo.authorName}</div>
            </Link>
            <div className={s.videoInfo}>
              <Link
                href={`/video/${videoInfo.videoId}`}
                className={s.videoTitleLink}
              >
                <b>{videoInfo.title}</b>
              </Link>
              <Link
                className={s.channelNameLink}
                href={`/profile/${videoInfo.authorUrl}`}
              >
                {videoInfo.authorName}
              </Link>
            </div>
          </div>
          <Link href={`/video/${videoInfo.videoId}`} className={s.link} />
        </div>
      ))}
    </div>
  );
};
