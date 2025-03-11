import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, DollarSign, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";

interface RaffleCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  prizeValue?: number;
  ticketPrice?: number;
  endDate?: Date;
  totalTickets?: number;
  soldTickets?: number;
  category?: "vehicles" | "real-estate" | "luxury";
  onClick?: () => void;
}

const RaffleCard = ({
  id = "1",
  title = "Luxury Sports Car Raffle",
  description = "Win this stunning high-performance sports car with premium features and incredible handling.",
  imageUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  prizeValue = 150000,
  ticketPrice = 100,
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  totalTickets = 5000,
  soldTickets = 3750,
  category = "vehicles",
  onClick = () => (window.location.href = `/raffle/${id}`),
}: RaffleCardProps) => {
  // Calculate percentage of tickets sold
  const percentageSold = Math.round((soldTickets / totalTickets) * 100);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const timeRemaining = endDate.getTime() - now.getTime();

    if (timeRemaining <= 0) return "Ended";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <Card className="w-full max-w-[350px] h-[450px] overflow-hidden flex flex-col bg-white transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold py-1 px-2 rounded-full">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-1">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-green-600" />
            <span className="font-semibold">{formatCurrency(prizeValue)}</span>
          </div>
          <div className="flex items-center">
            <Ticket className="h-4 w-4 mr-1 text-blue-600" />
            <span className="font-semibold">{formatCurrency(ticketPrice)}</span>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span>{soldTickets} sold</span>
            <span>{totalTickets - soldTickets} remaining</span>
          </div>
          <Progress value={percentageSold} className="h-2" />
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{getTimeRemaining()}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={onClick}
          className="w-full bg-primary hover:bg-primary/90"
        >
          View Raffle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RaffleCard;
