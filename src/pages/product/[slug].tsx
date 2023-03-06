import { Fragment, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { isEmpty } from 'lodash';
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


// ===============================================================
type Props = {
  product: Product;
  shops: Shop[];
  relatedProducts: Product[];
  frequentlyBought: Product[];
};
// ===============================================================

const ProductDetails = (props: Props) => {
  const { product, shops, relatedProducts, frequentlyBought } = props;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("description");

  const handleOptionClick = (opt) => () => setSelectedOption(opt);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

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

      <FlexBox borderBottom="1px solid" borderColor="gray.400" mt="80px" mb="26px">
        <H5
          mr="25px"
          p="4px 10px"
          className="cursor-pointer"
          borderColor="primary.main"
          onClick={handleOptionClick("description")}
          borderBottom={selectedOption === "description" && "2px solid"}
          color={selectedOption === "description" ? "primary.main" : "text.muted"}
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
          Review (3)
        </H5>
      </FlexBox>

      {/* DESCRIPTION AND REVIEW TAB DETAILS */}
      <Box mb="50px">
        {selectedOption === "description" && <ProductDescription description={product?.description} />}
        {selectedOption === "review" && <ProductReview />}
      </Box>

      {/* FREQUENTLY BOUGHT TOGETHER PRODUCTS */}
      {frequentlyBought && <FrequentlyBought products={frequentlyBought} />}

      {/* AVAILABLE SHOPS */}
      {shops && <AvailableShops shops={shops} />}

      {/* RELATED PRODUCTS */}
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </Fragment>
  );
};

ProductDetails.layout = NavbarLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [ { params: { slug: 'pgecom' } } ]

  try {
    paths = await api.getSlugs();
  } catch (error) {
    // No slugs available
  }


  return {
    paths: paths, // indicates that no page needs be created at build time
    fallback: "blocking", // indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let shops = [];

  try {
    shops = await api.getAvailableShop();
  } catch (error) {
    // No shops available
  }
  
  // const frequentlyBought = await api.getFrequentlyBought();
  let product: Product = {};

  try {
    product = await api.getProduct(params.slug as string);

    if (isEmpty(product)) {
      product = await api.getDemoProduct(params.slug as string) || {};
    }
  } catch (error) {
    // No product found
    product = await api.getDemoProduct(params.slug as string) || {};
  }

  let relatedProducts = [];
  console.log("Product", product);

  try {
    relatedProducts = await api.getRelatedProducts(product?.id);
  } catch (error) {
    // No related products
  }

  return { props: { frequentlyBought: [], relatedProducts, product, shops } };
};

export default ProductDetails;
