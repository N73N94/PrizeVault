import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import LoyaltyPointsDisplay from "@/components/gamification/LoyaltyPointsDisplay";
import AchievementsDisplay from "@/components/gamification/AchievementsDisplay";
import ReferralProgram from "@/components/gamification/ReferralProgram";
import LimitedTimeOffers from "@/components/gamification/LimitedTimeOffers";
import RewardsTierInfo from "@/components/gamification/RewardsTierInfo";
import { Award, Gift, Users, Zap, Clock, ArrowRight } from "lucide-react";

const RewardsPage = () => {
  const { user } = useAuth();

  // Mock user rewards data
  const userRewards = {
    points: 750,
    nextTierPoints: 1000,
    tier: "Bronze" as const,
    referralCode: "USER123",
    referralCount: 5,
    achievements: {
      total: 12,
      unlocked: 6,
    },
    pointsHistory: [
      {
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        amount: 100,
        description: "Ticket purchase",
      },
      {
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        amount: 150,
        description: "Ticket purchase",
      },
      {
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        amount: 200,
        description: "Referral bonus",
      },
      {
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        amount: 100,
        description: "Ticket purchase",
      },
      {
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        amount: 100,
        description: "Ticket purchase",
      },
      {
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        amount: 100,
        description: "Ticket purchase",
      },
    ],
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Rewards & Loyalty | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Track your loyalty points, achievements, and exclusive offers in our rewards program."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />

        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Hero section */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">
                Rewards & Loyalty Program
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Earn points with every purchase, unlock achievements, and enjoy
                exclusive benefits as you progress through our loyalty tiers.
              </p>
            </div>

            {/* Points summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <LoyaltyPointsDisplay
                    points={userRewards.points}
                    nextTierPoints={userRewards.nextTierPoints}
                    tier={userRewards.tier}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Available Points</h3>
                      <p className="text-3xl font-bold">{userRewards.points}</p>
                    </div>
                    <Button>
                      Redeem Points
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex flex-col h-full justify-between">
                  <div className="text-center mb-4">
                    <Award className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-medium">Achievements</h3>
                    <p className="text-2xl font-bold">
                      {userRewards.achievements.unlocked} /{" "}
                      {userRewards.achievements.total}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document
                        .getElementById("achievements-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    View Achievements
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 flex flex-col h-full justify-between">
                  <div className="text-center mb-4">
                    <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-medium">Referrals</h3>
                    <p className="text-2xl font-bold">
                      {userRewards.referralCount}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      document
                        .getElementById("referrals-section")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Invite Friends
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main content tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tiers">Tiers</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                {/* Quick stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Current Tier</p>
                          <p className="text-xl font-bold">
                            {userRewards.tier}
                          </p>
                        </div>
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${userRewards.tier === "Bronze" ? "bg-amber-700" : userRewards.tier === "Silver" ? "bg-gray-400" : "bg-yellow-500"} text-white`}
                        >
                          <Award className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Points to Next Tier
                          </p>
                          <p className="text-xl font-bold">
                            {userRewards.nextTierPoints - userRewards.points}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Achievements</p>
                          <p className="text-xl font-bold">
                            {userRewards.achievements.unlocked} /{" "}
                            {userRewards.achievements.total}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                          <Gift className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Referral Bonus
                          </p>
                          <p className="text-xl font-bold">100 pts</p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                          <Users className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Achievements section */}
                <div id="achievements-section">
                  <AchievementsDisplay />
                </div>

                {/* Referral program section */}
                <div id="referrals-section">
                  <ReferralProgram
                    referralCode={userRewards.referralCode}
                    referralCount={userRewards.referralCount}
                  />
                </div>

                {/* Limited time offers */}
                <LimitedTimeOffers />
              </TabsContent>

              <TabsContent value="tiers" className="space-y-8">
                <RewardsTierInfo
                  currentTier={userRewards.tier}
                  currentPoints={userRewards.points}
                />
              </TabsContent>

              <TabsContent value="offers" className="space-y-8">
                <LimitedTimeOffers />
              </TabsContent>

              <TabsContent value="history" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-primary" />
                      Points History
                    </CardTitle>
                    <CardDescription>
                      Track your points earned and redeemed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userRewards.pointsHistory.map((entry, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{entry.description}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(entry.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">
                              +{entry.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RewardsPage;
