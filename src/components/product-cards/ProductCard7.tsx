import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { useAppContext } from "@context/AppContext";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import Typography from "@component/Typography";
import { IconButton } from "@component/buttons";
import { createLocalStorage, currency, getTheme } from "@utils/utils";
import Shop from "@models/shop.model";

// styled component
const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: ${getTheme("shadows.4")};
  background-color: ${getTheme("colors.body.paper")};

  .product-details {
    padding: 20px;
  }
  .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media only screen and (max-width: 425px) {
    flex-wrap: wrap;
    img {
      height: auto;
      min-width: 100%;
    }
    .product-details {
      // padding: 1rem;
    }
  }
  ${space}
`;

// =====================================================================
interface ProductCard7Props extends SpaceProps {
  quantity: number;
  name: string;
  slug: string;
  price: number;
  mainImageUrl?: string;
  shop: Shop;
  id: string | number;
}
// =====================================================================

const ProductCard7: FC<ProductCard7Props> = (props) => {
  const [saveCartState] = createLocalStorage("cartState");
  const { id, name, quantity, price, mainImageUrl, slug, shop, ...others } =
    props;

  const { dispatch, state } = useAppContext();
  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        quantity: amount,
        name,
        price,
        mainImageUrl,
        id,
        shopId: shop.id,
      },
    });

    saveCartState(state.cart);
  };

  return (
    <Wrapper {...others}>
      <Image
        size={140}
        alt={name}
        display="block"
        src={mainImageUrl || "/assets/images/products/iphone-xi.png"}
      />

      <FlexBox
        width="100%"
        minWidth="0px"
        flexDirection="column"
        className="product-details"
        justifyContent="space-between"
      >
        <Link href={`/product/${slug}`}>
          <Typography
            className="title"
            fontWeight="600"
            fontSize="18px"
            mb="0.5rem"
          >
            {name}
          </Typography>
        </Link>

        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            padding="4px"
            ml="12px"
            size="small"
            onClick={handleCartAmountChange(0)}
          >
            <Icon size="1.25rem">close</Icon>
          </IconButton>
        </Box>

        <FlexBox justifyContent="space-between" alignItems="flex-end">
          <FlexBox flexWrap="wrap" alignItems="center">
            <Typography color="gray.600" mr="0.5rem">
              {currency(price)} x {quantity}
            </Typography>

            <Typography fontWeight={600} color="primary.main" mr="1rem">
              {currency(price * quantity)}
            </Typography>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              disabled={quantity === 1}
              borderColor="primary.light"
              onClick={handleCartAmountChange(quantity - 1)}
            >
              <Icon variant="small">minus</Icon>
            </Button>

            <Typography mx="0.5rem" fontWeight="600" fontSize="15px">
              {quantity}
            </Typography>

            <Button
              size="none"
              padding="5px"
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              onClick={handleCartAmountChange(quantity + 1)}
            >
              <Icon variant="small">plus</Icon>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ProductCard7;
