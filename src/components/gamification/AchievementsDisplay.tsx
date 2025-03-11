import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  type: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  dateUnlocked?: Date;
  icon?: React.ReactNode;
  category: "purchases" | "raffles" | "social" | "loyalty";
}

interface AchievementsDisplayProps {
  achievements?: Achievement[];
  totalUnlocked?: number;
  totalAchievements?: number;
}

const AchievementsDisplay = ({
  achievements = [
    {
      id: "first-purchase",
      type: "first-purchase",
      name: "First Steps",
      description: "Make your first ticket purchase",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      dateUnlocked: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      category: "purchases" as const,
    },
    {
      id: "big-spender",
      type: "big-spender",
      name: "Big Spender",
      description: "Purchase tickets worth $1,000 in total",
      unlocked: true,
      progress: 1000,
      maxProgress: 1000,
      dateUnlocked: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      category: "purchases" as const,
    },
    {
      id: "collector",
      type: "collector",
      name: "Collector",
      description: "Enter 10 different raffles",
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      category: "raffles" as const,
    },
    {
      id: "early-bird",
      type: "early-bird",
      name: "Early Bird",
      description: "Be among the first 10 entrants in a raffle",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      dateUnlocked: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      category: "raffles" as const,
    },
    {
      id: "winner",
      type: "winner",
      name: "Winner",
      description: "Win your first raffle",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      dateUnlocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      category: "raffles" as const,
    },
    {
      id: "streak",
      type: "streak",
      name: "Dedicated Fan",
      description: "Enter raffles for 5 consecutive weeks",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      category: "loyalty" as const,
    },
    {
      id: "referral-master",
      type: "referral-master",
      name: "Referral Master",
      description: "Refer 5 friends who make a purchase",
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      category: "social" as const,
    },
    {
      id: "social-butterfly",
      type: "custom",
      name: "Social Butterfly",
      description: "Share 3 raffles on social media",
      unlocked: true,
      progress: 3,
      maxProgress: 3,
      dateUnlocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      icon: <Share2 />,
      category: "social" as const,
    },
    {
      id: "loyal-customer",
      type: "loyal-customer",
      name: "Loyal Customer",
      description: "Reach Silver tier in the loyalty program",
      unlocked: false,
      progress: 750,
      maxProgress: 1000,
      category: "loyalty" as const,
    },
    {
      id: "high-roller",
      type: "custom",
      name: "High Roller",
      description: "Purchase 50 tickets for a single raffle",
      unlocked: false,
      progress: 25,
      maxProgress: 50,
      icon: <Ticket />,
      category: "purchases" as const,
    },
    {
      id: "jackpot",
      type: "custom",
      name: "Jackpot",
      description: "Win a prize worth over $10,000",
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      dateUnlocked: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      icon: <Trophy />,
      category: "raffles" as const,
    },
    {
      id: "community",
      type: "community",
      name: "Community Member",
      description: "Comment on 5 different raffles",
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      category: "social" as const,
    },
  ],
  totalUnlocked = 6,
  totalAchievements = 12,
}: AchievementsDisplayProps) => {
  const progressPercentage = Math.round(
    (totalUnlocked / totalAchievements) * 100,
  );

  // Group achievements by category
  const purchasesAchievements = achievements.filter(
    (a) => a.category === "purchases",
  );
  const rafflesAchievements = achievements.filter(
    (a) => a.category === "raffles",
  );
  const socialAchievements = achievements.filter(
    (a) => a.category === "social",
  );
  const loyaltyAchievements = achievements.filter(
    (a) => a.category === "loyalty",
  );

  // Sort achievements: unlocked first (by date), then by progress percentage
  const sortAchievements = (achievements: Achievement[]) => {
    return [...achievements].sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      if (a.unlocked && b.unlocked) {
        if (a.dateUnlocked && b.dateUnlocked) {
          return b.dateUnlocked.getTime() - a.dateUnlocked.getTime();
        }
        return 0;
      }
      const aProgress = a.progress / a.maxProgress;
      const bProgress = b.progress / b.maxProgress;
      return bProgress - aProgress;
    });
  };

  // Simple achievement badge component
  const AchievementBadge = ({ achievement }: { achievement: Achievement }) => {
    const progress = Math.round(
      (achievement.progress / achievement.maxProgress) * 100,
    );

    return (
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${achievement.unlocked ? "bg-primary/20" : "bg-gray-200"}`}
        >
          {achievement.icon ||
            (achievement.type === "first-purchase" ? (
              <Ticket className="h-8 w-8 text-primary" />
            ) : achievement.type === "big-spender" ? (
              <Gift className="h-8 w-8 text-primary" />
            ) : achievement.type === "collector" ? (
              <Star className="h-8 w-8 text-primary" />
            ) : achievement.type === "early-bird" ? (
              <Clock className="h-8 w-8 text-primary" />
            ) : achievement.type === "winner" ? (
              <Trophy className="h-8 w-8 text-primary" />
            ) : achievement.type === "streak" ? (
              <Zap className="h-8 w-8 text-primary" />
            ) : achievement.type === "referral-master" ? (
              <Users className="h-8 w-8 text-primary" />
            ) : achievement.type === "loyal-customer" ? (
              <Heart className="h-8 w-8 text-primary" />
            ) : achievement.type === "community" ? (
              <Users className="h-8 w-8 text-primary" />
            ) : (
              <Award className="h-8 w-8 text-primary" />
            ))}
        </div>
        <h3 className="font-medium text-sm">{achievement.name}</h3>
        <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
        {achievement.unlocked ? (
          <Badge
            variant="outline"
            className="mt-2 bg-green-50 text-green-700 border-green-200"
          >
            Unlocked
          </Badge>
        ) : (
          <div className="w-full mt-2">
            <div className="text-xs text-gray-500 mb-1">
              {achievement.progress}/{achievement.maxProgress}
            </div>
            <Progress value={progress} className="h-1" />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Award className="mr-2 h-5 w-5 text-primary" />
          Achievements
        </CardTitle>
        <CardDescription>
          Track your progress and unlock special badges
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm">
              {totalUnlocked} / {totalAchievements}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="raffles">Raffles</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="loyalty">Loyalty</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortAchievements(achievements).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchases" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortAchievements(purchasesAchievements).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="raffles" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortAchievements(rafflesAchievements).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortAchievements(socialAchievements).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="loyalty" className="pt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {sortAchievements(loyaltyAchievements).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AchievementsDisplay;

// Helper component for the share icon
function Share2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
