import Link from "next/link";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H1, H2, H3, H6, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { createLocalStorage, currency } from "@utils/utils";
import Shop from "@models/shop.model";

// ========================================
type ProductIntroProps = {
  price: number;
  rating: number;
  mainImageUrl?: string;
  shop: Shop;
  name: string;
  images: any[];
  id: string | number;
};
// ========================================

const ProductIntro: FC<ProductIntroProps> = ({
  images,
  name,
  price,
  id,
  shop,
  mainImageUrl,
}) => {
  const [saveCartState] = createLocalStorage("cartState");
  const [isPGPayLoading, setIsPGPayLoading] = useState(false);
  const [isMonCashLoading, setIsMonCashLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);

  const routerId = router.query.id as string;
  const cartItem = state.cart.find(
    (item) => item.id === id || item.id === routerId
  );

  const handleImageClick = (ind: number) => () => setSelectedImage(ind);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: name,
        mainImageUrl: images[0]?.url,
        shopId: shop?.id,
        id: id || routerId,
      },
    });

    saveCartState(state.cart);
  };

  const handlePGPay = () => {
    setIsPGPayLoading(true);
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: "pgpay",
    })
    router?.push("/checkout")
  }


  const handleCrypto = () => {
    setIsPGPayLoading(true);
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: "crypto",
    })
    router?.push("/checkout")
  }

  const handleMonCash = () => {
    setIsMonCashLoading(true);
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: "moncash",
    })
    router?.push("/checkout")
  }

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <Box>
            <FlexBox justifyContent="center" mb="50px">
              <Image
                width={300}
                height={300}
                src={
                  images?.length >= 0
                    ? images[selectedImage]?.url
                    : mainImageUrl
                }
                style={{ objectFit: "contain" }}
              />
            </FlexBox>

            <FlexBox overflow="auto">
              {images?.map((image, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  minWidth={70}
                  display="flex"
                  cursor="pointer"
                  border="1px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  ml={ind === 0 && "auto"}
                  mr={ind === images?.length - 1 ? "auto" : "10px"}
                  borderColor={
                    selectedImage === ind ? "primary.main" : "gray.400"
                  }
                  onClick={handleImageClick(ind)}
                >
                  <Avatar src={image?.url} borderRadius="10px" size={40} />
                </Box>
              ))}
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H1 mb="1rem">{name}</H1>

          {/* <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Brand:</SemiSpan>
            <H6 ml="8px">Ziaomi</H6>
          </FlexBox> */}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Rated:</SemiSpan>
            <Box ml="8px" mr="8px">
              <Rating color="warn" value={4} outof={5} />
            </Box>
            <H6>(50)</H6>
          </FlexBox>

          <Box mb="24px">
            <H2 color="primary.main" mb="4px" lineHeight="1">
              {currency(price)}
            </H2>

            <SemiSpan color="inherit">Stock Available</SemiSpan>
          </Box>

          {!cartItem?.qty ? (
            <Button
              mb="36px"
              size="small"
              color="primary"
              variant="contained"
              onClick={handleCartAmountChange(1)}
            >
              Add to Cart
            </Button>
          ) : (
            <FlexBox alignItems="center" mb="36px">
              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty - 1)}
              >
                <Icon variant="small">minus</Icon>
              </Button>

              <H3 fontWeight="600" mx="20px">
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button
                p="9px"
                size="small"
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(cartItem?.qty + 1)}
              >
                <Icon variant="small">plus</Icon>
              </Button>
            </FlexBox>
          )}

          <FlexBox alignItems="center" mb="1rem">
            <SemiSpan>Sold By:</SemiSpan>
            <Link href="/shops/scarlett-beauty">
              <a>
                <H6 lineHeight="1" ml="8px">
                  {shop?.name}
                </H6>
              </a>
            </Link>
          </FlexBox>
          <FlexBox alignItems="center">
            <Button
              p="9px"
              size="small"
              color="primary"
              loading={isPGPayLoading}
              variant="contained"
              onClick={handleCrypto}
            >
              Pay now with Crypto
            </Button>
{/* 
            <Button
              p="9px"
              size="small"
              color="primary"
              loading={isPGPayLoading}
              variant="contained"
              onClick={handlePGPay}
            >
              Pay now with PG Pay
            </Button>
            <Button
              p="9px"
              ml="10px"
              size="small"
              loading={isMonCashLoading}
              color="primary"
              variant="outlined"
              onClick={handleMonCash}
            >
              Pay now with Mon Cash
            </Button> */}
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
