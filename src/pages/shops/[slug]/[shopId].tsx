import { Fragment } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Hidden from "@component/hidden";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import Sidenav from "@component/sidenav/Sidenav";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductCardList from "@component/products/ProductCard1List";
import ProductFilterCard from "@component/products/ProductFilterCard";
import ShopIntroCard from "@sections/shop/ShopIntroCard";
import useWindowSize from "@hook/useWindowSize";
import Shop from "@models/shop.model";
// import api from "@utils/__api__/shops";
import { getShopById } from "../../api/queries/getShop";
import { getProductByShopId } from "../../api/queries/getProduct";
import Product from "@models/product.model";

// ============================================================
type Props = { shop: Shop, products: Product[], };
// ============================================================

const ShopDetails = ({ shop, products }: Props) => {
  const router = useRouter();
  const width = useWindowSize();
  const isTablet = width < 1025;

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <ShopIntroCard shop={shop}/>

      <Grid container spacing={6}>
        {/* SHOW IN LARGE DEVICE */}
        <Hidden as={Grid} item md={3} xs={12} down={1024}>
          <ProductFilterCard />
        </Hidden>

        <Grid item md={9} xs={12}>
          {/* SHOW IN SMALL DEVICE */}
          {isTablet && (
            <Sidenav
              scroll={true}
              position="left"
              handle={
                <FlexBox justifyContent="flex-end" mb="12px">
                  <Icon>options</Icon>
                </FlexBox>
              }
            >
              <ProductFilterCard />
            </Sidenav>
          )}

          <ProductCardList products={products?.slice(0, 9)} shop={shop} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

ShopDetails.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  const shopId = query?.shopId as string;


  const shop = await getShopById(shopId);
  const products = await getProductByShopId(shopId);


  return { props: { shop, products } };
};

export default ShopDetails;
