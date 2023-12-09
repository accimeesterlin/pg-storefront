import { GetServerSideProps } from "next";
import api from "@utils/__api__/market-1";
import categoryApi from "@utils/__api__/category";
import { createLocalStorage } from "@utils/utils";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
  getHomeMenus,
} from "@utils/__api__/shops";
import productApi from "@utils/__api__/products";
// data models
import Shop, { ShopTheme } from "@models/shop.model";
import Product from "@models/product.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import Collection from "@models/collection.model";
import MarketOneTemplate from "templates/market-1";
import AppLayout from "@component/layout/AppLayout";

// Theme specific components
import Fashion from "@templates/fashion-1";
import Furniture from "@templates/furniture-shop";
import Gadget from "@templates/gadget-shop";
import Gift from "@templates/gift-shop";
import Grocery from "@templates/grocery-1";
import Health from "@templates/health-beauty";
import { useAppContext } from "@context/AppContext";
import { useEffect } from "react";
// import MarketOne from "@templates/market-1";

// =================================================================
type Props = {
  mainCarouselData?: MainCarouselItem[];
  shop: Shop;
  products: Product[];
  collections: Collection[];
  menus: any[];
  footerMenus: any[];
  categories: Category[];
  homeMenus: any[];
};
// =================================================================

const HomePage = (props: Props) => {
  const [saveMerchantId] = createLocalStorage("merchantId");
  const { dispatch } = useAppContext();
  const shop = props?.shop;
  const products = props?.products;
  const menus = props?.menus;
  const footerMenus = props?.footerMenus;
  const categories = props?.categories;
  const homeMenus = props?.homeMenus;

  const merchantId = shop?.merchantId || shop?.user?.id;

  // Initializing the global state
  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });

      // Saving the merchant id in the local storage
      if (merchantId) {
        saveMerchantId(merchantId);
      }
    }

    if (products) {
      dispatch({ type: "SET_PRODUCT_LIST", payload: products });
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
  }, [shop, products, menus, footerMenus, categories, homeMenus]);

  // Getting the theme from the shop
  const theme = shop?.theme;

  // Rendering the default theme
  if (theme === ShopTheme.DEFAULT) {
    return <MarketOneTemplate {...props} />;
  }

  // Rendering the fashion theme
  if (theme === ShopTheme.FASHION) {
    return (
      <Fashion
        trendingItems={props?.products}
        flashDealsData={props?.products}
        newArrivalsData={props?.products}
        {...props}
      />
    );
  }

  // Rendering the furniture theme
  if (theme === ShopTheme.FURNITURE) {
    return (
      <Furniture
        topNewProducts={props?.products}
        furnitureProducts={props?.products}
        topSellingProducts={props?.products}
        {...props}
      />
    );
  }

  // Rendering the gadget theme
  if (theme === ShopTheme.GADGET) {
    return (
      <Gadget
        topPickList={props?.products}
        mostViewedList={props?.products}
        newArrivalsData={props?.products}
        mainCarouselData={props?.products}
        {...props}
      />
    );
  }

  // Rendering the gift theme
  if (theme === ShopTheme.GIFT) {
    return (
      <Gift
        allProducts={props?.products}
        popularProducts={props?.products}
        topSailedProducts={props?.products}
        {...props}
      />
    );
  }

  // Rendering the grocery theme
  if (theme === ShopTheme.GROCERY) {
    return (
      <Grocery
        products={props?.products}
        popularProducts={props?.products}
        trendingProducts={props?.products}
        {...props}
      />
    );
  }

  // Rendering the health theme
  if (theme === ShopTheme.HEALTH_BEAUTY) {
    return (
      <Health
        allProducts={props?.products}
        topNewProducts={props?.products}
        {...props}
      />
    );
  }

  // Rendering the default theme
  return props?.homeMenus?.length && <MarketOneTemplate {...props} />;
};

HomePage.layout = AppLayout;
// ==============================================================

export const getServerSideProps: GetServerSideProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const footerMenus = await getShopFooterMenus(shopId);

  const products = await productApi?.getProducts(shopId);
  const collections = await productApi?.getCollections(shopId);
  const categories = await categoryApi?.getCategoryByShopId(shopId);
  const mainCarouselData = await api.getMainCarousel(shopId);
  const menus = await getShopMenus(shopId);
  const homeMenus = await getHomeMenus(shopId);

  return {
    props: {
      mainCarouselData,
      shop,
      products,
      collections,
      menus,
      homeMenus,
      footerMenus,
      categories,
    },
  };
};

export default HomePage;
