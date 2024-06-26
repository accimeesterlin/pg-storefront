import Link from "next/link";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import LazyImage from "@component/LazyImage";
import { H3, Span } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { theme } from "@utils/theme";
import { useAppContext } from "@context/AppContext";
import { calculateDiscount, createLocalStorage, currency } from "@utils/utils";
import Shop from "@models/shop.model";

// styled components
const Wrapper = styled("div")`
  height: 100%;
  margin: auto;
  display: flex;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageWrapper = styled(Box)({
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  "&:hover": {
    "& .hoverButtonBox": { opacity: 1 },
    "& .hoverImgBox": { filter: "blur(5px)" },
  },
});

const HoverButtonBox = styled(Box)({
  opacity: 0,
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: ".5s ease",
  transform: "translate(-50%, -50%)",
  "& .buttonBox": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    "& .addCartButton": {
      bottom: 20,
      margin: "auto",
      padding: "4px 14px",
      position: "absolute",
      "& svg": { fontSize: 16 },
    },
  },
});

const ImageBox = styled(Box)({
  opacity: 1,
  padding: "44px 40px",
  background: "#F5F5F5",
  transition: "all .3s ease",
});

const ItemController = styled(FlexBox)({
  background: "#fff",
  overflow: "hidden",
  borderRadius: "5px",
  boxShadow: theme.shadows[2],
  "& span": {
    width: "100%",
    height: "100%",
    display: "flex",
    padding: "6px 12px",
    alignItems: "center",
    "&:hover": { cursor: "pointer", background: "#f3f5f9" },
  },
  "& svg": { fontSize: 22, color: theme.colors.gray[600] },
});

const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .name, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

// =============================================================
type ProductCard12Props = {
  id: string;
  off?: number;
  slug: string;
  name: string;
  price: number;
  mainImageUrl: string;
  rating: number;
  shop?: Shop;
  images: string[];
};
// =============================================================

const ProductCard12: FC<ProductCard12Props> = (props) => {
  const [saveCartState] = createLocalStorage("cartState");
  const { off, name, price, mainImageUrl, rating, slug, id, images, shop } =
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
      <ImageWrapper>
        {off !== 0 && (
          <Chip
            top="10px"
            zIndex={1}
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

        <ImageBox className="hoverImgBox">
          <Link href={`/product/${slug}`}>
            <LazyImage
              alt={name}
              width={190}
              height={190}
              src={mainImageUrl}
              layout="responsive"
              objectFit="contain"
            />
          </Link>
        </ImageBox>

        <HoverButtonBox className="hoverButtonBox">
          <Box className="buttonBox">
            <ItemController>
              <Span onClick={toggleDialog}>
                <Icon variant="small">eye-alt</Icon>
              </Span>

              <Span>
                <Icon variant="small">heart</Icon>
              </Span>

              <Span onClick={handleCartAmountChange(1)}>
                <Icon variant="small">shopping-cart</Icon>
              </Span>
            </ItemController>

            <Button
              color="primary"
              variant="outlined"
              borderColor="primary.light"
              className="addCartButton"
              onClick={handleCartAmountChange(
                cartItem?.quantity ? cartItem?.quantity - 1 : 1
              )}
            >
              {cartItem?.quantity ? (
                <>
                  <Icon variant="small" mr={1}>
                    minus
                  </Icon>{" "}
                  Remove from Cart
                </>
              ) : (
                <>
                  <Icon variant="small" mr={1}>
                    plus
                  </Icon>{" "}
                  Add to Cart
                </>
              )}
            </Button>
          </Box>
        </HoverButtonBox>
      </ImageWrapper>

      <ContentWrapper>
        <Link href={`#`}>
          <H3
            mb={1}
            name={name}
            fontSize="14px"
            fontWeight="600"
            className="name"
            color="text.secondary"
          >
            {name}
          </H3>
        </Link>

        {rating && (
          <Box display="flex" alignItems="center">
            <Rating value={rating || 0} color="warn" />{" "}
            <Span sx={{ color: "grey.600" }} ml={1}>{`(${rating}.0)`}</Span>
          </Box>
        )}

        <FlexBox alignItems="center" mt={0.5}>
          <Box fontWeight="600" color="primary.main" mr={2}>
            {calculateDiscount(price, off)}
          </Box>

          {off !== 0 && (
            <Box color="grey.600" fontWeight="600">
              <del>{currency(price)}</del>
            </Box>
          )}
        </FlexBox>
      </ContentWrapper>

      <ProductQuickView
        open={open}
        onClose={toggleDialog}
        product={{ id, images, slug, price, name, shop }}
      />
    </Wrapper>
  );
};

export default ProductCard12;
