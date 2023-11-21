import { GetStaticProps } from "next";
import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
// import Section6 from "@sections/market-1/Section6";
import Section7 from "@sections/market-1/Section7";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
// import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
import Section13 from "@sections/market-1/Section13";
import api from "@utils/__api__/market-1";
import { getShopById } from "@utils/__api__/shops";
import productApi from "@utils/__api__/products";
// data models
import Shop from "@models/shop.model";
import Brand from "@models/Brand.model";
import Product from "@models/product.model";
import Service from "@models/service.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import { useAppContext } from "@context/AppContext";
import { useEffect } from "react";

// =================================================================
type Props = {
  carList?: Product[];
  carBrands?: Brand[];
  opticsShops?: Shop[];
  mobileShops?: Shop[];
  moreItems?: Product[];
  opticsList?: Product[];
  mobileList?: Product[];
  mobileBrands?: Brand[];
  opticsBrands?: Brand[];
  serviceList?: Service[];
  topRatedBrands?: Brand[];
  topCategories?: Category[];
  flashDealsData?: Product[];
  newArrivalsList?: Product[];
  bigDiscountList?: Product[];
  topRatedProducts?: Product[];
  bottomCategories?: Category[];
  mainCarouselData?: MainCarouselItem[];
  shop: Shop;
  products: Product[];
};
// =================================================================

const Market1 = (props: Props) => {
  const { dispatch } = useAppContext();

  const shop = props?.shop;
  const products = props?.products;

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

  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={props.mainCarouselData} />

      {/* FLASH DEAL PRODUCTS AREA */}
      <Section2 products={props.flashDealsData} />

      {/* TOP CATEGORIES AREA */}
      <Section3 categoryList={props.topCategories} />

      {/* TOP RATING AND BRANDS AREA */}
      <Section4
        topRatedList={props.topRatedProducts}
        topRatedBrands={props.topRatedBrands}
      />

      {/* NEW ARRIVALS AREA */}
      <Section5 newArrivalsList={props.newArrivalsList} />

      {/* BIG DISCOUNT AREA */}
      <Section13 bigDiscountList={props.bigDiscountList} />

      {/* CAR LIST AREA */}
      {/* <Section6 carBrands={props.carBrands} carList={props.carList} /> */}

      {/* MOBILE PHONES AREA */}
      <Section7
        title="Mobile Phones"
        shops={props.mobileShops}
        brands={props.mobileBrands}
        productList={props.mobileList}
      />

      {/* DISCOUNT BANNERS AREA */}
      <Section8 />

      {/* OPTICS AND WATCH AREA */}
      <Section7
        title="Optics / Watch"
        shops={props.opticsShops}
        brands={props.opticsBrands}
        productList={props.opticsList}
      />

      {/* CATEGORIES AREA */}
      <Section10 categories={props.bottomCategories} />

      {/* MORE PRODUCTS AREA */}
      {/* <Section11 moreItems={props.moreItems} /> */}

      {/* SERVICES AREA */}
      <Section12 serviceList={props.serviceList} />
    </main>
  );
};

Market1.layout = AppLayout;

// ==============================================================

export const getStaticProps: GetStaticProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const products = await productApi?.getProducts(shopId);
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const moreItems = await api.getMoreItems();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const serviceList = await api.getServiceList();
  const mobileBrands = await api.getMobileBrands();
  const flashDealsData = await api.getFlashDeals();
  const opticsBrands = await api.getOpticsBrands();
  const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const topRatedBrands = await api.getTopRatedBrand();
  const mainCarouselData = await api.getMainCarousel(shopId);
  const newArrivalsList = await api.getNewArrivalList();
  const bigDiscountList = await api.getBigDiscountList();
  const topRatedProducts = await api.getTopRatedProduct();

  return {
    props: {
      carList,
      carBrands,
      moreItems,
      mobileList,
      opticsList,
      serviceList,
      mobileShops,
      opticsShops,
      mobileBrands,
      opticsBrands,
      topCategories,
      flashDealsData,
      topRatedBrands,
      newArrivalsList,
      bigDiscountList,
      mainCarouselData,
      topRatedProducts,
      bottomCategories,
      shop,
      products,
    },
  };
};

export default Market1;
