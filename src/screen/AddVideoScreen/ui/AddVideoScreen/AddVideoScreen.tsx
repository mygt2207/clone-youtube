'use client';

import s from './AddVideoScreen.module.css';
import { useVideoForm } from '../../lib/useVideoForm';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';

export const AddVideoScreen = () => {
  const { errors, onSubmit, videoId, register } = useVideoForm();

  const hasVideoUrlInputError = !!errors.videoUrl?.message;

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit} className={s.form}>
        <select {...register('videoCategory')} className={s.select}>
          {VIDEO_CATEGORIES.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>

        <label className={s.label}>
          <input
            className={s.input}
            placeholder='Please add link to video'
            {...register('videoUrl')}
          />
          {hasVideoUrlInputError && (
            <div className={s.error}>{errors.videoUrl?.message}</div>
          )}
        </label>
        <button className={s.submitButton}>Upload</button>
      </form>

      {videoId && (
        <iframe
          className={s.iframe}
          width='700'
          height='350'
          src={`https://www.youtube.com/embed/${videoId}?si=xmHLzqsScFDbpuUL`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          referrerPolicy='strict-origin-when-cross-origin'
          allowFullScreen
        />
      )}
    </div>
  );
};
