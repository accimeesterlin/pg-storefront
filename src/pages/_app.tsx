import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { AppProps } from "next/app";
import NProgress from "nprogress";
// import { Auth } from "aws-amplify";
import { ThemeProvider } from "styled-components";
import GoogleAnalytics from "@component/GoogleAnalytics";
import { AppProvider, useAppContext } from "@context/AppContext";
// import { GlobalStyles } from "@utils/globalStyles";
// import { theme } from "@utils/theme";
import { ToastContainer } from "react-toastify";
import theme from "../theme";
import GlobalStyles from "theme/globalStyles";

import "react-toastify/dist/ReactToastify.css";
import { storePathValues } from "@utils/utils";
import { capitalize } from "lodash";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";
const awsconfig = {
  aws_project_region: region,
  Auth: {
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    region,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
  },
  API: {
    graphql_endpoint: process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    graphql_headers: async () => ({}),
  },
};

console.log("awsconfig", awsconfig);

// Auth.configure(awsconfig);

// ============================================================
interface MyAppProps extends AppProps {
  Component: NextPage & { layout?: () => JSX.Element };
}
// ============================================================

const App = ({ Component, pageProps }: MyAppProps) => {
  const router = useRouter();
  const [domainName, setDomainName] = useState("");
  const { state } = useAppContext();
  let Layout = Component.layout || Fragment;
  const lastVisitedUrl = router?.asPath || "/profile";

  const shop = state.shop;
  const shopName = capitalize(shop?.name);
  const description = shop?.description;
  const logo = shop?.profilePicture;

  useEffect(() => {
    const domain = window.location.hostname;
    setDomainName(`https://${domain}`);
  }, []);

  useEffect(storePathValues, [lastVisitedUrl]);

  return (
    <Fragment>
      <Head>
        <title>{shopName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        {/* Facebook Meta Tags */}
        <meta property="og:title" content={shopName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content={domainName} />
        <meta property="og:type" content="website" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shopName} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={logo} />
        {/* Google Meta Tags */}
        <meta name="description" content={description} />
        {/* <meta name="keywords" content="Your, Keywords, Here" /> */}

        {/* YouTube Meta Tags */}
        <meta property="og:title" content={shopName} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={logo} />
        <meta property="og:url" content={domainName} />
        <meta property="og:video" content={domainName} />
        <meta property="og:video:secure_url" content={domainName} />
        <meta property="og:video:type" content="video/mp4" />

        {/* Instagram Meta Tags */}
        <meta property="og:image" content={logo} />

        <link rel="shortcut icon" href={logo} type="image/x-icon" />
        <link rel="icon" href={logo} type="image/x-icon" />

        {/* Google analytics */}
        <GoogleAnalytics />
      </Head>

      <AppProvider>
        <ThemeProvider theme={theme()}>
          <GlobalStyles />

          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </AppProvider>
    </Fragment>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App;
