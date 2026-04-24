import React from 'react';
import { BaseLayout } from '@/widgets/BaseLayout';
import { withUserInfo } from '@/shared/hoc/withUserInfo';
import { AuthUserDto } from '@/shared/types/typesFromBackend';

const PublicLayout = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: AuthUserDto;
}) => {
  return <BaseLayout userId={user?.id}>{children}</BaseLayout>;
};

export default withUserInfo(PublicLayout);
