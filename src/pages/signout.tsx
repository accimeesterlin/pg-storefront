import React from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import FlexBox from "@component/FlexBox";
import Login from "@component/sessions/Login";

const SignOutPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    signOut();
  }, []);

  const signOut = async () => {
    await Auth.signOut();
    router?.push("/login");
  };

  return (
    <FlexBox
      minHeight="100vh"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Login />
    </FlexBox>
  );
};

export default SignOutPage;
