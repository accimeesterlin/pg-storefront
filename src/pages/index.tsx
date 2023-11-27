import { GetStaticProps } from "next";
import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
// import Section3 from "@sections/market-1/Section3";
// import Section4 from "@sections/market-1/Section4";
// import Section5 from "@sections/market-1/Section5";
// import Section6 from "@sections/market-1/Section6";
// import Section7 from "@sections/market-1/Section7";
// import Section8 from "@sections/market-1/Section8";
// import Section10 from "@sections/market-1/Section10";
// import Section11 from "@sections/market-1/Section11";
// import Section12 from "@sections/market-1/Section12";
// import Section13 from "@sections/market-1/Section13";
import api from "@utils/__api__/market-1";
import categoryApi from "@utils/__api__/category";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
  getHomeMenus,
} from "@utils/__api__/shops";
import productApi from "@utils/__api__/products";
// data models
import Shop from "@models/shop.model";
import Product from "@models/product.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import { useAppContext } from "@context/AppContext";
import { useEffect } from "react";
import Collection from "@models/collection.model";
import Section3 from "@sections/fashion-3/Section3";

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

const Market1 = (props: Props) => {
  const { dispatch } = useAppContext();
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;
  const shop = props?.shop;
  const products = props?.products;
  const menus = props?.menus;
  const collections = props?.collections;
  const footerMenus = props?.footerMenus;
  const categories = props?.categories;
  const homeMenus = props?.homeMenus;

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
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

  const getShop = async () => {
    try {
      const data: any = await getShopById(shopId);

      if (data) {
        dispatch({ type: "SET_SHOP", payload: data });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getShop();
  }, [shopId]);

  const listOfCollections = collections?.map((collection) => {
    const products = collection?.products;
    return <Section2 products={products} title={collection?.name} />;
  });

  // 282 * 105

  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={props.mainCarouselData} />
      {listOfCollections}
      <Section3 products={products} title="All Products" />
      {/* FLASH DEAL PRODUCTS AREA */}
      {/* <Section2 products={props.flashDealsData} /> */}
      {/* TOP CATEGORIES AREA */}
      {/* <Section3 categoryList={props.topCategories} /> */}
      {/* TOP RATING AND BRANDS AREA */}
      {/* <Section4
        topRatedList={props.topRatedProducts}
        topRatedBrands={props.topRatedBrands}
      /> */}
      {/* NEW ARRIVALS AREA */}
      {/* <Section5 newArrivalsList={props.newArrivalsList} /> */}
      {/* BIG DISCOUNT AREA */}
      {/* <Section13 bigDiscountList={props.bigDiscountList} /> */}
      {/* CAR LIST AREA */}
      {/* <Section6 carBrands={props.carBrands} carList={props.carList} /> */}
      {/* MOBILE PHONES AREA */}
      {/* <Section7
        title="Mobile Phones"
        shops={props.mobileShops}
        brands={props.mobileBrands}
        productList={props.mobileList}
      /> */}
      {/* DISCOUNT BANNERS AREA */}
      {/* <Section8 /> */}
      {/* OPTICS AND WATCH AREA */}
      {/* <Section7
        title="Optics / Watch"
        shops={props.opticsShops}
        brands={props.opticsBrands}
        productList={props.opticsList}
      /> */}
      {/* CATEGORIES AREA */}
      {/* <Section10 categories={props.bottomCategories} /> */}
      {/* MORE PRODUCTS AREA */}
      {/* <Section11 moreItems={props.moreItems} /> */}
      {/* SERVICES AREA */}
      {/* <Section12 serviceList={props.serviceList} /> */}
    </main>
  );
};

Market1.layout = AppLayout;

// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: 60,
  };
};

export default Market1;
