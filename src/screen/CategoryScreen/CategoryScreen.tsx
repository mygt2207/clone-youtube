'use client';

import s from '@/screen/HomeScreen/HomeScreen.module.css';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { GetAllVideosDto } from '@/shared/types/typesFromBackend';
import {
  DEFAULT_CATEGORY,
  VIDEO_CATEGORIES,
} from '@/shared/constants/videoCategories';
import { VideosList } from '@/widgets/VideosList';

type CategoryScreenProps = {
  data: GetAllVideosDto['data'];
  categoryTitle: string;
  categoryId: string;
  categories?: typeof VIDEO_CATEGORIES;
};

export const CategoryScreen = ({
  data,
  categories,
  categoryTitle,
  categoryId,
}: CategoryScreenProps) => {
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
        {categories &&
          categories?.length > 0 &&
          categories?.map((category) => (
            <Link
              className={cn(s.categoryLink, {
                [s.activeCategoryLink]: category.id === categoryId,
              })}
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
