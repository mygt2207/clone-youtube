import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';
import { getAuthUser } from '@/shared/libs';

interface PrivateLayoutProps {
  children: React.ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getAuthUser();

  return <BaseLayout userId={user?.id}>{children}</BaseLayout>;
}
