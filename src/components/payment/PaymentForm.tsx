import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  AlertCircle,
  PaypalIcon,
  AppleIcon,
  GooglePayIcon,
} from "./PaymentIcons";

interface PaymentFormProps {
  amount: number;
  ticketCount: number;
  raffleTitle?: string;
  onSuccess?: (transactionId: string) => void;
  onCancel?: () => void;
}

const PaymentForm = ({
  amount = 100,
  ticketCount = 1,
  raffleTitle = "Luxury Raffle",
  onSuccess,
  onCancel,
}: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const validateForm = () => {
    if (paymentMethod === "credit-card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        setError("Please enter a valid card number");
        return false;
      }
      if (!cardName) {
        setError("Please enter the cardholder name");
        return false;
      }
      if (!expiryDate || expiryDate.length < 5) {
        setError("Please enter a valid expiry date (MM/YY)");
        return false;
      }
      if (!cvv || cvv.length < 3) {
        setError("Please enter a valid CVV code");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a mock transaction ID
      const transactionId = `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      setSuccess(true);

      // Call the success callback with the transaction ID
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(transactionId);
        }, 1500);
      }
    } catch (err) {
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-center">Payment Successful!</CardTitle>
          <CardDescription className="text-center">
            Your payment of {formatCurrency(amount)} has been processed
            successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Raffle:</span>
              <span className="font-medium">{raffleTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tickets:</span>
              <span className="font-medium">{ticketCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount:</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => navigate("/dashboard")}>
            View My Tickets
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your purchase of {ticketCount} ticket
          {ticketCount !== 1 ? "s" : ""} for {raffleTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Subtotal:</span>
            <span>{formatCurrency(amount)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(amount)}</span>
          </div>
        </div>

        <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="credit-card"
              className="flex flex-col items-center py-2"
            >
              <CreditCard className="h-5 w-5 mb-1" />
              <span className="text-xs">Card</span>
            </TabsTrigger>
            <TabsTrigger
              value="paypal"
              className="flex flex-col items-center py-2"
            >
              <PaypalIcon className="h-5 w-5 mb-1" />
              <span className="text-xs">PayPal</span>
            </TabsTrigger>
            <TabsTrigger
              value="apple-pay"
              className="flex flex-col items-center py-2"
            >
              <AppleIcon className="h-5 w-5 mb-1" />
              <span className="text-xs">Apple</span>
            </TabsTrigger>
            <TabsTrigger
              value="google-pay"
              className="flex flex-col items-center py-2"
            >
              <GooglePayIcon className="h-5 w-5 mb-1" />
              <span className="text-xs">Google</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="credit-card" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={4}
                      type="password"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="paypal" className="mt-4">
            <div className="text-center py-8 space-y-4">
              <PaypalIcon className="h-12 w-12 mx-auto text-blue-600" />
              <p>You will be redirected to PayPal to complete your payment.</p>
            </div>
          </TabsContent>

          <TabsContent value="apple-pay" className="mt-4">
            <div className="text-center py-8 space-y-4">
              <AppleIcon className="h-12 w-12 mx-auto" />
              <p>Pay quickly and securely with Apple Pay.</p>
            </div>
          </TabsContent>

          <TabsContent value="google-pay" className="mt-4">
            <div className="text-center py-8 space-y-4">
              <GooglePayIcon className="h-12 w-12 mx-auto" />
              <p>Pay quickly and securely with Google Pay.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Processing...
            </>
          ) : (
            `Pay ${formatCurrency(amount)}`
          )}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentForm;
