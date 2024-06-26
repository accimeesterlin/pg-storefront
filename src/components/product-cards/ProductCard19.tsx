import { FC, useState, Fragment } from "react";
import Link from "next/link";
import Image from "next/legacy/image";
import styled from "styled-components";
import Box from "@component/Box";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { IconButton } from "@component/buttons";
import { H4, Paragraph, Small } from "@component/Typography";
import ProductQuickView from "@component/products/ProductQuickView";
import { theme } from "@utils/theme";
import { createLocalStorage, currency } from "@utils/utils";
import { useAppContext } from "@context/AppContext";
import Shop from "@models/shop.model";

// styled components
const CardBox = styled(Box)({
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: "white",
  border: `1px solid ${theme.colors.gray[100]}`,
  ":hover": {
    border: "1px solid #000",
    "& .product-actions": { right: 5 },
    "& img": { transform: "scale(1.1)" },
  },
});

const CardMedia = styled(Box)({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": { transition: "0.3s" },
});

const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
  background: "transparent",
});

const FavouriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  background: "transparent",
  transition: "right 0.3s .2s",
});

// ==============================================================
type ProductCard19Props = {
  img: string;
  name: string;
  slug: string;
  price: number;
  shop?: Shop;
  reviews: number;
  images: string[];
  id: string | number;
};
// ==============================================================

const ProductCard19: FC<ProductCard19Props> = (props) => {
  const [saveCartState] = createLocalStorage("cartState");
  const { img, name, price, reviews, id, slug, images, shop } = props;

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const cartItem = state.cart.find((item) => item.slug === slug);

  // handle favourite
  const handleFavorite = () => setIsFavorite((fav) => !fav);

  //   handle modal
  const toggleDialog = () => setOpenDialog((state) => !state);

  // handle add to cart
  const handleAddToCart = () => {
    const payload = {
      id,
      slug,
      name,
      price,
      mainImageUrl: img,
      shopId: shop?.id,
      quantity: (cartItem?.quantity || 0) + 1,
    };

    dispatch({ type: "CHANGE_CART_AMOUNT", payload });

    saveCartState(state.cart);
  };

  return (
    <Fragment>
      <CardBox height="100%">
        <CardMedia>
          <Link href={`/product/${slug}`}>
            <Image
              src={img}
              width={300}
              height={300}
              alt="category"
              objectFit="cover"
              layout="responsive"
              className="product-img"
            />
          </Link>

          <AddToCartButton
            className="product-actions"
            onClick={() => setOpenDialog(true)}
          >
            <Icon size="18px">eye</Icon>
          </AddToCartButton>

          <FavouriteButton className="product-actions" onClick={handleFavorite}>
            {isFavorite ? (
              <Icon size="18px">heart-filled</Icon>
            ) : (
              <Icon size="18px">heart</Icon>
            )}
          </FavouriteButton>
        </CardMedia>

        <Box p={2} textAlign="center">
          <Paragraph>{name}</Paragraph>
          <H4 fontWeight={700} py=".5rem">
            {currency(price)}
          </H4>

          <FlexBox justifyContent="center" alignItems="center" mb="1rem">
            <Rating value={4} color="warn" size="small" />
            <Small fontWeight={600} color="gray.500" ml=".3rem">
              ({reviews})
            </Small>
          </FlexBox>

          <Button
            fullwidth
            color="dark"
            variant="outlined"
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </Box>
      </CardBox>

      {/* QUICK VIEW MODAL */}
      <ProductQuickView
        open={openDialog}
        onClose={toggleDialog}
        product={{ id, images, price, slug, name, shop }}
      />
    </Fragment>
  );
};

export default ProductCard19;
