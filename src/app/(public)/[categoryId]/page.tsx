import type { Metadata } from 'next';
import { CategoryScreen } from '@/screen/CategoryScreen';
import { VIDEO_CATEGORIES } from '@/shared/constants/videoCategories';
import { notFound } from 'next/navigation';
import { getVideosData } from '@/app/api/videos/getVideosData';

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categoryId } = await params;

  const foundCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!foundCategory)
    return {
      title: 'Category not found',
    };

  return {
    title: foundCategory
      ? `Video in ${foundCategory.title} category`
      : 'Video in unknown category',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  const foundCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!foundCategory) {
    return notFound();
  }

  try {
    const response = await getVideosData({ categoryIdParam: categoryId });

    if (!response.data) {
      throw new Error('Could not find video');
    }

    console.log('logger', 'resp cat', response.categories, categoryId);

    const categoryTitle =
      categoryId === 'all'
        ? 'All videos'
        : VIDEO_CATEGORIES.find((item) => item.id === categoryId)?.title ||
          'Unknown';

    const finalCategories =
      categoryId === 'all'
        ? VIDEO_CATEGORIES
        : VIDEO_CATEGORIES.filter(({ id }) =>
            response?.categories.includes(id),
          );

    return (
      <CategoryScreen
        categories={finalCategories}
        data={response.data}
        categoryId={categoryId}
        categoryTitle={categoryTitle}
      />
    );
  } catch (error) {
    console.log('error', error);
    return <div>Something went wrong</div>;
  }
}
