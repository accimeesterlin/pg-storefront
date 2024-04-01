import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
// import AppStore from "@component/AppStore";
import Container from "@component/Container";
import Typography, { Paragraph } from "@component/Typography";
import { getTheme } from "@utils/utils";
import { useAppContext } from "@context/AppContext";

// styled component
const StyledLink = styled.a`
  position: relative;
  display: block;
  padding: 0.3rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
`;

const Footer1: FC = () => {
  const { state } = useAppContext();

  const shop = state.shop;
  const logoUrl = shop?.profilePicture || "";
  const description = shop?.description || "";
  const email = shop?.email || "";
  const phone = shop?.phone || "";

  let footerMenus = footerLinks || [];

  const menuQuantity = state.footerMenus?.length;

  if (menuQuantity > 0) {
    footerMenus = state?.footerMenus?.map((menu, index) => {
      //
      if (menu?.footerMenuItems?.length > 0) {
        return {
          id: menu?.id,
          title: menu?.title,
          href: menu?.href,
          footerMenuItems: menu?.footerMenuItems,
        };
      }

      // Only return the first 3 menus
      if (index === 3) {
        return menu;
      }

      return footerLinks[index];
    });
  }

  const footerBg = shop?.footerColorHex || "#0F3460";

  return (
    <footer>
      <Box bg={footerBg || "#0F3460"}>
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Link href="/">
                  <Image alt="logo" mb="1.25rem" src={logoUrl} width="50px" />
                </Link>

                {description && (
                  <Paragraph mb="1.25rem" color="gray.500">
                    {description?.slice(0, 120)}
                  </Paragraph>
                )}

                {/* <AppStore /> */}
              </Grid>

              {footerMenus.map((menu) => (
                <DisplayFooterMenuItems
                  key={menu?.id}
                  title={menu?.title}
                  id={menu?.id}
                  {...menu}
                />
              ))}

              <Grid item lg={3} md={4} sm={6} xs={12}>
                <Typography
                  mb="1.25rem"
                  lineHeight="1"
                  fontSize="25px"
                  fontWeight="600"
                >
                  Contact Us
                </Typography>

                {/* <Typography py="0.3rem" color="gray.500">
                  70 Washington Square South, New York, NY 10012, United States
                </Typography> */}

                <Typography py="0.3rem" color="gray.500">
                  Email: {email}
                </Typography>

                <Typography py="0.3rem" mb="1rem" color="gray.500">
                  Phone: {phone}
                </Typography>

                <FlexBox className="flex" mx="-5px">
                  {iconList(state?.shop?.socialMedialLinks || {}).map(
                    (item) => (
                      <a
                        href={item.url}
                        target="_blank"
                        key={item.iconName}
                        rel="noreferrer noopenner"
                      >
                        <Box
                          m="5px"
                          p="10px"
                          size="small"
                          borderRadius="50%"
                          bg="rgba(0,0,0,0.2)"
                        >
                          <Icon size="12px" color="gray">
                            {item.iconName}
                          </Icon>
                        </Box>
                      </a>
                    )
                  )}
                </FlexBox>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

type FooterMenuItemProps = {
  title: string;
  href: string;
};

type FooterMenuItem = {
  id: string;
  title: string;
  href: string;

  footerMenuItems: FooterMenuItemProps[];
};

const DisplayFooterMenuItems = (props: FooterMenuItem) => {
  const { footerMenuItems, id, title } = props;

  if (!footerMenuItems || footerMenuItems.length === 0) {
    return null;
  }

  return (
    <Grid item lg={3} md={4} sm={6} xs={12}>
      <div key={id}>
        <Typography
          mb="1.25rem"
          lineHeight="1"
          fontSize="25px"
          fontWeight="600"
        >
          {title}
        </Typography>

        <div>
          {footerMenuItems?.map((item, ind) => (
            <Link href={item?.href || "/"} key={ind}>
              <StyledLink>{item?.title}</StyledLink>
            </Link>
          ))}
        </div>
      </div>
    </Grid>
  );
};

const footerLinks = [
  {
    title: "About Us",
    href: "/about-us",
    id: "about-us",
    footerMenuItems: [
      { title: "Our Stores", href: "/our-stores", id: "our-stores" },
      { title: "Our Cares", href: "/our-cares", id: "our-cares" },
      {
        title: "Terms & Conditions",
        href: "/terms-conditions",
        id: "terms-conditions",
      },
      {
        title: "Privacy Policy",
        href: "/privacy-policy",
        id: "privacy-policy",
      },
    ],
  },

  {
    title: "Customer Care",
    href: "/customer-care",
    id: "customer-care",
    footerMenuItems: [
      { title: "Help Center", href: "/help-center", id: "help-center" },
      { title: "How to Buy", href: "/how-to-buy", id: "how-to-buy" },
      {
        title: "Track Your Order",
        href: "/track-your-order",
        id: "track-your-order",
      },
      {
        title: "Corporate & Bulk Purchasing",
        href: "/corporate-bulk-purchasing",
        id: "corporate-bulk-purchasing",
      },
      {
        title: "Returns & Refunds",
        href: "/returns-refunds",
        id: "returns-refunds",
      },
    ],
  },
];

const iconList = (links) => {
  const facebook = {
    iconName: "facebook",
    url: links?.facebook || "/",
  };
  const twitter = { iconName: "twitter", url: "/" };
  const youtube = {
    iconName: links?.youtube || "youtube",
    url: "/",
  };
  const instagram = { iconName: "instagram", url: links?.instagram || "/" };
  const google = { iconName: "google", url: links?.google || "/" };

  const telegram = { iconName: "telegram", url: links?.telegram || "/" };
  // const discord = { iconName: "discord", url: "/" };
  // const linkedin = { iconName: "linkedin", url: "/" };
  // const pinterest = { iconName: "pinterest", url: "/" };
  // const whatsapp = { iconName: "whatsapp", url: "/" };
  // const snapchat = { iconName: "snapchat", url: "/" };
  // const tiktok = { iconName: "tiktok", url: "/" };

  return [facebook, twitter, youtube, instagram, google, telegram];
};

export default Footer1;
