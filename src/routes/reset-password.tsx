import React from "react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Helmet } from "react-helmet";

const ResetPasswordPage = () => {
  return (
    <>
      <Helmet>
        <title>Set New Password | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Set a new password for your Premium Raffle account."
        />
      </Helmet>
      <ResetPasswordForm />
    </>
  );
};

export default ResetPasswordPage;
