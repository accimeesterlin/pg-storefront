import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Formik } from "formik";
// import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import CheckBox from "@component/CheckBox";
// import countryList from "@data/countryList";
import { Button } from "@component/buttons";
// import TextField from "@component/text-field";
import Typography from "@component/Typography";
import { useAppContext } from "@context/AppContext";
import { createLocalStorage } from "@utils/utils";
import CheckoutShippingForm from "./CheckoutShippingForm";
import CheckoutBillingForm from "./CheckoutBillingForm";

const CheckoutForm: FC = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [saveCheckout, getCheckout] = createLocalStorage("checkoutData");
  const [isLoading, setIsLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const user = state?.user;
  const address = state?.checkout?.address;

  const email = user?.email || "";

  useEffect(() => {
    const savedCheckoutData: any = getCheckout("checkoutData");
    if (savedCheckoutData) {
      dispatch({
        type: "SET_CHECKOUT",
        payload: savedCheckoutData,
      });
    }
  }, []);

  const defaultCountry = {
    label: "United States",
    value: "US",
  };

  const initialValues = {
    shipping_name: address?.name || "",
    shipping_email: address?.email,
    shipping_contact: address?.phone,
    shipping_company: address?.company || "",
    shipping_zip: address?.zip || "",
    shipping_city: address?.city || "",
    shipping_country:
      { label: address?.country, value: address?.country } || defaultCountry,
    shipping_address1: address?.street || "",
    shipping_address2: address?.apartment || "",

    billing_name: address?.name || "",
    billing_email: address?.email || email,
    billing_contact: address?.phone || "",
    billing_company: address?.company || "",
    billing_zip: address?.zip || "",
    billing_city: address?.city || "",
    billing_country: address?.country || "",
    billing_address1: address?.street || "",
    billing_address2: address?.apartment || "",
  };

  const setValuesSameAsShipping = (values, setFieldValue) => {
    setFieldValue("billing_name", values.shipping_name);
    setFieldValue("billing_email", values.shipping_email);
    setFieldValue("billing_contact", values.shipping_contact);
    setFieldValue("billing_company", values.shipping_company);
    setFieldValue("billing_zip", values.shipping_zip);
    setFieldValue("billing_city", values.shipping_city);
    setFieldValue("billing_country", values.shipping_country?.label);
    setFieldValue("billing_address1", values.shipping_address1);
    setFieldValue("billing_address2", values.shipping_address2);
  };

  const handleFormSubmit = async (
    values,
    { setSubmitting, setFieldError, setFieldValue }
  ) => {
    try {
      setIsLoading(true);

      const address = {
        name: values.shipping_name,
        phone: values.shipping_contact,
        company: values.shipping_company,
        zip: values.shipping_zip,
        country: values.shipping_country?.value,
        street: values.shipping_address1,
        city: values.shipping_city,
        apartment: values.shipping_address2,
        email: values.shipping_email,
      };

      const checkoutPayload = {
        address,
        billingAddress: {
          name: values.billing_name,
          phone: values.billing_contact,
          company: values.billing_company,
          zip: values.billing_zip,
          country: values.billing_country,
          street: values.billing_address1,
          city: values.billing_city,
          apartment: values.billing_address2,
          email: values.shipping_email || values?.billing_email,
        },
      };

      if (sameAsShipping) {
        checkoutPayload.billingAddress = address;
        setValuesSameAsShipping(values, setFieldValue);
      }

      saveCheckout(checkoutPayload);
      await checkoutSchema.validate(values, { abortEarly: false });

      dispatch({ type: "SET_CHECKOUT", payload: checkoutPayload });
      router.push("/payment");
      setIsLoading(false);
    } catch (error) {
      // Handle validation errors
      if (error.name === "ValidationError") {
        error.inner.forEach(({ path, errors, message }) => {
          setFieldError(path, message);
          toast.error(`${path}: ${errors[0]}`);
        });
        setIsLoading(false);
      } else {
        // Handle other errors
        const errorMessage = error?.message || "An error occurred";
        toast.error(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckboxChange =
    (values: typeof initialValues, setFieldValue) =>
    ({ target: { checked } }) => {
      setSameAsShipping(checked);
      setFieldValue("same_as_shipping", checked);

      if (checked) {
        setValuesSameAsShipping(values, setFieldValue);
        return;
      }
    };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      // validationSchema={checkoutSchema}
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

            <CheckoutShippingForm
              handleBlur={handleBlur}
              handleChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </Card1>

          <Card1 mb="2rem">
            <Typography fontWeight="600" mb="1rem">
              Billing Address
            </Typography>

            <CheckBox
              color="secondary"
              label="Same as shipping address"
              mb={sameAsShipping ? "" : "1rem"}
              checked={sameAsShipping}
              onChange={handleCheckboxChange(values, setFieldValue)}
            />

            {!sameAsShipping && (
              <CheckoutBillingForm
                handleBlur={handleBlur}
                handleChange={handleChange}
                values={values}
                errors={errors}
                touched={touched}
              />
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
  // Shipping Address
  shipping_name: yup.string().required("required"),
  shipping_email: yup.string().email("invalid email").required("required"),
  shipping_contact: yup.string().required("required"),
  shipping_zip: yup.string().required("required"),
  shipping_city: yup.string().required("required"),
  shipping_country: yup.object().required("required"),
  shipping_address1: yup.string().required("required"),

  // Billing Address
  billing_name: yup.string().nullable(),
  billing_email: yup.string().nullable(),
  billing_contact: yup.string().nullable(),
  billing_zip: yup.string().nullable(),
  billing_city: yup.string().nullable(),
  billing_country: yup.string().nullable(),
  billing_address1: yup.string().nullable(),
});

export default CheckoutForm;
