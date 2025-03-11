import React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Award,
  Trophy,
  Star,
  Gift,
  Ticket,
  Clock,
  Target,
  Zap,
  Heart,
  Users,
} from "lucide-react";

type AchievementType =
  | "first-purchase"
  | "big-spender"
  | "early-bird"
  | "winner"
  | "loyal-customer"
  | "referral-master"
  | "collector"
  | "streak"
  | "community"
  | "custom";

interface AchievementBadgeProps {
  type: AchievementType;
  name: string;
  description: string;
  unlocked?: boolean;
  progress?: number;
  maxProgress?: number;
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const AchievementBadge = ({
  type,
  name,
  description,
  unlocked = false,
  progress = 0,
  maxProgress = 1,
  icon,
  className,
  size = "md",
}: AchievementBadgeProps) => {
  const getDefaultIcon = () => {
    switch (type) {
      case "first-purchase":
        return <Ticket />;
      case "big-spender":
        return <Star />;
      case "early-bird":
        return <Clock />;
      case "winner":
        return <Trophy />;
      case "loyal-customer":
        return <Heart />;
      case "referral-master":
        return <Users />;
      case "collector":
        return <Award />;
      case "streak":
        return <Zap />;
      case "community":
        return <Users />;
      default:
        return <Award />;
    }
  };

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const iconSizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const progressPercentage = Math.min(
    Math.round((progress / maxProgress) * 100),
    100,
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("flex flex-col items-center", className)}>
            <div
              className={cn(
                sizeClasses[size],
                "rounded-full flex items-center justify-center relative",
                unlocked ? "bg-primary/10" : "bg-gray-200",
              )}
            >
              {/* Progress circle */}
              {maxProgress > 1 && (
                <svg className="absolute inset-0" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className={unlocked ? "text-primary" : "text-gray-400"}
                    strokeWidth="8"
                    strokeDasharray={`${progressPercentage * 2.89}, 289`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                </svg>
              )}

              {/* Icon */}
              <div
                className={cn(
                  iconSizeClasses[size],
                  unlocked ? "text-primary" : "text-gray-400",
                )}
              >
                {icon || getDefaultIcon()}
              </div>
            </div>
            <span
              className={cn(
                "mt-2 font-medium text-center",
                size === "sm" ? "text-xs" : "text-sm",
                unlocked ? "text-gray-900" : "text-gray-500",
              )}
            >
              {name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 max-w-xs">
            <p className="font-semibold">{name}</p>
            <p className="text-sm">{description}</p>
            {maxProgress > 1 && (
              <p className="text-xs">
                Progress: {progress}/{maxProgress} ({progressPercentage}%)
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;
