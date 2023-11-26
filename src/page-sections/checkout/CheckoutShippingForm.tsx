import { FC } from "react";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import countryList from "@data/countryList";
import TextField from "@component/text-field";

type Props = {
  values: any;
  touched: any;
  errors: any;
  setFieldValue: any;
  handleChange: (value: any) => void;
  handleBlur: (value: any) => void;
};

const CheckoutShippingForm: FC<Props> = ({
  handleBlur,
  handleChange,
  values,
  touched,
  errors,
  setFieldValue,
}) => {
  return (
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
          errorText={touched.shipping_contact && errors.shipping_contact}
        />

        <TextField
          mb="1rem"
          fullwidth
          label="Address 1"
          onBlur={handleBlur}
          onChange={handleChange}
          name="shipping_address1"
          value={values.shipping_address1}
          errorText={touched.shipping_address1 && errors.shipping_address1}
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
          errorText={touched.shipping_company && errors.shipping_company}
        />

        <Select
          mb="1rem"
          label="Country"
          options={countryList}
          value={values.shipping_country || "US"}
          errorText={touched.shipping_country && errors.shipping_country}
          onChange={(country) => setFieldValue("shipping_country", country)}
        />

        <TextField
          fullwidth
          label="Address 2"
          onBlur={handleBlur}
          onChange={handleChange}
          name="shipping_address2"
          value={values.shipping_address2}
          errorText={touched.shipping_address2 && errors.shipping_address2}
        />
      </Grid>
    </Grid>
  );
};

export default CheckoutShippingForm;
