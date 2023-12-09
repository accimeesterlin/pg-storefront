import { useEffect } from "react";
import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import categoryApi from "@utils/__api__/category";
import { useAppContext } from "@context/AppContext";
import { GetServerSideProps } from "next";
import marketApi from "@utils/__api__/market-1";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
  getHomeMenus,
} from "@utils/__api__/shops";
import Shop from "@models/shop.model";
import Category from "@models/category.model";
// data models

// =================================================================
type Props = {
  shop: Shop;
  menus: any[];
  footerMenus: any[];
  categories: Category[];
  homeMenus: any[];
};

const Checkout = (props: Props) => {
  const { dispatch } = useAppContext();

  const shop = props?.shop;
  const menus = props?.menus;
  const footerMenus = props?.footerMenus;
  const categories = props?.categories;
  const homeMenus = props?.homeMenus;

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
    }

    if (menus) {
      dispatch({ type: "SET_NAVIGATION_MENU", payload: menus });
    }

    if (footerMenus) {
      dispatch({ type: "SET_FOOTER_MENU", payload: footerMenus });
    }

    if (categories) {
      dispatch({ type: "SET_CATEGORY", payload: categories });
    }

    if (homeMenus) {
      dispatch({ type: "SET_HOME_MENU", payload: homeMenus });
    }
  }, [shop, menus, footerMenus, categories, homeMenus]);

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

export const getServerSideProps: GetServerSideProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const footerMenus = await getShopFooterMenus(shopId);

  const mainCarouselData = await marketApi.getMainCarousel(shopId);
  const menus = await getShopMenus(shopId);
  const homeMenus = await getHomeMenus(shopId);
  const categories = await categoryApi?.getCategoryByShopId(shopId);

  return {
    props: {
      mainCarouselData,
      shop,
      menus,
      footerMenus,
      categories,
      homeMenus,
    },
  };
};

export default Checkout;
