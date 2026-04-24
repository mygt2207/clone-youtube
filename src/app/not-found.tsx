import { NotFoundPage } from '@/screen/NotFoundPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
};
export default function NotFound() {
  return <NotFoundPage />;
}
