
import { FC, useState } from "react";
import { Auth } from "aws-amplify";
import Link from "next/link";
// import { useRouter } from "next/router";
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
// import Box from "../Box";
import Icon from "../icon/Icon";
// import Divider from "../Divider";
import FlexBox from "../FlexBox";
import CheckBox from "../CheckBox";
import TextField from "../text-field";
import { Button, IconButton } from "../buttons";
import { H3, H5, H6, SemiSpan} from "../Typography";
// import { H3, H5, H6, SemiSpan, Small, Span } from "../Typography";
import { StyledSessionCard } from "./styles";
import { getAccessToken, setUserToken } from "@utils/__api__/users";

const Signup: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((visible) => !visible);
  };

  const handleFormSubmit = async (values) => {
   try {
   
    setIsLoading(true);
    const email = values.email;
    const password = values.password;
  
    const payload = {
      username: email,
      password,
      attributes: {
        email: values.email,
        "custom:firstName": values.firstName,
        "custom:lastName": values.lastName,
      },
    }


    await Auth.signUp(payload);
    await Auth.signIn(email, password);
    const token = await getAccessToken();
    await setUserToken(token);
    setIsLoading(false);
    toast.success("Account created successfully");
    window.location.href = "/profile";

   } catch (error) {
    const errorMessage = error?.message;
    toast.error(errorMessage);
    setIsLoading(false);
   }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });
  
  return (
    <StyledSessionCard mx="auto" my="2rem" boxShadow="large">
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb="0.5rem">
          Create Your Account
        </H3>

        <H5 fontWeight="600" fontSize="12px" color="gray.800" textAlign="center" mb="2.25rem">
          Please fill all forms to continued
        </H5>

        <TextField
          fullwidth
          name="firstName"
          mb="0.75rem"
          label="First Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.firstName || ""}
          placeholder="Ralph"
          errorText={touched.firstName && errors.firstName}
        />
        <TextField
          fullwidth
          name="lastName"
          mb="0.75rem"
          label="Last Name"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.lastName || ""}
          placeholder="Adwards"
          errorText={touched.lastName && errors.lastName}
        />

        <TextField
          fullwidth
          mb="0.75rem"
          name="email"
          type="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email || ""}
          placeholder="exmple@mail.com"
          label="Email or Phone Number"
          errorText={touched.email && errors.email}
        />

        <TextField
          fullwidth
          mb="0.75rem"
          name="password"
          label="Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          errorText={touched.password && errors.password}
          type={passwordVisibility ? "text" : "password"}
          endAdornment={
            <IconButton
              p="0.25rem"
              size="small"
              mr="0.25rem"
              type="button"
              color={passwordVisibility ? "gray.700" : "gray.600"}
              onClick={togglePasswordVisibility}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />
        <TextField
          mb="1rem"
          fullwidth
          name="re_password"
          placeholder="*********"
          label="Confirm Password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          type={passwordVisibility ? "text" : "password"}
          errorText={touched.re_password && errors.re_password}
          endAdornment={
            <IconButton
              p="0.25rem"
              size="small"
              mr="0.25rem"
              type="button"
              onClick={togglePasswordVisibility}
              color={passwordVisibility ? "gray.700" : "gray.600"}
            >
              <Icon variant="small" defaultcolor="currentColor">
                {passwordVisibility ? "eye-alt" : "eye"}
              </Icon>
            </IconButton>
          }
        />

        <CheckBox
          mb="1.75rem"
          name="agreement"
          color="secondary"
          onChange={handleChange}
          checked={values.agreement}
          label={
            <FlexBox>
              <SemiSpan>By signing up, you agree to</SemiSpan>
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
                  Terms & Condtion
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button loading={isLoading} mb="1.65rem" variant="contained" color="primary" type="submit" fullwidth>
          Create Account
        </Button>
{/* 
        <Box mb="1rem">
          <Divider width="200px" mx="auto" />
          <FlexBox justifyContent="center" mt="-14px">
            <Span color="text.muted" bg="body.paper" px="1rem">
              on
            </Span>
          </FlexBox>
        </Box>

        <FlexBox
          mb="0.75rem"
          height="40px"
          color="white"
          bg="#3B5998"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            facebook-filled-white
          </Icon>
          <Small fontWeight="600">Continue with Facebook</Small>
        </FlexBox>

        <FlexBox
          mb="1.25rem"
          height="40px"
          color="white"
          bg="#4285F4"
          borderRadius={5}
          cursor="pointer"
          alignItems="center"
          justifyContent="center"
        >
          <Icon variant="small" defaultcolor="auto" mr="0.5rem">
            google-1
          </Icon>
          <Small fontWeight="600">Continue with Google</Small>
        </FlexBox> */}
      </form>

      <FlexBox justifyContent="center" bg="gray.200" py="19px">
        <SemiSpan>Already have account?</SemiSpan>
        <Link href="/login">
          <a>
            <H6 ml="0.5rem" borderBottom="1px solid" borderColor="gray.900">
              Log in
            </H6>
          </a>
        </Link>
      </FlexBox>
    </StyledSessionCard>
  );
};

const initialValues = {
  firstName: "",
  lastname: "",
  email: "",
  password: "",
  re_password: "",
  agreement: false,
};

const formSchema = yup.object().shape({
  firstName: yup.string().required("${path} is required"),
  lastName: yup.string().required("${path} is required"),
  email: yup.string().email("invalid email").required("${path} is required"),
  password: yup.string().required("${path} is required"),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
  agreement: yup
    .bool()
    .test(
      "agreement",
      "You have to agree with our Terms and Conditions!",
      (value) => value === true
    )
    .required("You have to agree with our Terms and Conditions!")
});

export default Signup;
