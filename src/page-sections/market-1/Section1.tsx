import { FC, Fragment } from "react";
import Box from "@component/Box";
import Container from "@component/Container";
import Navbar from "@component/navbar/Navbar";
import { Carousel } from "@component/carousel";
import { CarouselCard1 } from "@component/carousel-cards";
import MainCarouselItem from "@models/market-1.model";
import { useAppContext } from "@context/AppContext";

// ======================================================
type Props = { carouselData: MainCarouselItem[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData }) => {
  const { state } = useAppContext();

  const primaryColor = state.shop?.primaryColorHex || null;

  return (
    <Fragment>
      <Navbar navListOpen={true} />

      <Box bg="gray.white" mb="3.75rem">
        <Container pb="2rem">
          <Carousel
            spacing="0px"
            infinite={true}
            autoPlay={true}
            showDots={true}
            visibleSlides={1}
            showArrow={false}
            dotColor={primaryColor}
            totalSlides={carouselData.length}
          >
            {carouselData.map((item, index) => (
              <CarouselCard1
                key={index}
                title={item.title}
                image={item.mainImageUrl}
                buttonText={item.buttonText}
                description={item.description}
              />
            ))}
          </Carousel>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Section1;
