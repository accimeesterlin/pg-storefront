import { Fragment, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";
import Router, { useRouter } from "next/router";
import { AppProps } from "next/app";
import NProgress from "nprogress";
import { Auth } from "aws-amplify";
import { ThemeProvider } from "styled-components";
import GoogleAnalytics from "@component/GoogleAnalytics";
import { AppProvider } from "@context/AppContext";
// import { GlobalStyles } from "@utils/globalStyles";
// import { theme } from "@utils/theme";
import { ToastContainer } from "react-toastify";
import theme from "../theme";
import GlobalStyles from "theme/globalStyles";

import "react-toastify/dist/ReactToastify.css";
import { storePathValues } from "@utils/utils";
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

Auth.configure(awsconfig);

// ============================================================
interface MyAppProps extends AppProps {
  Component: NextPage & { layout?: () => JSX.Element };
}
// ============================================================

const App = ({ Component, pageProps }: MyAppProps) => {
  const router = useRouter();
  let Layout = Component.layout || Fragment;
  const lastVisitedUrl = router?.asPath || "/profile";

  useEffect(storePathValues, [lastVisitedUrl]);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta property="og:url" content="https://marketplace.com" />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Find everything you need in one convenient place at Store, your go-to destination for shopping with confidence."
        />
        <meta
          property="og:description"
          content="Find everything you need in one convenient place at Store, your go-to destination for shopping with confidence."
        />
        {/* TODO: Add this to the head of your page */}
        {/* <meta property="og:image" content="/assets/images/landing/preview.png" /> */}
        <link rel="shortcut icon" href="Store.png" type="image/x-icon" />

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
