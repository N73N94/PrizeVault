import React from "react";
import UserProfile from "@/components/profile/UserProfile";
import { Helmet } from "react-helmet";

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Your Profile | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Manage your Premium Raffle account profile and preferences."
        />
      </Helmet>
      <UserProfile />
    </>
  );
};

export default ProfilePage;
