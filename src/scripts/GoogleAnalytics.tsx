import React from 'react';
import Script from 'next/script';

export const sendEvent = (
  {
    action,
    category,
    label,
    value
  }: {
    action: string;
    category: string;
    label: string;
    value: string;
  }
) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

const GoogleAnalytics = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
      />

      <Script id='google-analytics' strategy='lazyOnload'>
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
