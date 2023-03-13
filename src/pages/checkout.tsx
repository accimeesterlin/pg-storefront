import { useState, useEffect } from "react";
import Grid from "@component/grid/Grid";
import CheckoutForm from "@sections/checkout/CheckoutForm";
import CheckoutSummary from "@sections/checkout/CheckoutSummary";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import api from "@utils/__api__/address";
import { getMe } from "@utils/__api__/users";
import Address from "@models/address.model";
import User from "@models/user.model";
import { useAppContext } from "@context/AppContext";

const Checkout = () => {
  const { dispatch } = useAppContext();
  const [address, setAddress] = useState({});
  useEffect(() => {
    handleAddress();
    getUserProfile();
  }, []);

  const handleAddress = async () => {
    try {
      const addresses: Address[] = await api.getAddressList();

      if (addresses?.length > 0) {
        setAddress(addresses[0]);
      }
    } catch (error) {
      // No address found
    }
  };

  const getUserProfile = async () => {
    try {
      const user: User = await getMe();
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      // No address found
    }
  };

  return (
    <Grid container flexWrap="wrap-reverse" spacing={6}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm address={address} />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
};

Checkout.layout = CheckoutNavLayout;

export default Checkout;
