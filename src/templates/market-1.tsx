import AppLayout from "@component/layout/AppLayout";
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
// import isEmpty from "lodash.isempty";
// import Section3 from "@sections/market-1/Section3";
// import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
// import Section6 from "@sections/market-1/Section6";
// import Section7 from "@sections/market-1/Section7";
// import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
// import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
// import Section13 from "@sections/market-1/Section13";
// data models
import Shop from "@models/shop.model";
import Product from "@models/product.model";
import Category from "@models/category.model";
import MainCarouselItem from "@models/market-1.model";
import Collection from "@models/collection.model";
// import Section3 from "@sections/fashion-3/Section3";

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

const MarketOneTemplate = (props: Props) => {
  const products = props?.products;
  const collections = props?.collections;
  const categories = props?.categories;

  const listOfCollections = collections
    ?.filter((collection) => collection?.products?.length > 0)
    ?.map((collection) => {
      const products = collection?.products;
      return <Section2 products={products} title={collection?.name} />;
    });

  console.log("collections", collections);
  console.log("Length: ", collections?.length);

  // 282 * 105

  const serviceList = [
    {
      title: "Local Shipping",
      description: "Local Shipping System",
      icon: "truck",
    },
    {
      title: "Safe Payment",
      description: "Safe Payment System",
      icon: "credit-card",
    },
    {
      title: "Support 24/7",
      description: "Contact us 24 hours a day",
      icon: "customer-service",
    },
    {
      title: "100% Money Back",
      description: "You have 30 days to Return",
      icon: "shield",
    },
  ];

  return (
    <main>
      {/* HERO CAROUSEL AREA */}
      <Section1 carouselData={props.mainCarouselData} />
      {listOfCollections}

      {/* {products?.length && (
        <Section3 products={products} title="All Products" />
      )} */}

      {/* FLASH DEAL PRODUCTS AREA */}
      <Section2 products={products} title="All Products" />
      {/* TOP CATEGORIES AREA */}
      {/* <Section3 categoryList={props.topCategories} /> */}
      {/* TOP RATING AND BRANDS AREA */}
      {/* <Section4
        topRatedList={props.topRatedProducts}
        topRatedBrands={props.topRatedBrands}
      /> */}
      {/* NEW ARRIVALS AREA */}
      <Section5
        newArrivalsList={products?.slice(
          products?.length - 7,
          products?.length - 1
        )}
      />
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
      <Section10 categories={categories} />
      {/* MORE PRODUCTS AREA */}
      {/* <Section11 moreItems={products} /> */}
      {/* SERVICES AREA */}
      <Section12 serviceList={serviceList} />
    </main>
  );
};

MarketOneTemplate.layout = AppLayout;

export default MarketOneTemplate;
