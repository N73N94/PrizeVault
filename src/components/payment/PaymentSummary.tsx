import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Gift, Ticket, Clock, Info } from "lucide-react";

interface PaymentSummaryProps {
  raffleTitle: string;
  ticketCount: number;
  ticketPrice: number;
  totalPrice: number;
  discountAmount?: number;
  discountCode?: string;
  winningOdds?: number;
  drawDate?: Date;
  onProceed: () => void;
  onCancel: () => void;
}

const PaymentSummary = ({
  raffleTitle,
  ticketCount,
  ticketPrice,
  totalPrice,
  discountAmount = 0,
  discountCode = "",
  winningOdds = 0,
  drawDate,
  onProceed,
  onCancel,
}: PaymentSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your ticket purchase</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">{raffleTitle}</h3>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Ticket Price:</span>
            <span>{formatCurrency(ticketPrice)} each</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Quantity:</span>
            <span>
              {ticketCount} ticket{ticketCount !== 1 ? "s" : ""}
            </span>
          </div>
          {drawDate && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Drawing Date:</span>
              <span>{formatDate(drawDate)}</span>
            </div>
          )}
        </div>

        {winningOdds > 0 && (
          <div className="bg-primary/10 p-4 rounded-lg flex items-start">
            <Info className="h-5 w-5 mr-2 mt-0.5 text-primary" />
            <div>
              <p className="font-medium">Your Winning Odds</p>
              <p className="text-sm text-gray-600">
                With {ticketCount} ticket{ticketCount !== 1 ? "s" : ""}, you
                have a {winningOdds}% chance of winning.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal:</span>
            <span>{formatCurrency(ticketPrice * ticketCount)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span className="flex items-center">
                <Gift className="h-4 w-4 mr-1" />
                Discount {discountCode && `(${discountCode})`}:
              </span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>
          )}

          <Separator className="my-2" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" onClick={onProceed}>
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Payment
        </Button>
        <Button variant="outline" className="w-full" onClick={onCancel}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSummary;
