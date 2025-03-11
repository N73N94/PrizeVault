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
import { Progress } from "@/components/ui/progress";
import { Clock, Zap, Ticket, Gift, AlertCircle } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  expiresAt: Date;
  imageUrl?: string;
  code?: string;
  minPurchase?: number;
  maxDiscount?: number;
  isExclusive?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isLimited?: boolean;
  limitedQuantity?: number;
  remainingQuantity?: number;
}

interface LimitedTimeOffersProps {
  offers?: Offer[];
}

const LimitedTimeOffers = ({
  offers = [
    {
      id: "offer-1",
      title: "Weekend Flash Sale",
      description: "Get 20% off on all ticket purchases this weekend only!",
      discount: 20,
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      code: "WEEKEND20",
      isPopular: true,
    },
    {
      id: "offer-2",
      title: "New Member Bonus",
      description: "New members get 10% extra tickets on their first purchase",
      discount: 10,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isNew: true,
    },
    {
      id: "offer-3",
      title: "Silver Tier Exclusive",
      description: "Silver tier members get 15% off luxury item raffles",
      discount: 15,
      expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      isExclusive: true,
    },
    {
      id: "offer-4",
      title: "Limited Quantity Bundle",
      description: "Buy 10 tickets, get 5 free. Limited to 100 redemptions.",
      discount: 33,
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      isLimited: true,
      limitedQuantity: 100,
      remainingQuantity: 37,
    },
  ],
}: LimitedTimeOffersProps) => {
  // Sort offers: expiring soon first, then by discount amount
  const sortedOffers = [...offers].sort((a, b) => {
    const aTimeLeft = a.expiresAt.getTime() - Date.now();
    const bTimeLeft = b.expiresAt.getTime() - Date.now();
    if (aTimeLeft < bTimeLeft) return -1;
    if (aTimeLeft > bTimeLeft) return 1;
    return b.discount - a.discount;
  });

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const timeRemaining = expiresAt.getTime() - now.getTime();

    if (timeRemaining <= 0) return "Expired";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5 text-primary" />
          Limited Time Offers
        </CardTitle>
        <CardDescription>
          Special promotions and discounts available for a limited time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedOffers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden">
              <div className="relative">
                {offer.imageUrl && (
                  <div className="h-32 overflow-hidden">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                  {offer.isNew && <Badge className="bg-blue-500">NEW</Badge>}
                  {offer.isPopular && (
                    <Badge className="bg-orange-500">POPULAR</Badge>
                  )}
                  {offer.isExclusive && (
                    <Badge className="bg-purple-500">EXCLUSIVE</Badge>
                  )}
                </div>
              </div>
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{offer.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-primary border-primary"
                  >
                    {offer.discount}% OFF
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {offer.description}
                </p>

                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Clock className="h-4 w-4 mr-1 text-orange-500" />
                  <span>{getTimeRemaining(offer.expiresAt)}</span>
                </div>

                {offer.isLimited &&
                  offer.limitedQuantity &&
                  offer.remainingQuantity && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Limited quantity</span>
                        <span className="font-medium">
                          {offer.remainingQuantity} / {offer.limitedQuantity}{" "}
                          remaining
                        </span>
                      </div>
                      <Progress
                        value={
                          (offer.remainingQuantity / offer.limitedQuantity) *
                          100
                        }
                        className="h-1.5"
                      />
                    </div>
                  )}

                {offer.code && (
                  <div className="bg-gray-50 p-2 rounded-md flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Ticket className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-mono font-medium">
                        {offer.code}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Copy
                    </Button>
                  </div>
                )}

                {offer.minPurchase && (
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Minimum purchase: ${offer.minPurchase}</span>
                  </div>
                )}

                {offer.maxDiscount && (
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    <span>Maximum discount: ${offer.maxDiscount}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full">
                  <Gift className="mr-2 h-4 w-4" />
                  Claim Offer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LimitedTimeOffers;
