import React from "react";
import UserDashboard from "@/components/profile/UserDashboard";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/auth/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Dashboard | Premium Raffle Platform</title>
        <meta
          name="description"
          content="View your active raffles, past entries, and loyalty rewards."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header
          isLoggedIn={!!user}
          username={user?.email?.split("@")[0] || "User"}
        />
        <main className="flex-grow pt-20">
          <UserDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
