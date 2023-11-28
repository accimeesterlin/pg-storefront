import Script from "next/script";
import { FC, Fragment } from "react";

const GoogleAnalytics: FC = () => {
  const MARKUP = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-FLCDXWTVMD');
  `;

  // TODO: Add Google Tag ID

  return (
    <Fragment>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
        strategy="lazyOnload"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: MARKUP }}
      />
    </Fragment>
  );
};

export default GoogleAnalytics;
