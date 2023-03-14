import { FC, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import Address from "@models/address.model";

import api from "@utils/__api__/address";

// ===========================================================
type AddressFormProps = { address?: Address };
// ===========================================================

const AddressForm: FC<AddressFormProps> = ({ address }) => {
  const [isLoading, setIsLoading] = useState(false);

  const INITIAL_VALUES = {
    name: address?.name || "",
    phone: address?.phone || "",
    city: address?.city || "",
    street: address?.street || "",
    country: address?.country || "",
    state: address?.state || "",
    zip: address?.zip || "",
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    name: yup.string().required("required"),
    street: yup.string().required("required"),
    city: yup.string().required("required"),
    country: yup.string().required("required"),
    phone: yup.string().required("required"),
    state: yup.string().required("required"),
    zip: yup.string().required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);

      await api.createAddress({
        ...values,
        id: address?.id || null,
      });

      setIsLoading(false);
      toast.success("Address created successfully");
    } catch (error) {
      const errorMessage = error?.response?.data.message;
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
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
          <Box mb="30px">
            <Grid container horizontal_spacing={6} vertical_spacing={4}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="name"
                  label="Name"
                  onBlur={handleBlur}
                  value={values.name || address?.name}
                  onChange={handleChange}
                  errorText={touched.name && errors.name}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  label="Phone"
                  name="phone"
                  onBlur={handleBlur}
                  value={values.phone || address?.phone}
                  onChange={handleChange}
                  errorText={touched.phone && errors.phone}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="street"
                  label="Street"
                  onBlur={handleBlur}
                  value={values.street || address?.street}
                  onChange={handleChange}
                  errorText={touched.street && errors.street}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="city"
                  label="City"
                  onBlur={handleBlur}
                  value={values.city || address?.city}
                  onChange={handleChange}
                  errorText={touched.city && errors.city}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="country"
                  label="Country"
                  onBlur={handleBlur}
                  value={values.country || address?.country}
                  onChange={handleChange}
                  errorText={touched.country && errors.country}
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="state"
                  label="State"
                  onBlur={handleBlur}
                  value={values.state || address?.state}
                  onChange={handleChange}
                  errorText={touched.state && errors.state}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullwidth
                  name="zip"
                  label="Zip"
                  onBlur={handleBlur}
                  value={values.zip || address?.zip}
                  onChange={handleChange}
                  errorText={touched.zip && errors.zip}
                />
              </Grid>
            </Grid>
          </Box>

          <Button
            loading={isLoading}
            type="submit"
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
