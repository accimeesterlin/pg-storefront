import { FC } from "react";
import { State } from "country-state-city";
import Select from "@component/Select";
import Grid from "@component/grid/Grid";
import countryList from "@data/countryList";
import TextField from "@component/text-field";

type Props = {
  values: any;
  touched: any;
  errors: any;
  handleChange: (value: any) => void;
  handleBlur: (value: any) => void;
  setFieldValue: any;
};

const CheckoutBillingForm: FC<Props> = ({
  handleBlur,
  handleChange,
  setFieldValue,
  values,
  touched,
  errors,
}) => {
  const countryCode = values.shipping_country?.value || "US";

  const countryStates = State.getStatesOfCountry(countryCode) || [];

  const stateOptions = countryStates?.map(({ name, isoCode }) => ({
    label: name,
    value: isoCode,
  }));

  return (
    <Grid container spacing={7}>
      <Grid item sm={6} xs={12}>
        <TextField
          fullwidth
          mb="1rem"
          label="Full Name"
          name="billing_name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.billing_name || values?.shipping_name}
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
          errorText={touched.billing_contact && errors.billing_contact}
        />

        <TextField
          mb="1rem"
          fullwidth
          label="Address 1"
          onBlur={handleBlur}
          onChange={handleChange}
          name="billing_address1"
          value={values.billing_address1}
          errorText={touched.billing_address1 && errors.billing_address1}
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
          value={values.billing_email || values?.shipping_email}
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
          errorText={touched.billing_company && errors.billing_company}
        />

        <Select
          mb="1rem"
          label="Country"
          options={countryList}
          errorText={touched.billing_country && errors.billing_country}
          onChange={(country) => setFieldValue("billing_country", country)}
        />

        <Select
          mb="1rem"
          label="States"
          options={stateOptions}
          value={values.billing_state}
          errorText={touched.billing_state && errors.billing_state}
          onChange={(state) => setFieldValue("billing_state", state)}
        />

        <TextField
          fullwidth
          label="Address 2"
          onBlur={handleBlur}
          name="billing_address2"
          onChange={handleChange}
          value={values.billing_address2}
          errorText={touched.billing_address2 && errors.billing_address2}
        />
      </Grid>
    </Grid>
  );
};

export default CheckoutBillingForm;
