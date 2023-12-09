import { FC, Fragment } from "react";

import Radio from "@component/radio";
import Divider from "@component/Divider";
// import { Button } from "@component/buttons";
import Typography from "@component/Typography";

type MonCashPaymentProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const MonCashPayment: FC<MonCashPaymentProps> = ({
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
        name="moncash"
        onChange={handlePaymentMethodChange}
        checked={paymentMethod === "moncash"}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Pay with Mon Cash
          </Typography>
        }
      />

      <Divider mb="1.25rem" mx="-2rem" />
    </Fragment>
  );
};

export default MonCashPayment;
