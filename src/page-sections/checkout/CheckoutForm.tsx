import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
import countryList from "@data/countryList";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Typography from "@component/Typography";
import Address from "@models/address.model";
import { useAppContext } from "@context/AppContext";

type CheckoutFormProps = {
  address: Address;
};

const CheckoutForm: FC<CheckoutFormProps> = ({ address }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(false);

  const user = state?.user;

  const email = user?.email || "";

  const initialValues = {
    shipping_name: address?.name || "",
    shipping_email: email,
    shipping_contact: address?.phone,
    shipping_company: "",
    shipping_zip: address?.zip || "",
    shipping_city: address?.city || "",
    shipping_country: address?.country || "",
    shipping_address1: address?.street || "",
    shipping_address2: "",

    billing_name: address?.name || "",
    billing_email: email,
    billing_contact: address?.phone || "",
    billing_company: "",
    billing_zip: address?.zip || "",
    billing_city: address?.city || "",
    billing_country: address?.country || "",
    billing_address1: address?.street || "",
    billing_address2: "",
  };

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log(values);
      const checkoutPayload = {
        address: {
          name: values.shipping_name,
          phone: values.shipping_contact,
          company: values.shipping_company,
          zip: values.shipping_zip,
          country: values.shipping_country?.value,
          street: values.shipping_address1,
          city: values.shipping_city,
          apartment: values.shipping_address2,
        },
        billingAddress: {
          name: values.billing_name,
          phone: values.billing_contact,
          company: values.billing_company,
          zip: values.billing_zip,
          country: values.billing_country,
          street: values.billing_address1,
          city: values.billing_city,
          apartment: values.billing_address2,
        },
      };

      dispatch({ type: "SET_CHECKOUT", payload: checkoutPayload });
      router.push("/payment");
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error?.message;
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue) =>
    ({ target: { checked } }) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);
      setFieldValue("billing_name", checked ? values.shipping_name : "");
    };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={checkoutSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Shipping Address
            </Typography>

            <Grid container spacing={7}>
              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  label="Full Name"
                  name="shipping_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shipping_name}
                  errorText={touched.shipping_name && errors.shipping_name}
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_contact"
                  value={values.shipping_contact}
                  errorText={
                    touched.shipping_contact && errors.shipping_contact
                  }
                />

                <TextField
                  mb="1rem"
                  fullwidth
                  label="Address 1"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address1"
                  value={values.shipping_address1}
                  errorText={
                    touched.shipping_address1 && errors.shipping_address1
                  }
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  type="text"
                  label="City"
                  onBlur={handleBlur}
                  name="shipping_city"
                  onChange={handleChange}
                  value={values.shipping_city}
                  errorText={touched.shipping_city && errors.shipping_city}
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  type="number"
                  label="Zip Code"
                  onBlur={handleBlur}
                  name="shipping_zip"
                  onChange={handleChange}
                  value={values.shipping_zip}
                  errorText={touched.shipping_zip && errors.shipping_zip}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullwidth
                  mb="1rem"
                  type="email"
                  onBlur={handleBlur}
                  label="Email Address"
                  name="shipping_email"
                  onChange={handleChange}
                  value={values.shipping_email}
                  errorText={touched.shipping_email && errors.shipping_email}
                />

                <TextField
                  fullwidth
                  mb="1rem"
                  label="Company"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_company"
                  value={values.shipping_company}
                  errorText={
                    touched.shipping_company && errors.shipping_company
                  }
                />

                <Select
                  mb="1rem"
                  label="Country"
                  options={countryList}
                  value={values.shipping_country || "US"}
                  errorText={
                    touched.shipping_country && errors.shipping_country
                  }
                  onChange={(country) =>
                    setFieldValue("shipping_country", country)
                  }
                />

                <TextField
                  fullwidth
                  label="Address 2"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  name="shipping_address2"
                  value={values.shipping_address2}
                  errorText={
                    touched.shipping_address2 && errors.shipping_address2
                  }
                />
              </Grid>
            </Grid>
          </Card1>

          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Billing Address
            </Typography>

            <CheckBox
              color="secondary"
              label="Same as shipping address"
              mb={sameAsShipping ? "" : "1rem"}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />

            {!sameAsShipping && (
              <Grid container spacing={7}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    fullwidth
                    mb="1rem"
                    label="Full Name"
                    name="billing_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_name}
                    errorText={touched.billing_name && errors.billing_name}
                  />

                  <TextField
                    fullwidth
                    mb="1rem"
                    onBlur={handleBlur}
                    label="Phone Number"
                    name="billing_contact"
                    onChange={handleChange}
                    value={values.billing_contact}
                    errorText={
                      touched.billing_contact && errors.billing_contact
                    }
                  />

                  <TextField
                    mb="1rem"
                    fullwidth
                    label="Address 1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="billing_address1"
                    value={values.billing_address1}
                    errorText={
                      touched.billing_address1 && errors.billing_address1
                    }
                  />

                  <TextField
                    fullwidth
                    mb="1rem"
                    type="text"
                    label="City"
                    name="billing_city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_city}
                    errorText={touched.billing_city && errors.billing_city}
                  />

                  <TextField
                    fullwidth
                    mb="1rem"
                    type="number"
                    label="Zip Code"
                    name="billing_zip"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.billing_zip}
                    errorText={touched.billing_zip && errors.billing_zip}
                  />
                </Grid>

                <Grid item sm={6} xs={12}>
                  <TextField
                    fullwidth
                    mb="1rem"
                    type="email"
                    onBlur={handleBlur}
                    name="billing_email"
                    label="Email Address"
                    onChange={handleChange}
                    value={values.billing_email}
                    errorText={touched.billing_email && errors.billing_email}
                  />

                  <TextField
                    fullwidth
                    mb="1rem"
                    label="Company"
                    onBlur={handleBlur}
                    name="billing_company"
                    onChange={handleChange}
                    value={values.billing_company}
                    errorText={
                      touched.billing_company && errors.billing_company
                    }
                  />

                  <Select
                    mb="1rem"
                    label="Country"
                    options={countryList}
                    errorText={
                      touched.billing_country && errors.billing_country
                    }
                  />

                  <TextField
                    fullwidth
                    label="Address 2"
                    onBlur={handleBlur}
                    name="billing_address2"
                    onChange={handleChange}
                    value={values.billing_address2}
                    errorText={
                      touched.billing_address2 && errors.billing_address2
                    }
                  />
                </Grid>
              </Grid>
            )}
          </Card1>

          <Grid container spacing={7}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart">
                <Button
                  variant="outlined"
                  color="primary"
                  type="button"
                  fullwidth
                >
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                loading={isLoading}
                variant="contained"
                color="primary"
                type="submit"
                fullwidth
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

const checkoutSchema = yup.object().shape({
  shipping_name: yup.string().required("required"),
  shipping_email: yup.string().email("invalid email").required("required"),
  shipping_contact: yup.string().required("required"),
  shipping_zip: yup.string().required("required"),
  shipping_city: yup.string().required("required"),
  shipping_country: yup.object().required("required"),
  shipping_address1: yup.string().required("required"),
  billing_name: yup.string().required("required"),
  billing_email: yup.string().required("required"),
  billing_contact: yup.string().required("required"),
  billing_zip: yup.string().required("required"),
  billing_city: yup.string().required("required"),
  billing_country: yup.string().required("required"),
  billing_address1: yup.string().required("required"),
});

export default CheckoutForm;
