import { FC } from "react";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Pagination from "@component/pagination";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import Product from "@models/product.model";

// ==========================================================
type Props = { products: Product[] };
// ==========================================================

const ProductCard1List: FC<Props> = ({ products }) => {
  return (
    <div>
      <Grid container spacing={6}>
        {products?.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={Number(item.price)}
              name={item.name}
              off={Number(item.comparePrice)}
              images={item.images}
              mainImageUrl={`${item.mainImageUrl}`}
              rating={item.rating || 4}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
        <SemiSpan>Showing 1-4 of {products?.length} Products</SemiSpan>
        <Pagination pageCount={products?.length} />
      </FlexBox>
    </div>
  );
};

export default ProductCard1List;
