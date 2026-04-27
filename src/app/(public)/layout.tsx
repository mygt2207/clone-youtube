import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';
import { getUsersData } from '@/app/api/users/getUsersData';

interface PublicLayoutProps {
  children: React.ReactNode;
}
export default async function PublicLayout({ children }: PublicLayoutProps) {
  const data = await getUsersData();

  return <BaseLayout userId={data?.user?.id}>{children}</BaseLayout>;
}
