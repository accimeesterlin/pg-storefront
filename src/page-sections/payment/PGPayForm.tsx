import { FC, Fragment } from "react";
import Radio from "@component/radio";
import Divider from "@component/Divider";
// import { Button } from "@component/buttons";
import Typography from "@component/Typography";

type PGPayPaymentProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const PGPayPayment: FC<PGPayPaymentProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
     <Radio
          mb="1.5rem"
          color="secondary"
          name="pgpay"
          onChange={handlePaymentMethodChange}
          checked={paymentMethod === "pgpay"}
          label={
            <Typography ml="6px" fontWeight="600" fontSize="18px">
              Pay with PG Pay
            </Typography>
          }
        />

        <Divider mb="1.25rem" mx="-2rem" />

    </Fragment>
  );
};


export default PGPayPayment;
