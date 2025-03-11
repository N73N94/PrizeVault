import React from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Helmet } from "react-helmet";

const ForgotPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Reset Password | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Reset your Premium Raffle account password."
        />
      </Helmet>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPasswordPage;
