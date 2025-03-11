import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface PaymentMethod {
  id: string;
  type: "credit-card" | "paypal" | "apple-pay" | "google-pay";
  isDefault: boolean;
  lastFour?: string;
  expiryDate?: string;
  cardType?: string;
  cardholderName?: string;
  email?: string;
}

interface PaymentMethodsManagerProps {
  paymentMethods?: PaymentMethod[];
  onAddPaymentMethod?: (method: Omit<PaymentMethod, "id">) => void;
  onRemovePaymentMethod?: (id: string) => void;
  onSetDefaultPaymentMethod?: (id: string) => void;
}

const PaymentMethodsManager = ({
  paymentMethods = [
    {
      id: "pm-1",
      type: "credit-card" as const,
      isDefault: true,
      lastFour: "4242",
      expiryDate: "12/25",
      cardType: "Visa",
      cardholderName: "John Doe",
    },
    {
      id: "pm-2",
      type: "credit-card" as const,
      isDefault: false,
      lastFour: "5555",
      expiryDate: "10/24",
      cardType: "Mastercard",
      cardholderName: "John Doe",
    },
    {
      id: "pm-3",
      type: "paypal" as const,
      isDefault: false,
      email: "john.doe@example.com",
    },
  ],
  onAddPaymentMethod = () => {},
  onRemovePaymentMethod = () => {},
  onSetDefaultPaymentMethod = () => {},
}: PaymentMethodsManagerProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<
    string | null
  >(null);

  // New payment method form state
  const [newPaymentType, setNewPaymentType] = useState<
    "credit-card" | "paypal"
  >("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    if (newPaymentType === "credit-card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 16) {
        setFormError("Please enter a valid card number");
        return false;
      }
      if (!cardholderName) {
        setFormError("Please enter the cardholder name");
        return false;
      }
      if (!expiryDate || expiryDate.length < 5) {
        setFormError("Please enter a valid expiry date (MM/YY)");
        return false;
      }
      if (!cvv || cvv.length < 3) {
        setFormError("Please enter a valid CVV code");
        return false;
      }
    } else if (newPaymentType === "paypal") {
      if (!paypalEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalEmail)) {
        setFormError("Please enter a valid email address");
        return false;
      }
    }
    return true;
  };

  const handleAddPaymentMethod = async () => {
    setFormError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (newPaymentType === "credit-card") {
        const lastFour = cardNumber.replace(/\s/g, "").slice(-4);
        const cardType = cardNumber.startsWith("4") ? "Visa" : "Mastercard";

        onAddPaymentMethod({
          type: "credit-card",
          isDefault: paymentMethods.length === 0,
          lastFour,
          expiryDate,
          cardType,
          cardholderName,
        });
      } else if (newPaymentType === "paypal") {
        onAddPaymentMethod({
          type: "paypal",
          isDefault: paymentMethods.length === 0,
          email: paypalEmail,
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsAddDialogOpen(false);
        resetForm();
      }, 1500);
    } catch (error) {
      setFormError("Failed to add payment method. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewPaymentType("credit-card");
    setCardNumber("");
    setCardholderName("");
    setExpiryDate("");
    setCvv("");
    setPaypalEmail("");
    setFormError(null);
  };

  const handleRemovePaymentMethod = (id: string) => {
    setSelectedPaymentMethodId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmRemovePaymentMethod = () => {
    if (selectedPaymentMethodId) {
      onRemovePaymentMethod(selectedPaymentMethodId);
      setIsDeleteDialogOpen(false);
      setSelectedPaymentMethodId(null);
    }
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    onSetDefaultPaymentMethod(id);
  };

  const getCardIcon = (cardType?: string) => {
    return <CreditCard className="h-5 w-5" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-5 w-5 text-primary" />
          Payment Methods
        </CardTitle>
        <CardDescription>Manage your saved payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center">
                  {method.type === "credit-card" ? (
                    <>
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        {getCardIcon(method.cardType)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {method.cardType} •••• {method.lastFour}
                          {method.isDefault && (
                            <Badge className="ml-2 bg-green-500">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          Expires {method.expiryDate}
                        </div>
                      </div>
                    </>
                  ) : method.type === "paypal" ? (
                    <>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 11.5a2 2 0 0 1 2-2h1.5a2.5 2.5 0 0 1 0 5H9a2 2 0 0 1-2-2v-1Z" />
                          <path d="M11 9.5h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1.5a2.5 2.5 0 0 0 0-5Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">
                          PayPal
                          {method.isDefault && (
                            <Badge className="ml-2 bg-green-500">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          {method.email}
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="flex space-x-2">
                  {!method.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefaultPaymentMethod(method.id)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePaymentMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No payment methods</h3>
              <p className="text-gray-500 mb-4">
                Add a payment method to make purchases faster.
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Payment Method Added
                </h2>
                <p className="text-gray-500 text-center">
                  Your payment method has been successfully added.
                </p>
              </div>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Add a new payment method to your account.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="payment-type">Payment Type</Label>
                    <Select
                      value={newPaymentType}
                      onValueChange={(value: "credit-card" | "paypal") =>
                        setNewPaymentType(value)
                      }
                    >
                      <SelectTrigger id="payment-type">
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {newPaymentType === "credit-card" ? (
                    <>
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
                        <Label htmlFor="cardholder-name">Cardholder Name</Label>
                        <Input
                          id="cardholder-name"
                          placeholder="John Doe"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
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
                    </>
                  ) : newPaymentType === "paypal" ? (
                    <div className="grid gap-2">
                      <Label htmlFor="paypal-email">PayPal Email</Label>
                      <Input
                        id="paypal-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                      />
                    </div>
                  ) : null}

                  {formError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddPaymentMethod}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Adding...
                      </>
                    ) : (
                      "Add Payment Method"
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove this payment method? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmRemovePaymentMethod}
                className="bg-red-500 hover:bg-red-600"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PaymentMethodsManager;
