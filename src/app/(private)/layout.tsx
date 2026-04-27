import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';
import { getUsersData } from '@/app/api/users/getUsersData';

interface PrivateLayoutProps {
  children: React.ReactNode;
}
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const data = await getUsersData();

  return <BaseLayout userId={data?.user?.id}>{children}</BaseLayout>;
}
