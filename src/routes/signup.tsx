import React from "react";
import SignupForm from "@/components/auth/SignupForm";
import { Helmet } from "react-helmet";

const SignupPage = () => {
  return (
    <>
      <Helmet>
        <title>Create Account | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Create your Premium Raffle account to start participating in high-value raffles with transparent odds."
        />
      </Helmet>
      <SignupForm />
    </>
  );
};

export default SignupPage;
