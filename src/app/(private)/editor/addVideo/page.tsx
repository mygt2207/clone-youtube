import type { Metadata } from 'next';
import { AddVideoScreen } from '@/screen/AddVideoScreen/ui/AddVideoScreen';

export const metadata: Metadata = {
  title: 'Add video.',
};

export default function AddVideo() {
  return <AddVideoScreen />;
}
