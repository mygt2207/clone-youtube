import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';
import { getAuthUser } from '@/shared/libs';

interface PublicLayoutProps {
  children: React.ReactNode;
}
export default async function PublicLayout({ children }: PublicLayoutProps) {
  const user = await getAuthUser();

  return <BaseLayout userId={user?.id}>{children}</BaseLayout>;
}
