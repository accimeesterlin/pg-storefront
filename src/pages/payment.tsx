import { useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@component/grid/Grid";
import isEmpty from "lodash.isempty";
import PaymentForm from "@sections/payment/PaymentForm";
import PaymentSummary from "@sections/payment/PaymentSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { useAppContext } from "@context/AppContext";
import { createLocalStorage } from "@utils/utils";
import { GetStaticProps } from "next";
import marketApi from "@utils/__api__/market-1";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
} from "@utils/__api__/shops";
import productApi from "@utils/__api__/products";
import Shop from "@models/shop.model";
import Product from "@models/product.model";
import Collection from "@models/collection.model";

type Props = {
  shop: Shop;
  products: Product[];
  collections: Collection[];
  menus: any[];
  footerMenus: any[];
};

const Checkout = (props: Props) => {
  const [, getCheckout] = createLocalStorage("checkoutData");
  const { state, dispatch } = useAppContext();
  const router = useRouter();

  const address = state.checkout?.address;
  const shop = props?.shop;
  const products = props?.products;
  const menus = props?.menus;
  const footerMenus = props?.footerMenus;

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
    }
  }, [shop]);

  useEffect(() => {
    if (products) {
      dispatch({ type: "SET_PRODUCT_LIST", payload: products });
    }
  }, [products]);

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

  useEffect(() => {
    const savedCheckoutData: any = getCheckout("checkoutData");

    if (isEmpty(savedCheckoutData?.address) && isEmpty(address)) {
      navigateBackToCheckout();
    }
  }, [address]);

  const navigateBackToCheckout = () => {
    return router?.push("/checkout");
  };

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export const getStaticProps: GetStaticProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const footerMenus = await getShopFooterMenus(shopId);

  const products = await productApi?.getProducts(shopId);
  const collections = await productApi?.getCollections(shopId);
  const mainCarouselData = await marketApi.getMainCarousel(shopId);
  const menus = await getShopMenus(shopId);

  return {
    props: {
      mainCarouselData,
      shop,
      products,
      collections,
      menus,
      footerMenus,
    },
  };
};

export default Checkout;
