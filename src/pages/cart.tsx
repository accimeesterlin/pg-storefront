import { Fragment, useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import { State } from "country-state-city";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import CheckoutNavLayout from "@component/layout/CheckoutNavLayout";
import { useAppContext } from "@context/AppContext";
import countryList from "@data/countryList";
import { currency, getTotalPrice } from "@utils/utils";

const Cart = () => {
  const [countryCode, setCountryCode] = useState("us");
  const { state } = useAppContext();

  const countryStates = State.getStatesOfCountry(countryCode) || [];

  const stateOptions = countryStates?.map(({ name, isoCode }) => ({
    label: name,
    value: isoCode,
  }));

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          {state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id={item.id}
              shop={{
                id: item.shopId,
              }}
              key={item.id}
              quantity={item.quantity}
              slug={item.slug}
              name={item.name}
              price={item.price}
              mainImageUrl={item.mainImageUrl}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox
              justifyContent="space-between"
              alignItems="center"
              mb="1rem"
            >
              <Typography color="gray.600">Total:</Typography>

              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(getTotalPrice(state.cart))}
              </Typography>
            </FlexBox>

            <Divider mb="1rem" />

            <FlexBox alignItems="center" mb="1rem">
              <Typography fontWeight="600" mr="10px">
                Additional Comments
              </Typography>

              <Box p="3px 10px" bg="primary.light" borderRadius="3px">
                <Typography fontSize="12px" color="primary.main">
                  Note
                </Typography>
              </Box>
            </FlexBox>

            <TextArea rows={6} fullwidth mb="1rem" />

            <Divider mb="1rem" />

            {/* <TextField placeholder="Voucher" fullwidth />

            <Button
              variant="outlined"
              color="primary"
              mt="1rem"
              mb="30px"
              fullwidth
            >
              Apply Voucher
            </Button> */}

            <Divider mb="1.5rem" />

            <Typography fontWeight="600" mb="1rem">
              Shipping Estimates
            </Typography>

            <Select
              mb="1rem"
              label="Country"
              options={countryList}
              placeholder="Select Country"
              onChange={(e: { value: string; label: string }) =>
                setCountryCode(e.value)
              }
            />

            <Select
              label="State"
              options={stateOptions}
              placeholder="Select State"
              onChange={(e) => console.log(e)}
            />

            <Box mt="1rem">
              <TextField label="Zip Code" placeholder="3100" fullwidth />
            </Box>

            <Button variant="outlined" color="primary" my="1rem" fullwidth>
              Calculate Shipping
            </Button>

            <Link href="/checkout">
              <Button variant="contained" color="primary" fullwidth>
                Checkout Now
              </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
    </Fragment>
  );
};

Cart.layout = CheckoutNavLayout;

export default Cart;
