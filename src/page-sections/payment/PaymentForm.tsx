import { FC, Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import { Button } from "@component/buttons";

// import CreditCardForm from "./creditcardform";
import PGPayPayment from "./PGPayForm";
// import MonCashPayment from "./monCashPayment";
// import PaypalPayment from "./paypalPayment";
// import CashOnDeliveryPayment from "./CashOnDeliveryForm";
import { useAppContext } from "@context/AppContext";
import CryptoPayment from "./cryptoPayment";

const PaymentForm: FC = () => {
  const { dispatch } = useAppContext();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");


  const handleFormSubmit = async () => {
    try {
      dispatch({
        type: "SET_PAYMENT_METHOD",
        payload: paymentMethod
      });


    router.push("/review");
    } catch (error) {
      // console.log(error);
    }
  };

  // const handlePaymentMethodChange = ({ target: { name } }) => {
  //   setPaymentMethod(name);
  // };

  return (
    <Fragment>
      <Card1 mb="2rem">
        {/* <CreditCardForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/> */}
        {/* <PGPayPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/> */}
        <CryptoPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
        <PGPayPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
        {/* <MonCashPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/> */}
        {/* <PaypalPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/> */}
        {/* <CashOnDeliveryPayment paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/> */}

       
      </Card1>

      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout">
            <Button variant="outlined" color="primary" type="button" fullwidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>

        <Grid item sm={6} xs={12}>
            <Button variant="contained" color="primary" type="submit" fullwidth onClick={handleFormSubmit}>
              Review
            </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentForm;
