import { useEffect } from "react";
import { useRouter } from "next/router";
import Grid from "@component/grid/Grid";
import isEmpty from "lodash.isempty";
import PaymentForm from "@sections/payment/PaymentForm";
import PaymentSummary from "@sections/payment/PaymentSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { useAppContext } from "@context/AppContext";

const Checkout = () => {
  const { state } = useAppContext();
  const router = useRouter();

  const address = state.checkout?.address;

  useEffect(() => {
    navigateBackToCheckout();
  }, [address]);

  const navigateBackToCheckout = () => {
    if (isEmpty(address)) {
      return router?.push("/checkout");
    }
  }

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <PaymentForm />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <PaymentSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
