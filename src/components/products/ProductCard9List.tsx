import { FC, Fragment } from "react";
import FlexBox from "@component/FlexBox";
// import Pagination from "@component/pagination";
import { SemiSpan } from "@component/Typography";
import { ProductCard9 } from "@component/product-cards";
import Product from "@models/product.model";
import { useAppContext } from "@context/AppContext";

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

const ProductCard9List: FC<Props> = ({ products }) => {
  const { state } = useAppContext();

  const totalProducts = state?.products?.length;

  return (
    <Fragment>
      {products.map((item) => (
        <ProductCard9
          mb="1.25rem"
          id={item.id}
          key={item.id}
          slug={item.slug}
          price={item.price}
          name={item.title}
          off={item.comparePrice}
          rating={item.rating}
          images={item.images}
          shop={item.shop}
          mainImageUrl={item.mainImageUrl}
          categories={item.categories}
        />
      ))}

      <FlexBox
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        mt="32px"
      >
        <SemiSpan>
          Showing {products?.length} of {totalProducts} Products
        </SemiSpan>
        {/* <Pagination pageCount={10} /> */}
      </FlexBox>
    </Fragment>
  );
};

export default ProductCard9List;
