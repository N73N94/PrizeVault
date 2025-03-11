import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Sign in to your Premium Raffle account to manage your tickets and participate in exclusive raffles."
        />
      </Helmet>
      <LoginForm />
    </>
  );
};

export default LoginPage;
