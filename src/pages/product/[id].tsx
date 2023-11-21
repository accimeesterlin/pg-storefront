import { Fragment, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/router";
import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";
import NavbarLayout from "@component/layout/NavbarLayout";
import ProductIntro from "@component/products/ProductIntro";
import ProductReview from "@component/products/ProductReview";
import AvailableShops from "@component/products/AvailableShops";
import RelatedProducts from "@component/products/RelatedProducts";
import FrequentlyBought from "@component/products/FrequentlyBought";
import ProductDescription from "@component/products/ProductDescription";
import api from "@utils/__api__/products";
import Shop from "@models/shop.model";
import Product from "@models/product.model";
import { getShopById } from "@utils/__api__/shops";
import { useAppContext } from "@context/AppContext";

// ===============================================================
type ProductDetailsProps = {
  product: Product;
  shops: Shop[];
  shop: Shop;
  relatedProducts: Product[];
  frequentlyBought: Product[];
};
// ===============================================================

const ProductDetails = (props: ProductDetailsProps) => {
  const { product, shops, relatedProducts, frequentlyBought, shop } = props;
  const { dispatch } = useAppContext();

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => setSelectedOption(opt);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
    }
  }, [shop]);

  return (
    <Fragment>
      <ProductIntro
        id={product?.id}
        price={product?.price}
        name={product?.name}
        images={product?.images}
        mainImageUrl={product?.mainImageUrl}
        rating={product?.rating}
        shop={product?.shop}
      />

      <FlexBox
        borderBottom="1px solid"
        borderColor="gray.400"
        mt="80px"
        mb="26px"
      >
        <H5
          mr="25px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
          borderBottom={selectedOption === "description" && "2px solid"}
          color={
            selectedOption === "description" ? "primary.main" : "text.muted"
          }
        >
          Description
        </H5>

        <H5
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("review")}
          borderBottom={selectedOption === "review" && "2px solid"}
          color={selectedOption === "review" ? "primary.main" : "text.muted"}
        >
          Review
        </H5>
      </FlexBox>

      {/* DESCRIPTION AND REVIEW TAB DETAILS */}
      <Box mb="50px">
        {selectedOption === "description" && (
          <ProductDescription description={product?.description} />
        )}
        {selectedOption === "review" && <ProductReview />}
      </Box>

      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      {frequentlyBought?.length > 0 && (
        <FrequentlyBought products={frequentlyBought} />
      )}

      {/* AVAILABLE SHOPS */}
      {shops && <AvailableShops shops={shops} />}

      {/* RELATED PRODUCTS */}
      {relatedProducts?.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </Fragment>
  );
};

ProductDetails.layout = NavbarLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;
  try {
    const productId = query.id as string;
    const shops = [];
    const shop = await getShopById(shopId);

    const product: Product = await api.getProduct(productId);
    const relatedProducts = [];

    return {
      props: { frequentlyBought: [], relatedProducts, product, shop, shops },
    };
  } catch (error) {
    Sentry.captureException(error, {
      user: {
        extra: {
          shopId,
        },
      },
    });
    return {
      props: {
        frequentlyBought: [],
        relatedProducts: [],
        product: {},
        shop: {},
        shops: [],
      },
    };
  }
};

export default ProductDetails;
