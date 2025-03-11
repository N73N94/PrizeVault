import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/components/auth/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PaymentMethodsManager from "@/components/payment/PaymentMethodsManager";
import PaymentHistory from "@/components/payment/PaymentHistory";

const PaymentMethodsPage = () => {
  const { user } = useAuth();

  // Mock handlers for payment methods
  const handleAddPaymentMethod = (method: any) => {
    console.log("Adding payment method:", method);
    // In a real app, you would call an API to add the payment method
  };

  const handleRemovePaymentMethod = (id: string) => {
    console.log("Removing payment method:", id);
    // In a real app, you would call an API to remove the payment method
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    console.log("Setting default payment method:", id);
    // In a real app, you would call an API to set the default payment method
  };

  return (
    <>
      <Helmet>
        <title>Payment Methods | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Manage your payment methods and view your transaction history."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">Payment Settings</h1>

            <div className="grid grid-cols-1 gap-8">
              <PaymentMethodsManager
                onAddPaymentMethod={handleAddPaymentMethod}
                onRemovePaymentMethod={handleRemovePaymentMethod}
                onSetDefaultPaymentMethod={handleSetDefaultPaymentMethod}
              />

              <PaymentHistory />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PaymentMethodsPage;
