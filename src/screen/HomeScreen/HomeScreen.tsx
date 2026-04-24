import Link from 'next/link';
import s from './HomeScreen.module.css';

import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import {
  DEFAULT_CATEGORY,
  VIDEO_CATEGORIES,
} from '@/shared/constants/videoCategories';
import { VideosList } from '@/widgets/VideosList';

type HomeScreenProps = {
  data: GetAllVideosDto['data'];
  categories: typeof VIDEO_CATEGORIES;
};

export const HomeScreen = ({ data, categories }: HomeScreenProps) => {
  return (
    <div className={s.container}>
      <div className={s.categoriesContainer}>
        <Link
          className={s.categoryLink}
          href={`/${DEFAULT_CATEGORY.id}`}
          key={DEFAULT_CATEGORY.id}
        >
          {DEFAULT_CATEGORY.title}
        </Link>
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              className={s.categoryLink}
              href={`/${category.id}`}
              key={category.id}
            >
              {category.title}
            </Link>
          ))}
      </div>
      <VideosList data={data} />
    </div>
  );
};
