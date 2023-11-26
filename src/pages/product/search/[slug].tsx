import { useCallback, useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
// import Select from "@component/Select";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { H5, Paragraph } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCard1List from "@component/products/ProductCard1List";
import ProductCard9List from "@component/products/ProductCard9List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import useWindowSize from "@hook/useWindowSize";
import { useAppContext } from "@context/AppContext";
import { useRouter } from "next/router";

import { GetStaticProps } from "next";
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
import Collection from "@models/collection.model";

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

const ProductSearchResult = (props: Props) => {
  const width = useWindowSize();
  const { dispatch } = useAppContext();
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const [view, setView] = useState<"grid" | "list">("grid");

  const slug = router.query.slug as string;
  const products = props?.products || [];

  const shop = props?.shop;
  const menus = props?.menus;
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

  useEffect(() => {
    if (slug && products?.length > 0) {
      const searchResult = products?.filter((item) =>
        item?.title?.toLowerCase().includes(slug?.toLowerCase())
      );

      setSearchResult(searchResult);
    }
  }, [slug]);

  const isTablet = width < 1025;
  const toggleView = useCallback((v) => () => setView(v), []);

  return (
    <Box pt="20px">
      <FlexBox
        as={Card}
        mb="55px"
        p="1.25rem"
        elevation={5}
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <div>
          <H5>Searching for “ {slug} ”</H5>
          <Paragraph color="text.muted">
            {searchResult?.length} results found
          </Paragraph>
        </div>

        <FlexBox alignItems="center" flexWrap="wrap">
          {/* <Paragraph color="text.muted" mr="1rem">
            Short by:
          </Paragraph>

          <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
            <Select
              placeholder="Short by"
              defaultValue={sortOptions[0]}
              options={sortOptions}
            />
          </Box> */}

          <Paragraph color="text.muted" mr="0.5rem">
            View:
          </Paragraph>

          <IconButton size="small" onClick={toggleView("grid")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "grid" ? "primary" : "inherit"}
            >
              grid
            </Icon>
          </IconButton>

          <IconButton size="small" onClick={toggleView("list")}>
            <Icon
              variant="small"
              defaultcolor="auto"
              color={view === "list" ? "primary" : "inherit"}
            >
              menu
            </Icon>
          </IconButton>

          {isTablet && (
            <Sidenav
              position="left"
              scroll={true}
              handle={
                <IconButton size="small">
                  <Icon>options</Icon>
                </IconButton>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}
        </FlexBox>
      </FlexBox>

      <Grid container spacing={6}>
        <Hidden as={Grid} item lg={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden>

        <Grid item lg={9} xs={12}>
          {view === "grid" ? (
            <ProductCard1List products={searchResult} shop={{ id: "" }} />
          ) : (
            <ProductCard9List products={searchResult} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

// const sortOptions = [
//   { label: "Relevance", value: "Relevance" },
//   { label: "Date", value: "Date" },
//   { label: "Price Low to High", value: "Price Low to High" },
//   { label: "Price High to Low", value: "Price High to Low" },
// ];

ProductSearchResult.layout = NavbarLayout;

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

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
  };
};

export default ProductSearchResult;
