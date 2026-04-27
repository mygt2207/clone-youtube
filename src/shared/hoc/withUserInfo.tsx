import React from 'react';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames';
import { getUsersData } from '@/app/api/users/getUsersData';

export const withUserInfo = <T extends object>(Component: React.FC<T>) => {
  // eslint-disable-next-line react/display-name
  return async (props: T) => {
    try {
      const cookieStore = await cookies();
      const authToken = cookieStore.get(AUTH_COOKIE_NAME);

      if (!authToken) {
        throw new Error();
      }

      const dataFromBackend = await getUsersData();

      return <Component user={dataFromBackend.user} {...props} />;
    } catch (error) {
      return <Component {...props} />;
    }
  };
};
