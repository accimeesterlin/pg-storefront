import { FC, Fragment, useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import isEmpty from "lodash.isempty";
// import Icon from "@component/icon/Icon";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
// import api from "@utils/__api__/pgpay";
import { createLocalStorage } from "@utils/utils";
import { getGlobalSetting } from "@utils/__api__/global-settings";
import { createCheckoutSession } from "@utils/__api__/checkout";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { currency, getTotalPrice } from "@utils/utils";
// import { clearLocalStorageKeys } from "@utils/utils";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { GetServerSideProps } from "next";
import marketApi from "@utils/__api__/market-1";
import {
  getShopById,
  getShopMenus,
  getShopFooterMenus,
} from "@utils/__api__/shops";
import Shop from "@models/shop.model";
import categoryApi from "@utils/__api__/category";
import Grid from "@component/grid/Grid";
import { GlobalSetting } from "@models/globalSetting.model";
import Category from "@models/category.model";
// import { StyledMiniCart } from "@component/mini-cart/styles";

type Props = {
  shop: Shop;
  menus: any[];
  footerMenus: any[];
  categories: Category[];
  globalSetting: GlobalSetting;
  homeMenus: any[];
};

const PaymentReview = (props: Props) => {
  const router = useRouter();
  const [, getCheckout] = createLocalStorage("checkoutData");
  const { state, dispatch } = useAppContext();
  const paymentMethod = state?.checkout?.paymentMethod;

  const shop = props?.shop;
  const menus = props?.menus;
  const footerMenus = props?.footerMenus;
  const globalSetting = props?.globalSetting;
  const address = state.checkout?.address;
  const categories = props?.categories;
  const homeMenus = props?.homeMenus;

  useEffect(() => {
    if (shop) {
      dispatch({ type: "SET_SHOP", payload: shop });
    }

    if (menus) {
      dispatch({ type: "SET_NAVIGATION_MENU", payload: menus });
    }

    if (footerMenus) {
      dispatch({ type: "SET_FOOTER_MENU", payload: footerMenus });
    }

    if (categories) {
      dispatch({ type: "SET_CATEGORY", payload: categories });
    }

    if (homeMenus) {
      dispatch({ type: "SET_HOME_MENU", payload: homeMenus });
    }
  }, [shop, menus, footerMenus, categories, homeMenus]);

  useEffect(() => {
    const savedCheckoutData: any = getCheckout("checkoutData");

    if (isEmpty(savedCheckoutData?.address) && isEmpty(address)) {
      navigateBackToCheckout();
    }
  }, [address]);

  useEffect(() => {
    if (globalSetting) {
      dispatch({ type: "SET_GLOBAL_SETTING", payload: globalSetting });
    }
  }, [globalSetting]);

  const navigateBackToCheckout = () => {
    if (!paymentMethod) {
      return router?.push("/payment");
    }
  };

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <Card1 mb="2rem">
          <MiniCart />
        </Card1>
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <Card1>
          <H5 mb="1rem">Payment Method</H5>
          <Typography fontWeight={600} fontSize="15px" my="3px">
            {paymentMethod}
          </Typography>
        </Card1>
      </Grid>
    </Grid>
  );
};

const MiniCart: FC = () => {
  const [, getCheckout] = createLocalStorage("checkoutData");
  const [, getCart] = createLocalStorage("cartState");
  const [, getMerchantId] = createLocalStorage("merchantId");
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});
  const [merchantId, setMerchantId] = useState({});
  const [cartData, setCartData] = useState([]);
  const { state } = useAppContext();

  const globalSetting = state?.globalSetting;

  const exchangeAmount = globalSetting?.monCashFees || 1;
  const shop = state.shop;
  const paymentMethod = state?.checkout?.paymentMethod;

  const totalPrice = getTotalPrice(state.cart);

  useEffect(() => {
    const savedCheckoutData: any = getCheckout("checkoutData");
    const cartState: any = getCart("cartState");
    const initialMerchantId: any = getMerchantId("merchantId");

    setCheckoutData(savedCheckoutData);
    setCartData(cartState);
    setMerchantId(initialMerchantId);
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const checkoutPayload = {
        cart: cartData,
        checkout: checkoutData,
      };

      if (!isEmpty(state?.cart)) {
        checkoutPayload.cart = state?.cart;
      }

      if (!isEmpty(state?.checkout)) {
        checkoutPayload.checkout = state?.checkout;
      }

      const data = await createCheckoutSession({
        ...checkoutPayload,
        totalPrice,
        merchantId: merchantId || shop?.merchantId,
        exchangeAmount,
        shop,
        paymentMethod,
      });

      setIsLoading(false);
      const checkoutUrl = data?.checkoutUrl;
      if (checkoutUrl) {
        // Redirect to order page
        window.location.href = checkoutUrl;
        return;
      }

      // toast.success("Order placed successfully");

      // Reset the cart and checkout state
      // dispatch({
      //   type: "PURCHASE_COMPLETE",
      // });

      // clearLocalStorageKeys(["cartState", "checkoutState"]);

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="cart-list">
        <Divider />

        {!!!state.cart.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
          >
            <NextImage
              src="/assets/images/logos/shopping-bag.svg"
              width="90px"
              height="100%"
            />
            <Paragraph
              mt="1rem"
              color="text.muted"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Paragraph>
          </FlexBox>
        )}

        {state.cart.map((item) => (
          <Fragment key={item.id}>
            <FlexBox className="cart-item" alignItems="center" p="20px">
              <FlexBox alignItems="center" flexDirection="column">
                <Typography fontWeight={600} fontSize="15px" my="3px">
                  {item.quantity}
                </Typography>
              </FlexBox>

              <Link href={`/product/${item.slug}`}>
                <a>
                  <Avatar
                    size={76}
                    mx="1rem"
                    alt={item.name}
                    src={
                      item.mainImageUrl ||
                      "/assets/images/products/iphone-x.png"
                    }
                  />
                </a>
              </Link>

              <div className="product-details">
                <Link href={`/product/${item.id}`}>
                  <a>
                    <H5 className="title" fontSize="14px">
                      {item.name}
                    </H5>
                  </a>
                </Link>

                <Tiny color="text.muted">
                  {currency(item.price, 0)} x {item.quantity}
                </Tiny>

                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="primary.main"
                  mt="4px"
                >
                  {currency(item.quantity * item.price)}
                </Typography>
              </div>
            </FlexBox>
            {state.cart.length > 1 && <Divider />}
          </Fragment>
        ))}
      </div>

      {!!state.cart.length && (
        <Fragment>
          <Button
            width="248px"
            loading={isLoading}
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            <Typography fontWeight={600}>
              Pay Now ({currency(getTotalPrice(state.cart))})
            </Typography>
          </Button>
        </Fragment>
      )}
    </>
  );
};

PaymentReview.layout = CheckoutNavLayout;
MiniCart.defaultProps = { handleSubmit: () => {} };

export const getServerSideProps: GetServerSideProps = async () => {
  const shopId = process.env.NEXT_PUBLIC_SHOP_ID;

  const shop = await getShopById(shopId);
  const footerMenus = await getShopFooterMenus(shopId);
  const globalSetting = await getGlobalSetting();
  const categories = await categoryApi?.getCategoryByShopId(shopId);
  const mainCarouselData = await marketApi.getMainCarousel(shopId);
  const menus = await getShopMenus(shopId);

  return {
    props: {
      mainCarouselData,
      shop,
      menus,
      footerMenus,
      globalSetting,
      categories,
    },
  };
};

export default PaymentReview;
