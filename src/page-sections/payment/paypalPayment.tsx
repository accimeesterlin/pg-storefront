import { FC, Fragment } from "react";
import Radio from "@component/radio";
import Divider from "@component/Divider";
import { Button } from "@component/buttons";
import FlexBox from "@component/FlexBox";
import useWindowSize from "@hook/useWindowSize";
import TextField from "@component/text-field";
import Typography from "@component/Typography";

type PaypalPaymentProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const PaypalPayment: FC<PaypalPaymentProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  //   const router = useRouter();

  const width = useWindowSize();
  const isMobile = width < 769;

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Radio
        mb="1.5rem"
        name="paypal"
        color="secondary"
        onChange={handlePaymentMethodChange}
        checked={paymentMethod === "paypal"}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Pay with Paypal
          </Typography>
        }
      />
      <Divider mb="1.5rem" mx="-2rem" />

      {paymentMethod === "paypal" && (
        <Fragment>
          <FlexBox alignItems="flex-end" mb="30px">
            <TextField
              fullwidth
              name="email"
              type="email"
              label="Paypal Email"
              mr={isMobile ? "1rem" : "30px"}
            />
            <Button variant="outlined" color="primary" type="button">
              Submit
            </Button>
          </FlexBox>

          <Divider mb="1.5rem" mx="-2rem" />
        </Fragment>
      )}
    </Fragment>
  );
};

export default PaypalPayment;
