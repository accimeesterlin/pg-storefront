import { useEffect } from "react";
import Grid from "@component/grid/Grid";
import isEmpty from "lodash.isempty";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import api from "@utils/__api__/address";
import { getMe } from "@utils/__api__/users";
import Address from "@models/address.model";
import User from "@models/user.model";
import { useAppContext } from "@context/AppContext";
import { createLocalStorage } from "@utils/utils";
import { GetStaticProps } from "next";
import marketApi from "@utils/__api__/market-1";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
} from "@utils/__api__/shops";
import Shop from "@models/shop.model";
// data models

// =================================================================
type Props = {
  shop: Shop;
  menus: any[];
  footerMenus: any[];
};

const Checkout = (props: Props) => {
  const { dispatch, state } = useAppContext();
  const [, getCheckoutFromLocalStorage] = createLocalStorage("checkoutData");

  const shop = props?.shop;
  const menus = props?.menus;
  const footerMenus = props?.footerMenus;

  useEffect(() => {
    handleAddress();
    getUserProfile();
  }, [state.checkout]);

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
    }
  }, [shop]);

  useEffect(() => {
    if (menus) {
      dispatch({ type: "SET_NAVIGATION_MENU", payload: menus });
    }
  }, [menus]);

  useEffect(() => {
    if (footerMenus) {
      dispatch({ type: "SET_FOOTER_MENU", payload: footerMenus });
    }
  }, [footerMenus]);

  const handleAddress = async () => {
    try {
      const savedCheckoutData = getCheckoutFromLocalStorage("checkoutData");
      if (!isEmpty(savedCheckoutData)) {
        return;
      }

      const addresses: Address[] = await api.getAddressList();

      if (addresses?.length > 0) {
        dispatch({
          type: "SET_CHECKOUT",
          payload: {
            address: addresses[0],
          },
        });
      }
    } catch (error) {
      // No address found
    }
  };

  const getUserProfile = async () => {
    try {
      const user: User = await getMe();
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      // No address found
    }
  };

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export const getStaticProps: GetStaticProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const footerMenus = await getShopFooterMenus(shopId);

  const mainCarouselData = await marketApi.getMainCarousel(shopId);
  const menus = await getShopMenus(shopId);

  return {
    props: {
      mainCarouselData,
      shop,
      menus,
      footerMenus,
    },
  };
};

export default Checkout;
