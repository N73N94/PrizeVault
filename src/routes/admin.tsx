import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/components/auth/AuthContext";
import { Navigate } from "react-router-dom";
import AdminDashboard from "@/components/admin/AdminDashboard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AdminPage = () => {
  const { user, loading } = useAuth();

  // Mock admin check - in a real app, you would check if the user has admin role
  const isAdmin =
    user &&
    (user.email === "admin@example.com" || user.email?.includes("admin"));

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect if not authenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Admin dashboard for managing raffles, users, and platform settings."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow pt-20">
          <AdminDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AdminPage;
