import Link from "next/link";
import { FC, useState, useEffect } from "react";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
// import Login from "@component/sessions/Login";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { SearchInput } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
// import UserLoginDialog from "./LoginDialog";
import StyledHeader from "./styles";
import { createLocalStorage } from "@utils/utils";

// ========================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// ========================================================================

const HeaderTwo: FC<HeaderProps> = ({ className }) => {
  const [, loadCartState] = createLocalStorage("cartState");
  const { state, dispatch } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const shop = state.shop;
  const logoUrl = shop?.profilePicture || "";

  useEffect(() => {
    const cartState: any = loadCartState("cartState");

    if (cartState) {
      dispatch({
        type: "LOAD_CART",
        payload: cartState,
      });
    }
  }, []);

  const CART_HANDLE = (
    <FlexBox ml="20px" alignItems="flex-start">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          px="5px"
          py="2px"
          mt="-9px"
          ml="-1rem"
          bg="primary.main"
          alignItems="center"
          borderRadius="300px"
          justifyContent="center"
        >
          <Tiny color="white" fontWeight="600">
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </FlexBox>
  );

  // const LOGIN_HANDLE = (
  //   <IconButton ml="1rem" bg="gray.200" p="8px">
  //     <Icon size="28px">user</Icon>
  //   </IconButton>
  // );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <img src={logoUrl} alt="logo" width="50px" />
          </Link>
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInput />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* <UserLoginDialog handle={LOGIN_HANDLE}>
            <Login />
          </UserLoginDialog> */}

          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default HeaderTwo;
