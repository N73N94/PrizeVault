import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Download, Eye, Receipt } from "lucide-react";

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
  raffleId?: string;
  raffleTitle?: string;
}

interface PaymentHistoryProps {
  transactions?: Transaction[];
}

const PaymentHistory = ({
  transactions = [
    {
      id: "TXN-12345678",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      amount: 100,
      description: "Purchase of 1 ticket for Luxury Sports Car Raffle",
      status: "completed" as const,
      paymentMethod: "Visa •••• 4242",
      raffleId: "raffle-1",
      raffleTitle: "Luxury Sports Car Raffle",
    },
    {
      id: "TXN-23456789",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      amount: 500,
      description: "Purchase of 5 tickets for Beachfront Villa Raffle",
      status: "completed" as const,
      paymentMethod: "PayPal",
      raffleId: "raffle-2",
      raffleTitle: "Beachfront Villa Raffle",
    },
    {
      id: "TXN-34567890",
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      amount: 150,
      description: "Purchase of 3 tickets for Luxury Watch Collection",
      status: "completed" as const,
      paymentMethod: "Mastercard •••• 5555",
      raffleId: "raffle-3",
      raffleTitle: "Luxury Watch Collection",
    },
    {
      id: "TXN-45678901",
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      amount: 50,
      description: "Purchase of 1 ticket for Electric Supercar Raffle",
      status: "failed" as const,
      paymentMethod: "Visa •••• 4242",
      raffleId: "raffle-4",
      raffleTitle: "Electric Supercar Raffle",
    },
  ],
}: PaymentHistoryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5 text-primary" />
              Payment History
            </CardTitle>
            <CardDescription>
              View and download your transaction receipts
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Payment Method
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-xs">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{transaction.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        {transaction.status === "completed" && (
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Receipt className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
            <p className="text-gray-500 mb-4">
              Your payment history will appear here once you make a purchase.
            </p>
            <Button>Browse Raffles</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
