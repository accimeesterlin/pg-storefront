import { FC, useEffect, useState } from "react";
import Menu from "../Menu";
import Image from "../Image";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import NavLink from "../nav-link";
import MenuItem from "../MenuItem";
import Container from "../Container";
import { Small } from "../Typography";
import StyledTopbar from "./styles";
import { useAppContext } from "@context/AppContext";

const Topbar: FC = () => {
  const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  const { state } = useAppContext();

  const shop = state.shop;
  const logoUrl = shop?.profilePicture || "";
  const phone = shop?.phone || "";
  const email = shop?.email || "";

  const handleCurrencyClick = (curr: typeof currency) => () =>
    setCurrency(curr);

  const handleLanguageClick = (lang: typeof language) => () =>
    setLanguage(lang);

  useEffect(() => {
    // get language from browser
  }, []);

  return (
    <StyledTopbar>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="100%"
      >
        <FlexBox className="topbar-left">
          <div className="logo">
            <img src={logoUrl} alt="logo" width="50px" />
          </div>

          <FlexBox alignItems="center">
            <Icon size="14px" color="gray">
              phone-call
            </Icon>
            <span>{phone}</span>
          </FlexBox>

          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px" color="gray">
              mail
            </Icon>
            <span>{email}</span>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbar-right" alignItems="center">
          <NavLink className="link" href="/">
            FAQ"s
          </NavLink>

          <NavLink className="link" href="/">
            Need Help?
          </NavLink>

          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
                mr="1.25rem"
              >
                <Image src={language.mainImageUrl} alt={language.title} />
                <Small fontWeight="600">{language.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {languageList.map((item) => (
              <MenuItem key={item.title} onClick={handleLanguageClick(item)}>
                <Image
                  src={item.mainImageUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>

          <Menu
            direction="right"
            handler={
              <FlexBox
                className="dropdown-handler"
                alignItems="center"
                height="40px"
              >
                <Image src={currency.mainImageUrl} alt={currency.title} />
                <Small fontWeight="600">{currency.title}</Small>
                <Icon size="1rem">chevron-down</Icon>
              </FlexBox>
            }
          >
            {currencyList.map((item) => (
              <MenuItem key={item.title} onClick={handleCurrencyClick(item)}>
                <Image
                  src={item.mainImageUrl}
                  borderRadius="2px"
                  mr="0.5rem"
                  alt={item.title}
                />
                <Small fontWeight="600">{item.title}</Small>
              </MenuItem>
            ))}
          </Menu>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

const languageList = [
  { title: "EN", mainImageUrl: "/assets/images/flags/usa.png" },
  { title: "BN", mainImageUrl: "/assets/images/flags/bd.png" },
  { title: "HN", mainImageUrl: "/assets/images/flags/in.png" },
];

const currencyList = [
  { title: "USD", mainImageUrl: "/assets/images/flags/usa.png" },
  { title: "EUR", mainImageUrl: "/assets/images/flags/uk.png" },
  { title: "BDT", mainImageUrl: "/assets/images/flags/bd.png" },
  { title: "INR", mainImageUrl: "/assets/images/flags/in.png" },
];

export default Topbar;
