import { FC, useEffect, useState } from "react";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard17 } from "@component/product-cards";
import { Carousel, CarouselWrapper } from "@component/carousel";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// ======================================================================
type Section6Props = { products: Product[] };
// ======================================================================

const Section6: FC<Section6Props> = ({ products }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  const reviews = [];

  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Featured Products
      </H2>

      <CarouselWrapper>
        <Carousel totalSlides={products?.length} visibleSlides={visibleSlides}>
          {products.map((product) => (
            <ProductCard17
              id={product.id}
              key={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              images={product.images}
              mainImageUrl={product.mainImageUrl}
              category={product.categories[0]}
              reviews={reviews.length || 21}
            />
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default Section6;
