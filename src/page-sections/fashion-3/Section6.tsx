import { FC } from "react";
import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard17 } from "@component/product-cards";
import Product from "@models/product.model";

// =========================================
type Section6Props = { products: Product[] };
// =========================================

const Section6: FC<Section6Props> = ({ products }) => {
  const reviews = [];
  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Featured Products
      </H2>

      <Grid container spacing={5}>
        {products.map((product, i) => (
          <Grid item md={3} sm={6} xs={12} key={product.id + i}>
            <ProductCard17
              id={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              images={product.images}
              mainImageUrl={product.mainImageUrl}
              category={product.categories[0]}
              reviews={reviews.length || 5}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section6;
