import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Topbar from "@component/topbar";
import Sticky from "@component/sticky";
import { Header } from "@component/header";
import { Footer1 } from "@component/footer";
import MobileNavigationBar from "@component/mobile-navigation";
import StyledAppLayout from "./AppLayoutStyle";
import { useAppContext } from "@context/AppContext";
import { capitalize } from "lodash";

// ===============================================================================
type Props = { title?: string; navbar?: ReactElement; children: ReactNode };
// ===============================================================================

const AppLayout: FC<Props> = (props) => {
  const [domainName, setDomainName] = useState("");
  const { navbar, children, title = "Store" } = props;

  const { state } = useAppContext();

  const shop = state.shop;
  const shopName = shop?.name;
  const description = shop?.description;
  const logo = shop?.profilePicture;

  useEffect(() => {
    const domain = window.location.hostname;
    setDomainName(`https://${domain}`);
  }, []);

  return (
    <StyledAppLayout>
      <Head>
        <title>{capitalize(shop?.name) || title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
      </Head>

      <Topbar />

      <Sticky fixedOn={0}>
        <Header />
      </Sticky>

      {navbar && <div className="section-after-sticky">{navbar}</div>}
      {!navbar ? (
        <div className="section-after-sticky">{children}</div>
      ) : (
        children
      )}

      <MobileNavigationBar />
      <Footer1 />
    </StyledAppLayout>
  );
};

export default AppLayout;
