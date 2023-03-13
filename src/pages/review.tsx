import { FC, Fragment } from "react";
import Link from "next/link";
import NextImage from "next/image";
// import Icon from "@component/icon/Icon";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Avatar from "@component/avatar";
import { Button } from "@component/buttons";
import Typography, { H5, Paragraph, Tiny } from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { currency, getTotalPrice } from "@utils/utils";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";

import Grid from "@component/grid/Grid";
// import { StyledMiniCart } from "@component/mini-cart/styles";

const PaymentReview = () => {
  const { state } = useAppContext();
  const paymentMethod = state?.checkout?.paymentMethod;

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

type MiniCartProps = { toggleSidenav?: () => void };

const MiniCart: FC<MiniCartProps> = ({ toggleSidenav }) => {
  const { state } = useAppContext();

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
                  {item.qty}
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
                  {currency(item.price, 0)} x {item.qty}
                </Tiny>

                <Typography
                  fontWeight={600}
                  fontSize="14px"
                  color="primary.main"
                  mt="4px"
                >
                  {currency(item.qty * item.price)}
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
            color="primary"
            variant="contained"
            onClick={toggleSidenav}
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
MiniCart.defaultProps = { toggleSidenav: () => {} };

export default PaymentReview;
