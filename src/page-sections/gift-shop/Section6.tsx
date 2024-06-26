import { FC } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import { ProductCard15 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { theme } from "@utils/theme";
import Product from "@models/product.model";

// ===============================================
type Props = { products: Product[] };
// ===============================================

const Section6: FC<Props> = ({ products }) => {
  return (
    <CategorySectionCreator title="All Products" seeMoreLink="#">
      <Grid container mb={-0.5} spacing={5}>
        {products.map((item) => (
          <Grid key={item.id} item lg={3} md={4} sm={6} xs={12}>
            <ProductCard15
              id={item.id}
              slug={item.slug}
              name={item.name}
              price={item.price}
              off={item.comparePrice}
              rating={item.rating}
              images={item.images}
              mainImageUrl={item.mainImageUrl}
            />
          </Grid>
        ))}
      </Grid>

      <Box mt={5} display="flex" justifyContent="center">
        <Button
          color="primary"
          variant="contained"
          style={{ backgroundColor: theme.colors.marron.main }}
        >
          Load More...
        </Button>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section6;
