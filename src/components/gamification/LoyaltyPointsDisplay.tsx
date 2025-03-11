import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star, Award, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoyaltyPointsDisplayProps {
  points: number;
  nextTierPoints: number;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  className?: string;
  compact?: boolean;
}

const LoyaltyPointsDisplay = ({
  points = 0,
  nextTierPoints = 1000,
  tier = "Bronze",
  className,
  compact = false,
}: LoyaltyPointsDisplayProps) => {
  const progress = Math.min(Math.round((points / nextTierPoints) * 100), 100);

  const getTierIcon = () => {
    switch (tier) {
      case "Gold":
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case "Silver":
        return <Award className="h-5 w-5 text-gray-400" />;
      case "Platinum":
        return <Award className="h-5 w-5 text-blue-500" />;
      case "Bronze":
      default:
        return <Award className="h-5 w-5 text-amber-700" />;
    }
  };

  const getTierColor = () => {
    switch (tier) {
      case "Gold":
        return "bg-yellow-500";
      case "Silver":
        return "bg-gray-400";
      case "Platinum":
        return "bg-blue-500";
      case "Bronze":
      default:
        return "bg-amber-700";
    }
  };

  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        {getTierIcon()}
        <div className="flex-1">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-medium">{tier}</span>
            <span>
              {points} / {nextTierPoints}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full bg-gray-50 p-4 rounded-lg", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {getTierIcon()}
          <span className="ml-2 font-medium">Membership Level</span>
        </div>
        <Badge className={cn("text-white", getTierColor())}>{tier}</Badge>
      </div>
      <div className="mb-1">
        <div className="flex justify-between text-xs mb-1">
          <span>{points} points</span>
          <span>{nextTierPoints} points for next tier</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default LoyaltyPointsDisplay;
