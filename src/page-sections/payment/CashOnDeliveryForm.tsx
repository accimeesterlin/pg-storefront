import { FC, Fragment } from "react";
import Radio from "@component/radio";
import Typography from "@component/Typography";

type CashOnDeliveryPaymentProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const CashOnDeliveryPayment: FC<CashOnDeliveryPaymentProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  //   const router = useRouter();


  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Radio
        name="cod"
        color="secondary"
        checked={paymentMethod === "cod"}
        onChange={handlePaymentMethodChange}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Cash On Delivery
          </Typography>
        }
      />
    </Fragment>
  );
};

export default CashOnDeliveryPayment;
