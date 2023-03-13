import { Fragment, useEffect, useState } from "react";
import Router from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Box from "@component/Box";
import Hidden from "@component/hidden";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { Card1 } from "@component/Card1";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import TextField from "@component/text-field";
import DashboardLayout from "@component/layout/customer-dashboard";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import api from "@utils/__api__/users";
// import User from "@models/user.model";
import { format } from "date-fns";
import { useAppContext } from "@context/AppContext";

// ===========================================================
// type Props = { user: User };
// ===========================================================

const ProfileEditor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const { dispatch, state } = useAppContext();

  useEffect(() => {
    handleUserProfile();
  }, []);

  const handleUserProfile = async () => {
    try {
      const data = await api.getMe();
      dispatch({ type: "SET_USER", payload: data });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const user = state?.user;

  const INITIAL_VALUES = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDay: `${
      format(
        user?.birthDay ? new Date(user?.birthDay) : new Date("1994-01-01"),
        "yyyy-MM-dd"
      ) || ""
    }`,
  };

  const VALIDATION_SCHEMA = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phone: yup.string().required("required"),
    birthDay: yup.date().required("invalid date"),
  });

  const handleFormSubmit = async (values: typeof INITIAL_VALUES) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("birthDay", values.birthDay);

      formData.append("file", files);

      await api.updateMe(formData);
      toast.success("Profile updated successfully");

      setIsLoading(false);
    } catch (error) {
      const errorMessage = error?.message;
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  const handleGoBack = () => Router.push("/profile");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFiles(file);
    setImageSrc(URL.createObjectURL(file));
  };

  const HEADER_LINK = (
    <Button color="primary" bg="primary.light" px="2rem" onClick={handleGoBack}>
      Back to Profile
    </Button>
  );

  const avatar =
    imageSrc || user?.profileImageUrl || "/assets/images/faces/ralph.png";

  return (
    <Fragment>
      <DashboardPageHeader
        iconName="user_filled"
        title="Edit Profile"
        button={HEADER_LINK}
      />

      <Card1>
        <FlexBox alignItems="flex-end" mb="22px">
          <Avatar src={avatar} size={64} />

          <Box ml="-20px" zIndex={1}>
            <label htmlFor="profile-image">
              <Button
                p="6px"
                as="span"
                size="small"
                height="auto"
                bg="gray.300"
                color="secondary"
                borderRadius="50%"
              >
                <Icon>camera</Icon>
              </Button>
            </label>
          </Box>

          <Hidden>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image"
              onChange={handleFileChange}
            />
          </Hidden>
        </FlexBox>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          enableReinitialize
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
                      name="firstName"
                      label="First Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.firstName || user?.firstName}
                      errorText={touched.firstName && errors.firstName}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="lastName"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.lastName || user?.lastName}
                      errorText={touched.lastName && errors.lastName}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      name="email"
                      type="email"
                      label="Email"
                      disabled
                      onBlur={handleBlur}
                      value={values?.email || user?.email}
                      errorText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      label="Phone"
                      name="phone"
                      onBlur={handleBlur}
                      value={values?.phone || user?.phone}
                      onChange={handleChange}
                      errorText={touched.phone && errors.phone}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullwidth
                      type="date"
                      name="birthDay"
                      label="Birth Date"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values?.birthDay || user?.birthDay}
                      errorText={touched.birthDay && errors.birthDay}
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
      </Card1>
    </Fragment>
  );
};

ProfileEditor.layout = DashboardLayout;

export default ProfileEditor;
