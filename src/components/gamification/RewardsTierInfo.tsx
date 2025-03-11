import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Star, Gift, Ticket, Clock, Shield, Zap } from "lucide-react";

interface TierBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

interface RewardsTier {
  name: string;
  pointsRequired: number;
  color: string;
  benefits: TierBenefit[];
}

interface RewardsTierInfoProps {
  currentTier?: string;
  currentPoints?: number;
  tiers?: RewardsTier[];
}

const RewardsTierInfo = ({
  currentTier = "Bronze",
  currentPoints = 750,
  tiers = [
    {
      name: "Bronze",
      pointsRequired: 0,
      color: "bg-amber-700",
      benefits: [
        {
          icon: <Ticket className="h-4 w-4" />,
          title: "Standard Raffles",
          description: "Access to all standard raffles",
        },
        {
          icon: <Clock className="h-4 w-4" />,
          title: "Regular Notifications",
          description: "Email notifications for new raffles and results",
        },
        {
          icon: <Star className="h-4 w-4" />,
          title: "Basic Rewards",
          description: "Earn 1 point for every $1 spent",
        },
      ],
    },
    {
      name: "Silver",
      pointsRequired: 1000,
      color: "bg-gray-400",
      benefits: [
        {
          icon: <Ticket className="h-4 w-4" />,
          title: "Standard Raffles",
          description: "Access to all standard raffles",
        },
        {
          icon: <Clock className="h-4 w-4" />,
          title: "Early Access",
          description: "24-hour early access to new raffles",
          highlight: true,
        },
        {
          icon: <Star className="h-4 w-4" />,
          title: "Enhanced Rewards",
          description: "Earn 1.25 points for every $1 spent",
          highlight: true,
        },
        {
          icon: <Gift className="h-4 w-4" />,
          title: "Bonus Tickets",
          description: "5% bonus tickets on all purchases",
          highlight: true,
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Birthday Bonus",
          description: "Double points on your birthday",
          highlight: true,
        },
      ],
    },
    {
      name: "Gold",
      pointsRequired: 5000,
      color: "bg-yellow-500",
      benefits: [
        {
          icon: <Ticket className="h-4 w-4" />,
          title: "Premium Raffles",
          description: "Access to exclusive VIP-only raffles",
          highlight: true,
        },
        {
          icon: <Clock className="h-4 w-4" />,
          title: "Priority Access",
          description: "48-hour early access to new raffles",
          highlight: true,
        },
        {
          icon: <Star className="h-4 w-4" />,
          title: "Premium Rewards",
          description: "Earn 1.5 points for every $1 spent",
          highlight: true,
        },
        {
          icon: <Gift className="h-4 w-4" />,
          title: "Generous Bonus",
          description: "10% bonus tickets on all purchases",
          highlight: true,
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Birthday Extravaganza",
          description: "Triple points and a free ticket on your birthday",
          highlight: true,
        },
        {
          icon: <Shield className="h-4 w-4" />,
          title: "Priority Support",
          description: "Dedicated customer service line",
          highlight: true,
        },
      ],
    },
    {
      name: "Platinum",
      pointsRequired: 10000,
      color: "bg-blue-500",
      benefits: [
        {
          icon: <Ticket className="h-4 w-4" />,
          title: "All Raffles",
          description: "Access to all raffles including ultra-exclusive events",
          highlight: true,
        },
        {
          icon: <Clock className="h-4 w-4" />,
          title: "VIP Access",
          description: "72-hour early access to new raffles",
          highlight: true,
        },
        {
          icon: <Star className="h-4 w-4" />,
          title: "Elite Rewards",
          description: "Earn 2 points for every $1 spent",
          highlight: true,
        },
        {
          icon: <Gift className="h-4 w-4" />,
          title: "Maximum Bonus",
          description: "15% bonus tickets on all purchases",
          highlight: true,
        },
        {
          icon: <Zap className="h-4 w-4" />,
          title: "Birthday Celebration",
          description: "Quadruple points and 5 free tickets on your birthday",
          highlight: true,
        },
        {
          icon: <Shield className="h-4 w-4" />,
          title: "Concierge Service",
          description: "Personal concierge for all raffle needs",
          highlight: true,
        },
        {
          icon: <Award className="h-4 w-4" />,
          title: "Exclusive Events",
          description: "Invitations to VIP events and experiences",
          highlight: true,
        },
      ],
    },
  ],
}: RewardsTierInfoProps) => {
  // Find current tier object
  const currentTierObj =
    tiers.find((tier) => tier.name === currentTier) || tiers[0];

  // Find next tier
  const currentTierIndex = tiers.findIndex((tier) => tier.name === currentTier);
  const nextTier =
    currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null;

  // Calculate points needed for next tier
  const pointsForNextTier = nextTier
    ? nextTier.pointsRequired - currentPoints
    : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          Loyalty Program Tiers
        </CardTitle>
        <CardDescription>
          Unlock exclusive benefits as you progress through our loyalty tiers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div
              className={`w-4 h-4 rounded-full ${currentTierObj.color} mr-2`}
            ></div>
            <h3 className="font-medium">Current Tier: {currentTier}</h3>
          </div>
          {nextTier && (
            <p className="text-sm text-gray-500">
              Earn {pointsForNextTier} more points to reach {nextTier.name} tier
            </p>
          )}
        </div>

        <Tabs defaultValue={currentTier.toLowerCase()}>
          <TabsList className="grid w-full grid-cols-4">
            {tiers.map((tier) => (
              <TabsTrigger
                key={tier.name}
                value={tier.name.toLowerCase()}
                className="relative"
              >
                {tier.name === currentTier && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
                )}
                {tier.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {tiers.map((tier) => (
            <TabsContent
              key={tier.name}
              value={tier.name.toLowerCase()}
              className="pt-4"
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full ${tier.color} mr-2`}
                  ></div>
                  <h3 className="font-medium">{tier.name} Tier Benefits</h3>
                </div>

                <div className="grid gap-3">
                  {tier.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex p-3 rounded-lg ${benefit.highlight ? "bg-primary/10" : "bg-gray-50"}`}
                    >
                      <div
                        className={`mr-3 ${benefit.highlight ? "text-primary" : "text-gray-500"}`}
                      >
                        {benefit.icon}
                      </div>
                      <div>
                        <h4
                          className={`text-sm font-medium ${benefit.highlight ? "text-primary" : ""}`}
                        >
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-500">
                    {tier.pointsRequired > 0
                      ? `Required points: ${tier.pointsRequired.toLocaleString()}`
                      : "Default tier for all members"}
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RewardsTierInfo;
