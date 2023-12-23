import { FC, useEffect, useState } from "react";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import { ProductCard17 } from "@component/product-cards";
import { Carousel, CarouselWrapper } from "@component/carousel";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// ======================================================================
type Section4Props = { products: Product[] };
// ======================================================================

const Section4: FC<Section4Props> = ({ products }: any) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  let category: any = {};
  let reviews: any = [];

  if (products?.categories?.length > 0) {
    [category] = products?.categories;
  }
  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Best Selling Product
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
              category={category}
              reviews={reviews.length || 4}
            />
          ))}
        </Carousel>
      </CarouselWrapper>
    </Container>
  );
};

export default Section4;
