import Link from "next/link";
import { FC, Fragment } from "react";
import styled from "styled-components";
import Box from "@component/Box";
import { Chip } from "@component/Chip";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import LazyImage from "@component/LazyImage";
import { H3, Span } from "@component/Typography";
import { calculateDiscount, createLocalStorage, currency } from "@utils/utils";
import { useAppContext } from "@context/AppContext";
import Shop from "@models/shop.model";

// styled components
const StyledCard = styled(Box)(({ theme }) => ({
  height: "100%",
  margin: "auto",
  borderRadius: 0,
  overflow: "hidden",
  position: "relative",
  transition: "all 250ms ease-in-out",
  outline: `2px solid ${theme.colors.gray[200]}`,
  "&:hover": {
    boxShadow: theme.shadows[4],
    "& .controlBox": { display: "block" },
  },
}));

const ImgBox = styled(Box)(({ theme }) => ({
  background: theme.colors.primary[50],
}));

const ContentWrapper = styled(Box)({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
});

const StatusChipBox = styled(Box)(({ theme }) => ({
  width: 40,
  height: 42,
  zIndex: 11,
  top: "0px",
  right: "30px",
  fontSize: "12px",
  position: "absolute",
  backgroundColor: theme.colors.primary.main,
  "& .triangle-left": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderLeft: `20px solid ${theme.colors.primary.main}`,
  },
  "& .triangle-right": {
    width: 0,
    height: 0,
    borderTop: "0px solid transparent",
    borderBottom: "10px solid transparent",
    borderRight: `20px solid ${theme.colors.primary.main}`,
  },
}));

const StatusChip = styled(Span)({
  color: "#fff",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ColorBox = styled(FlexBox)(({ theme }) => ({
  gap: 8,
  padding: "10px 5px",
  "& span": {
    width: 12,
    height: 12,
    borderRadius: 8,
    "&:hover": {
      cursor: "pointer",
      outline: `2px solid ${theme.colors.gray[200]}`,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: 32,
  maxHeight: 32,
  borderRadius: 0,
  transition: "all 0.3s",
  color: theme.colors.primary.main,
  borderColor: theme.colors.primary.main,
  "& svg path": { fill: `${theme.colors.primary.main} !important` },
  "&:hover": {
    color: "#fff",
    background: theme.colors.primary.main,
    border: `1px solid ${theme.colors.primary.main}`,
    "& svg path": { fill: `white !important` },
  },
}));

// =====================================================================
interface Props {
  off: number;
  slug: string;
  name: string;
  price: number;
  mainImageUrl: string;
  status: string;
  shop: Shop;
  rating?: number;
  id: string | number;
  productColors: string[];
}
// =====================================================================

const ProductCard13: FC<Props> = (props) => {
  const [saveCartState] = createLocalStorage("cartState");
  const {
    off,
    status,
    id,
    name,
    price,
    mainImageUrl,
    rating,
    productColors,
    slug,
    shop,
  } = props;

  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.slug === slug);

  const handleCartAmountChange = (quantity: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        mainImageUrl,
        id,
        quantity,
        slug,
        name,
        shopId: shop.id,
      },
    });

    saveCartState(state.cart);
  };

  return (
    <StyledCard>
      <Link href={`/product/${slug}`}>
        <ImgBox id="imgBox">
          {status && (
            <StatusChipBox>
              <StatusChip>{status}</StatusChip>
              <Box width="100%" display="flex">
                <Box className="triangle-left" />
                <Box className="triangle-right" />
              </Box>
            </StatusChipBox>
          )}

          {!!off && (
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

          <LazyImage
            width={100}
            height={100}
            src={mainImageUrl}
            id="productImg"
            layout="responsive"
            objectFit="contain"
          />
        </ImgBox>
      </Link>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${slug}`}>
              <H3
                mb={1}
                title={name}
                fontSize="24px"
                fontWeight="700"
                className="title"
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

            <ColorBox>
              {productColors.map((color, ind) => (
                <Span key={ind} style={{ background: color }} />
              ))}
            </ColorBox>

            <FlexBox alignItems="center" mt={0.5}>
              <Box fontWeight="600" color="primary.main" mr=".5rem">
                {calculateDiscount(price, off)}
              </Box>

              {off > 0 && (
                <Box color="grey.600" fontWeight="600">
                  <del>{currency(price)}</del>
                </Box>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={cartItem?.quantity ? "space-between" : "flex-start"}
          >
            <StyledButton
              variant="outlined"
              onClick={handleCartAmountChange((cartItem?.quantity || 0) + 1)}
            >
              <Icon variant="small">plus</Icon>
            </StyledButton>

            {cartItem?.quantity && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem.quantity}
                </Box>

                <StyledButton
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem.quantity - 1)}
                >
                  <Icon variant="small">minus</Icon>
                </StyledButton>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledCard>
  );
};

export default ProductCard13;
