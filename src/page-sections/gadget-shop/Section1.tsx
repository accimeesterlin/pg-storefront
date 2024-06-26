import { FC } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import { Carousel } from "@component/carousel";
import { ProductCard11 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { Card1, Card4 } from "./showcase-cards";
import useVisibleSilde from "./hooks/useVisibleSilde";
import Product from "@models/product.model";

const ARROW_BUTTON_STYLE = {
  boxShadow: "none",
  background: "transparent",
};

// =================================================================
type Props = { topPickList: Product[]; mainCarousel: Product[] };
// =================================================================

const Section1: FC<Props> = ({ topPickList, mainCarousel }) => {
  const { visibleSlides } = useVisibleSilde();
  const TOTAL_SLIDES = topPickList.length;

  return (
    <CategorySectionCreator>
      <Grid container spacing={6}>
        {/* INTRODUCE NEW WINTER CAROUSEL AREA */}
        <Grid item md={5} xs={12}>
          <Carousel
            totalSlides={3}
            visibleSlides={1}
            arrowButtonColor="inherit"
            leftButtonStyle={{ ...ARROW_BUTTON_STYLE, left: 8 }}
            rightButtonStyle={{ ...ARROW_BUTTON_STYLE, right: 8 }}
          >
            {mainCarousel.map((item) => (
              <Card1
                key={item.id}
                title={item.name}
                price={item.price}
                mainImageUrl={item.mainImageUrl}
                comparePrice={item.comparePrice}
              />
            ))}
          </Carousel>
        </Grid>

        <Grid item md={7} xs={12}>
          {/* TOP PICKS PRODUCTS CAROUSEL AREA */}
          <Box mb="3rem">
            <H2 mb="1.5rem">Top Picks</H2>

            <Carousel
              arrowButtonColor="inherit"
              totalSlides={TOTAL_SLIDES}
              visibleSlides={visibleSlides}
            >
              {topPickList.map((item) => (
                <ProductCard11
                  key={item.id}
                  slug={item.slug}
                  price={item.price}
                  name={item.name}
                  off={item.comparePrice}
                  rating={item.rating}
                  mainImageUrl={item.mainImageUrl}
                />
              ))}
            </Carousel>
          </Box>

          {/* CONVERSE COLLECTION BANNER AREA */}
          <Card4 />

          {/* CAROUSEL PRODUCTS AREA */}
          <Carousel
            arrowButtonColor="inherit"
            totalSlides={TOTAL_SLIDES}
            visibleSlides={visibleSlides}
          >
            {topPickList.map((item) => (
              <ProductCard11
                key={item.id}
                slug={item.slug}
                price={item.price}
                name={item.name}
                off={item.comparePrice}
                rating={item.rating}
                mainImageUrl={item.mainImageUrl}
              />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </CategorySectionCreator>
  );
};

export default Section1;
