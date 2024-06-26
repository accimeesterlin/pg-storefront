import Link from "next/link";
// import Image from "next/legacy/image";
import isEmpty from "lodash.isempty";
import { FC, Fragment, useCallback, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "@context/AppContext";
import Box from "@component/Box";
// import Rating from "@component/rating";
import { Chip } from "@component/Chip";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Card, { CardProps } from "@component/Card";
import { H3, SemiSpan } from "@component/Typography";
import {
  calculateRemainingPercentage,
  createLocalStorage,
  currency,
  getTheme,
} from "@utils/utils";
import { deviceSize } from "@utils/constants";
import ProductQuickView from "@component/products/ProductQuickView";
import Shop from "@models/shop.model";
import CloudinaryResizedImage from "@component/cloudinaryResizeImage";
import useIsMobile from "@hook/useIsMobile";

// styled component
const Wrapper = styled(Card)`
  margin: auto;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  transition: all 250ms ease-in-out;

  &:hover {
    .details {
      .add-cart {
        display: flex;
      }
    }
    .image-holder {
      .extra-icons {
        display: block;
      }
    }
  }

  .image-holder {
    text-align: center;
    position: relative;
    display: inline-block;
    height: 100%;

    .extra-icons {
      z-index: 2;
      top: 0.75rem;
      display: none;
      right: 0.75rem;
      cursor: pointer;
      position: absolute;
    }

    @media only screen and (max-width: ${deviceSize.sm}px) {
      display: block;
    }
  }

  .details {
    padding: 1rem;

    .title,
    .categories {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icon-holder {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      justify-content: space-between;
    }

    .favorite-icon {
      cursor: pointer;
    }
    .outlined-icon {
      svg path {
        fill: ${getTheme("colors.text.hint")};
      }
    }
    .add-cart {
      display: none;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    }
  }

  @media only screen and (max-width: 768px) {
    .details {
      .add-cart {
        display: flex;
      }
    }
  }
`;

// =======================================================================
interface ProductCard1Props extends CardProps {
  off?: number;
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  mainImageUrl: string;
  rating: number;
  shop?: Shop;
  images: any[];
  id?: string | number;
}
// =======================================================================

const ProductCard1: FC<ProductCard1Props> = ({
  id,
  off,
  slug,
  name,
  price,
  comparePrice,
  mainImageUrl,
  images,
  rating = 4,
  shop,
  ...props
}) => {
  const [saveCartState] = createLocalStorage("cartState");
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const isMobile = useIsMobile();
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        slug,
        price: off || price,
        mainImageUrl: mainImageUrl,
        name,
        shopId: shop?.id,
        quantity: amount,
      },
    });

    saveCartState(state.cart);
  };

  const isSame = off === price || isEmpty(comparePrice);

  return (
    <>
      <Wrapper {...props}>
        <div className="image-holder">
          {!isSame && (
            <Chip
              top="10px"
              left="10px"
              p="5px 10px"
              fontSize="10px"
              fontWeight="600"
              bg="primary.main"
              position="absolute"
              color="primary.text"
              zIndex={1}
            >
              {calculateRemainingPercentage(off, comparePrice)}% off
            </Chip>
          )}

          <FlexBox className="extra-icons">
            <Icon
              color="secondary"
              variant="small"
              mb="0.5rem"
              onClick={toggleDialog}
            >
              eye-alt
            </Icon>

            <Icon className="favorite-icon outlined-icon" variant="small">
              heart
            </Icon>
          </FlexBox>

          <Link href={`/product/${id}`}>
            <CloudinaryResizedImage
              imageUrl={mainImageUrl}
              width={isMobile ? 400 : 282}
              height={274}
            />
            {/* <img
              alt={name}
              width={282}
              src={mainImageUrl}
              // height={105}
              // objectFit="cover"
              // layout="responsive"
            /> */}
          </Link>
        </div>

        <div className="details">
          <FlexBox>
            <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
              <Link href={`/product/${id}`}>
                <H3
                  mb="10px"
                  title={name}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="title"
                  color="text.secondary"
                >
                  {name}
                </H3>
              </Link>

              {/* <Rating value={rating || 0} outof={5} color="warn" readonly /> */}

              <FlexBox alignItems="center" mt="10px">
                <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                  {currency(price)}
                </SemiSpan>

                {!isSame && (
                  <SemiSpan color="text.muted" fontWeight="600">
                    <del>{currency(price)}</del>
                  </SemiSpan>
                )}
              </FlexBox>
            </Box>

            <FlexBox
              width="30px"
              alignItems="center"
              flexDirection="column-reverse"
              justifyContent={
                !!cartItem?.quantity ? "space-between" : "flex-start"
              }
            >
              <Button
                size="none"
                padding="3px"
                color="primary"
                variant="outlined"
                borderColor="primary.light"
                onClick={handleCartAmountChange((cartItem?.quantity || 0) + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>

              {!!cartItem?.quantity && (
                <Fragment>
                  <SemiSpan color="text.primary" fontWeight="600">
                    {cartItem.quantity}
                  </SemiSpan>

                  <Button
                    size="none"
                    padding="3px"
                    color="primary"
                    variant="outlined"
                    borderColor="primary.light"
                    onClick={handleCartAmountChange(cartItem.quantity - 1)}
                  >
                    <Icon variant="small">minus</Icon>
                  </Button>
                </Fragment>
              )}
            </FlexBox>
          </FlexBox>
        </div>
      </Wrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ images, name, price, id, slug, shop }}
      />
    </>
  );
};

export default ProductCard1;
