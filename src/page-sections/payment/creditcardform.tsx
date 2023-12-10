import { FC, Fragment } from "react";
// import { useRouter } from "next/router";
// import { Formik } from "formik";
// import * as yup from "yup";
// import Box from "@component/Box";
import Radio from "@component/radio";
// import Grid from "@component/grid/Grid";
import Divider from "@component/Divider";
// import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
import Typography from "@component/Typography";

type CreditCardFormProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

const CreditCardForm: FC<CreditCardFormProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  // const router = useRouter();

  // const handleFormSubmit = async () => {
  //   router.push("/payment");
  // };

  const handlePaymentMethodChange = ({ target: { name } }) => {
    setPaymentMethod(name);
  };

  return (
    <Fragment>
      <Radio
        mb="1.5rem"
        color="secondary"
        name="stripe"
        onChange={handlePaymentMethodChange}
        checked={paymentMethod === "stripe"}
        label={
          <Typography ml="6px" fontWeight="600" fontSize="18px">
            Pay with credit card
          </Typography>
        }
      />

      <Divider mb="1.25rem" mx="-2rem" />

      {/* {paymentMethod === "credit-card" && (
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb="1.5rem">
                <Grid container horizontal_spacing={6} vertical_spacing={4}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="card_no"
                      label="Card Number"
                      onBlur={handleBlur}
                      value={values.card_no}
                      onChange={handleChange}
                      errorText={touched.card_no && errors.card_no}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="exp_date"
                      label="Exp Date"
                      placeholder="MM/YY"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.exp_date}
                      errorText={touched.exp_date && errors.exp_date}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="name"
                      onBlur={handleBlur}
                      value={values.name}
                      label="Name on Card"
                      onChange={handleChange}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <TextField
                      fullwidth
                      name="name"
                      onBlur={handleBlur}
                      value={values.name}
                      label="Name on Card"
                      onChange={handleChange}
                      errorText={touched.name && errors.name}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button variant="outlined" color="primary" mb="30px">
                Submit
              </Button>

              <Divider mb="1.5rem" mx="-2rem" />
            </form>
          )}
        </Formik>
      )} */}
    </Fragment>
  );
};

// const initialValues = {
//   card_no: "",
//   name: "",
//   exp_date: "",
//   cvc: "",
//   shipping_zip: "",
//   shipping_country: "",
//   shipping_address1: "",
//   shipping_address2: "",

//   billing_name: "",
//   billing_email: "",
//   billing_contact: "",
//   billing_company: "",
//   billing_zip: "",
//   billing_country: "",
//   billing_address1: "",
//   billing_address2: "",
// };

// const checkoutSchema = yup.object().shape({
//   card_no: yup.string().required("required"),
//   name: yup.string().required("required"),
//   exp_date: yup.string().required("required"),
//   cvc: yup.string().required("required"),
//   // shipping_zip: yup.string().required("required"),
//   // shipping_country: yup.object().required("required"),
//   // shipping_address1: yup.string().required("required"),
//   // billing_name: yup.string().required("required"),
//   // billing_email: yup.string().required("required"),
//   // billing_contact: yup.string().required("required"),
//   // billing_zip: yup.string().required("required"),
//   // billing_country: yup.string().required("required"),
//   // billing_address1: yup.string().required("required"),
// });

export default CreditCardForm;
