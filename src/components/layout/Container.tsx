import React from 'react';
import { useRouter } from 'next/router';

type ContainerProps = {
  children: React.ReactNode;
  isMobile: boolean;
};

const Container = (
  {
    children,
    isMobile
  }: ContainerProps
) => {
  const router = useRouter();
  const isContact = router.pathname === "/contact";

  if (isContact) {
    return (
      <div className={`grow w-full flex flex-col justify-start ${isMobile ? 'pt-6' : ''}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`
        grow p-4 sm:p-6 lg:px-12 md:py-32 mx-4 sm:mx-4 lg:mx-9
        max-w-4xl self-center
        ${isMobile ? 'pt-6' : ''}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
