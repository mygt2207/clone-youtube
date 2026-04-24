import React from 'react';
import s from './BaseLayout.module.css';
import { Header } from '../Header/Header';
import { LeftMenu } from '../LeftMenu/LeftMenu';

type BaseLayoutProps = {
  children: React.ReactNode;
  userId?: string;
};

export const BaseLayout = ({ children, userId }: BaseLayoutProps) => {
  return (
    <div className={s.container}>
      <Header userId={userId} />
      <LeftMenu userId={userId} />
      {children}
    </div>
  );
};
