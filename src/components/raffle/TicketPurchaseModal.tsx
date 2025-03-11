import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PaymentSummary from "@/components/payment/PaymentSummary";
import PaymentForm from "@/components/payment/PaymentForm";

interface TicketPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  raffleTitle: string;
  ticketCount: number;
  ticketPrice: number;
  totalPrice: number;
  discountAmount?: number;
  discountCode?: string;
  winningOdds?: number;
  drawDate?: Date;
}

const TicketPurchaseModal = ({
  isOpen,
  onClose,
  raffleTitle,
  ticketCount,
  ticketPrice,
  totalPrice,
  discountAmount = 0,
  discountCode = "",
  winningOdds = 0,
  drawDate,
}: TicketPurchaseModalProps) => {
  const [step, setStep] = useState<"summary" | "payment">("summary");
  const [transactionComplete, setTransactionComplete] = useState(false);

  const handleProceedToPayment = () => {
    setStep("payment");
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setTransactionComplete(true);
    // In a real app, you would update the user's tickets in the database
    setTimeout(() => {
      onClose();
      // Reset the state for next time
      setTimeout(() => {
        setStep("summary");
        setTransactionComplete(false);
      }, 500);
    }, 2000);
  };

  const handleCancel = () => {
    onClose();
    // Reset the state for next time
    setTimeout(() => {
      setStep("summary");
      setTransactionComplete(false);
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === "summary" ? "Purchase Tickets" : "Payment"}
          </DialogTitle>
          <DialogDescription>
            {step === "summary"
              ? `You are purchasing ${ticketCount} ticket${ticketCount !== 1 ? "s" : ""} for ${raffleTitle}`
              : "Complete your payment to purchase tickets"}
          </DialogDescription>
        </DialogHeader>

        {step === "summary" ? (
          <PaymentSummary
            raffleTitle={raffleTitle}
            ticketCount={ticketCount}
            ticketPrice={ticketPrice}
            totalPrice={totalPrice}
            discountAmount={discountAmount}
            discountCode={discountCode}
            winningOdds={winningOdds}
            drawDate={drawDate}
            onProceed={handleProceedToPayment}
            onCancel={handleCancel}
          />
        ) : (
          <PaymentForm
            amount={totalPrice}
            ticketCount={ticketCount}
            raffleTitle={raffleTitle}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setStep("summary")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TicketPurchaseModal;
