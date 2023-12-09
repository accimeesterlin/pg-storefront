import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
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

  let footerMenus = [];

  if (state.footerMenus?.length > 0) {
    footerMenus = state?.footerMenus?.slice(0, 1) || [];
  }

  const footerBg = shop?.footerColorHex || "#0F3460";

  return (
    <footer>
      <Box bg={footerBg || "#0F3460"}>
        <Container p="1rem" color="white">
          <Box py="5rem" overflow="hidden">
            <Grid container spacing={6}>
              <Grid item lg={4} md={6} sm={6} xs={12}>
                <Link href="/">
                  <a>
                    <Image alt="logo" mb="1.25rem" src={logoUrl} width="50px" />
                  </a>
                </Link>

                {description && (
                  <Paragraph mb="1.25rem" color="gray.500">
                    {description}
                  </Paragraph>
                )}

                {/* <AppStore /> */}
              </Grid>

              <DisplayFooterMenuItems footerMenuItems={footerMenus} />

              <Grid item lg={3} md={6} sm={6} xs={12}>
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

                {/* <FlexBox className="flex" mx="-5px">
                  {iconList.map((item) => (
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
                  ))}
                </FlexBox> */}
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

const DisplayFooterMenuItems = ({ footerMenuItems }) => {
  if (!footerMenuItems || footerMenuItems.length === 0) {
    return null;
  }

  return (
    <Grid item lg={3} md={6} sm={6} xs={12}>
      {footerMenuItems.map(
        (menu) =>
          menu?.footerMenuItems &&
          menu.footerMenuItems.length > 0 && (
            <div key={menu.id}>
              <Typography
                mb="1.25rem"
                lineHeight="1"
                fontSize="25px"
                fontWeight="600"
              >
                {menu?.title}
              </Typography>

              <div>
                {menu.footerMenuItems.map((item, ind) => (
                  <Link href={item?.href || "/"} key={ind}>
                    <StyledLink>{item?.title}</StyledLink>
                  </Link>
                ))}
              </div>
            </div>
          )
      )}
    </Grid>
  );
};

// const aboutLinks = [
//   "Careers",
//   "Our Stores",
//   "Our Cares",
//   "Terms & Conditions",
//   "Privacy Policy",
// ];

// const customerCareLinks = [
//   "Help Center",
//   "How to Buy",
//   "Track Your Order",
//   "Corporate & Bulk Purchasing",
//   "Returns & Refunds",
// ];

// const iconList = [
//   { iconName: "facebook", url: "https://www.facebook.com/UILibOfficial" },
//   { iconName: "twitter", url: "/" },
//   {
//     iconName: "youtube",
//     url: "https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg",
//   },
//   { iconName: "google", url: "/" },
//   { iconName: "instagram", url: "/" },
// ];

export default Footer1;
