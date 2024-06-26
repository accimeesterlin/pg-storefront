import { FC, useEffect, useState } from "react";
import Box from "@component/Box";
import { Carousel } from "@component/carousel";
import { ProductCard1 } from "@component/product-cards";
import CategorySectionCreator from "@component/CategorySectionCreator";
import useWindowSize from "@hook/useWindowSize";
import Product from "@models/product.model";

// =============================================================
type Props = { products: Product[]; title?: string };
// =============================================================

const Section2: FC<Props> = ({ products, title }) => {
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const isProductGreaterThanFive = products?.length > 5;

  return (
    <CategorySectionCreator
      iconName="light"
      title={title || "Flash Deals"}
      seeMoreLink={isProductGreaterThanFive ? "#" : null}
    >
      <Box mt="-0.25rem" mb="-0.25rem">
        <Carousel
          totalSlides={products?.length}
          visibleSlides={visibleSlides}
          showArrow={isProductGreaterThanFive}
        >
          {products.map((item, ind) => (
            <Box py="0.25rem" key={ind}>
              <ProductCard1
                key={ind}
                id={item.id}
                slug={item.slug}
                price={item.price}
                name={item.title || item.name}
                off={item.comparePrice}
                images={item.images}
                mainImageUrl={item.mainImageUrl}
                rating={item.rating || 4}
              />
            </Box>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default Section2;
