import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import Box from "@component/Box";
import Image from "@component/Image";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import AppStore from "@component/AppStore";
import { Paragraph } from "@component/Typography";
import { deviceSize } from "@utils/constants";
import { getTheme } from "@utils/utils";
import { useAppContext } from "@context/AppContext";

// styled component
const StyledLink = styled.a`
  display: block;
  padding: 0.35rem 0rem;
  color: ${getTheme("colors.gray.500")};
  cursor: pointer;
  border-radius: 4px;
  :hover {
    color: ${getTheme("colors.gray.100")};
  }
  z-index: 999;
  position: relative;
`;

const StyledBox = styled(Box)`
  margin-right: auto;
  margin-left: auto;

  @media only screen and (max-width: ${deviceSize.sm}px) {
    margin-right: unset;
    margin-left: unset;
  }
`;

const Wrapper = styled(Box)`
  margin-bottom: 1rem;
  padding: 40px;
  color: white;
  overflow: hidden;
  border-radius: 8px;
  background-color: #0f3460;

  @media only screen and (max-width: 900px) {
    margin-bottom: 3.75rem;
  }
`;

const Footer2: FC = () => {
  const { state } = useAppContext();

  const shop = state.shop;
  const logoUrl = shop?.profilePicture || "";

  return (
    <footer>
      <Wrapper>
        <Link href="/">
          <Image mb="1.5rem" src={logoUrl} alt="logo" width="50px" />
        </Link>

        <Grid container spacing={6}>
          <Grid item md={6} sm={6} xs={12}>
            <Paragraph mb="1.25rem" color="gray.500" maxWidth="370px">
              PGecom offers a comprehensive suite of services to meet the needs
              of our customers, from gift cards and online courses, to
              instructors, virtual cards, and ecommerce market access.
            </Paragraph>

            <AppStore />
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <StyledBox maxWidth="230px" mt="-0.35rem">
              <div>
                {customerCareLinks.map((item, ind) => (
                  <Link href="/" key={ind}>
                    <StyledLink>{item}</StyledLink>
                  </Link>
                ))}
              </div>

              <FlexBox mx="-5px" mt="1rem">
                {iconList.map((item, ind) => (
                  <Link href="/" key={ind}>
                    <Box
                      m="5px"
                      size="small"
                      p="10px"
                      bg="rgba(0,0,0,0.2)"
                      borderRadius="50%"
                      cursor="pointer"
                    >
                      <Icon size="12px" defaultcolor="auto">
                        {item}
                      </Icon>
                    </Box>
                  </Link>
                ))}
              </FlexBox>
            </StyledBox>
          </Grid>
        </Grid>
      </Wrapper>
    </footer>
  );
};

const customerCareLinks = [
  "Help Center",
  "Track Your Order",
  "Corporate & Bulk Purchasing",
  "Returns & Refunds",
];

const iconList = ["facebook", "twitter", "youtube", "google", "instagram"];

export default Footer2;
