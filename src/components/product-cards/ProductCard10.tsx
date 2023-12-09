import { FC, Fragment, useCallback, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";
import styled from "styled-components";
import Box from "../Box";
import Card from "../Card";
import { Chip } from "../Chip";
import Icon from "../icon/Icon";
import FlexBox from "../FlexBox";
import { Button } from "../buttons";
import { H3, SemiSpan } from "../Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { deviceSize } from "@utils/constants";
import { useAppContext } from "@context/AppContext";
import {
  calculateDiscount,
  createLocalStorage,
  currency,
  getTheme,
} from "@utils/utils";
import Shop from "@models/shop.model";

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
    display: inlin-block;

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

    .name,
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

// ======================================================================
type ProductCard10Props = {
  off: number;
  slug: string;
  unit: string;
  name: string;
  price: number;
  mainImageUrl: string;
  rating: number;
  shop?: Shop;
  images: string[];
  id: string | number;
};
// ======================================================================

const ProductCard10: FC<ProductCard10Props> = (props) => {
  const [saveCartState] = createLocalStorage("cartState");
  const { id, off, unit, slug, name, price, mainImageUrl, images, shop } =
    props;

  const [open, setOpen] = useState(false);
  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === id);

  const toggleDialog = useCallback(() => setOpen((open) => !open), []);

  const handleCartAmountChange = (quantity: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        mainImageUrl,
        id,
        quantity,
        slug,
        name: name,
        shopId: shop?.id,
      },
    });

    saveCartState(state.cart);
  };

  return (
    <Wrapper>
      <div className="image-holder">
        {off && (
          <Chip
            top="10px"
            left="10px"
            p="5px 10px"
            fontSize="10px"
            fontWeight="600"
            bg="primary.main"
            position="absolute"
            color="primary.text"
          >
            {off}% off
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

        <Link href={`/product/${slug}`}>
          <a>
            <NextImage
              src={mainImageUrl}
              width={100}
              height={100}
              layout="responsive"
              alt={name}
            />
          </a>
        </Link>
      </div>

      <div className="details">
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr="0.5rem">
            <Link href={`/product/${slug}`}>
              <a>
                <H3
                  mb="6px"
                  name={name}
                  fontSize="14px"
                  textAlign="left"
                  fontWeight="600"
                  className="name"
                  color="text.secondary"
                >
                  {name}
                </H3>
              </a>
            </Link>

            <SemiSpan>{unit || "300ml"}</SemiSpan>

            <FlexBox alignItems="center" mt="6px">
              <SemiSpan pr="0.5rem" fontWeight="600" color="primary.main">
                {calculateDiscount(price, off)}
              </SemiSpan>

              {off && (
                <SemiSpan color="text.muted" fontWeight="600">
                  <del>{currency(off)}</del>
                </SemiSpan>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            flexDirection="column-reverse"
            justifyContent={!!cartItem ? "space-between" : "flex-start"}
          >
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              onClick={handleCartAmountChange((cartItem?.quantity || 0) + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>

            {cartItem?.quantity && (
              <Fragment>
                <SemiSpan color="text.primary" fontWeight="600">
                  {cartItem.quantity}
                </SemiSpan>

                <Button
                  size="none"
                  padding="5px"
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

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, slug, price, name, shop }}
      />
    </Wrapper>
  );
};

export default ProductCard10;
