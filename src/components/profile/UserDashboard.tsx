import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Ticket,
  Trophy,
  Gift,
  Star,
  Clock,
  ArrowRight,
  Award,
  CreditCard,
} from "lucide-react";
import LoyaltyPointsDisplay from "@/components/gamification/LoyaltyPointsDisplay";

interface UserStats {
  totalTickets: number;
  activeRaffles: number;
  wonRaffles: number;
  loyaltyPoints: number;
  nextTierPoints: number;
  membershipTier: string;
}

interface RaffleEntry {
  id: string;
  raffle_id: string;
  raffle_title: string;
  raffle_image: string;
  ticket_count: number;
  purchase_date: string;
  status: "active" | "completed" | "won";
  draw_date: string;
  prize_value: number;
}

const UserDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState<UserStats>({
    totalTickets: 0,
    activeRaffles: 0,
    wonRaffles: 0,
    loyaltyPoints: 0,
    nextTierPoints: 1000,
    membershipTier: "Bronze",
  });
  const [raffleEntries, setRaffleEntries] = useState<RaffleEntry[]>([]);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch profile data
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileData) {
        setProfileData(profileData);
      }

      // For demo purposes, we'll use mock data
      // In a real app, you would fetch this from your database
      setUserStats({
        totalTickets: 24,
        activeRaffles: 5,
        wonRaffles: 1,
        loyaltyPoints: 750,
        nextTierPoints: 1000,
        membershipTier: "Bronze",
      });

      setRaffleEntries([
        {
          id: "1",
          raffle_id: "raffle-1",
          raffle_title: "Luxury Sports Car Raffle",
          raffle_image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
          ticket_count: 5,
          purchase_date: new Date(
            Date.now() - 15 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "active",
          draw_date: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          prize_value: 150000,
        },
        {
          id: "2",
          raffle_id: "raffle-2",
          raffle_title: "Beachfront Villa Raffle",
          raffle_image:
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
          ticket_count: 10,
          purchase_date: new Date(
            Date.now() - 30 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "active",
          draw_date: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          prize_value: 2500000,
        },
        {
          id: "3",
          raffle_id: "raffle-3",
          raffle_title: "Luxury Watch Collection",
          raffle_image:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
          ticket_count: 3,
          purchase_date: new Date(
            Date.now() - 45 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "won",
          draw_date: new Date(
            Date.now() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          prize_value: 75000,
        },
        {
          id: "4",
          raffle_id: "raffle-4",
          raffle_title: "Electric Supercar Raffle",
          raffle_image:
            "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
          ticket_count: 2,
          purchase_date: new Date(
            Date.now() - 20 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "active",
          draw_date: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          prize_value: 200000,
        },
        {
          id: "5",
          raffle_id: "raffle-5",
          raffle_title: "Mountain Retreat Raffle",
          raffle_image:
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
          ticket_count: 4,
          purchase_date: new Date(
            Date.now() - 60 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          status: "completed",
          draw_date: new Date(
            Date.now() - 10 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          prize_value: 950000,
        },
      ]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTimeRemaining = (drawDate: string) => {
    const now = new Date();
    const draw = new Date(drawDate);
    const timeRemaining = draw.getTime() - now.getTime();

    if (timeRemaining <= 0) return "Ended";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "won":
        return <Badge className="bg-yellow-500">Winner!</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center">Please log in to view your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage
                src={
                  profileData?.avatar_url ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
                }
                alt="Profile picture"
              />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">
              {profileData?.full_name || user.email?.split("@")[0] || "User"}
            </h3>
            <p className="text-gray-500 mb-4">{user.email}</p>

            <div className="w-full mb-4">
              <LoyaltyPointsDisplay
                points={userStats.loyaltyPoints}
                nextTierPoints={userStats.nextTierPoints}
                tier={
                  userStats.membershipTier as
                    | "Bronze"
                    | "Silver"
                    | "Gold"
                    | "Platinum"
                }
              />
            </div>

            <div className="grid grid-cols-3 w-full gap-2 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <Ticket className="h-5 w-5 mx-auto mb-1 text-primary" />
                <p className="text-lg font-bold">{userStats.totalTickets}</p>
                <p className="text-xs text-gray-500">Tickets</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <Clock className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <p className="text-lg font-bold">{userStats.activeRaffles}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <Trophy className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
                <p className="text-lg font-bold">{userStats.wonRaffles}</p>
                <p className="text-xs text-gray-500">Wins</p>
              </div>
            </div>

            <Link to="/profile">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Main Dashboard Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="flex flex-col h-24 items-center justify-center"
                >
                  <Ticket className="h-6 w-6 mb-2" />
                  <span>Buy Tickets</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-24 items-center justify-center"
                >
                  <Gift className="h-6 w-6 mb-2" />
                  <span>Refer a Friend</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-24 items-center justify-center"
                >
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span>Payment Methods</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col h-24 items-center justify-center"
                >
                  <Award className="h-6 w-6 mb-2" />
                  <span>Rewards</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Raffle Entries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Your Raffle Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="won">Won</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                  {raffleEntries
                    .filter((entry) => entry.status === "active")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex flex-col md:flex-row border rounded-lg overflow-hidden"
                      >
                        <div className="w-full md:w-1/4 h-32 md:h-auto">
                          <img
                            src={entry.raffle_image}
                            alt={entry.raffle_title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">
                                {entry.raffle_title}
                              </h3>
                              {getStatusBadge(entry.status)}
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">Tickets</p>
                                <p className="font-medium">
                                  {entry.ticket_count}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Prize Value
                                </p>
                                <p className="font-medium">
                                  {formatCurrency(entry.prize_value)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Purchase Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.purchase_date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Drawing Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.draw_date)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{getTimeRemaining(entry.draw_date)}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {raffleEntries.filter((entry) => entry.status === "active")
                    .length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        You don't have any active raffle entries.
                      </p>
                      <Button className="mt-4">Browse Raffles</Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="won" className="space-y-4">
                  {raffleEntries
                    .filter((entry) => entry.status === "won")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-yellow-50"
                      >
                        <div className="w-full md:w-1/4 h-32 md:h-auto">
                          <img
                            src={entry.raffle_image}
                            alt={entry.raffle_title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">
                                {entry.raffle_title}
                              </h3>
                              <Badge className="bg-yellow-500">Winner!</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">Tickets</p>
                                <p className="font-medium">
                                  {entry.ticket_count}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Prize Value
                                </p>
                                <p className="font-medium">
                                  {formatCurrency(entry.prize_value)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Purchase Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.purchase_date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Drawing Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.draw_date)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-yellow-600">
                              <Trophy className="h-4 w-4 mr-1" />
                              <span>Congratulations on your win!</span>
                            </div>
                            <Button size="sm">Claim Prize</Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {raffleEntries.filter((entry) => entry.status === "won")
                    .length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        You haven't won any raffles yet. Keep trying!
                      </p>
                      <Button className="mt-4">Browse Raffles</Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                  {raffleEntries
                    .filter((entry) => entry.status === "completed")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-gray-50"
                      >
                        <div className="w-full md:w-1/4 h-32 md:h-auto">
                          <img
                            src={entry.raffle_image}
                            alt={entry.raffle_title}
                            className="w-full h-full object-cover opacity-70"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">
                                {entry.raffle_title}
                              </h3>
                              <Badge variant="secondary">Completed</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div>
                                <p className="text-xs text-gray-500">Tickets</p>
                                <p className="font-medium">
                                  {entry.ticket_count}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Prize Value
                                </p>
                                <p className="font-medium">
                                  {formatCurrency(entry.prize_value)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Purchase Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.purchase_date)}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Drawing Date
                                </p>
                                <p className="font-medium">
                                  {formatDate(entry.draw_date)}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <span>Better luck next time!</span>
                            </div>
                            <Button size="sm" variant="outline">
                              View Winner
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {raffleEntries.filter((entry) => entry.status === "completed")
                    .length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        You don't have any past raffle entries.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="link" className="flex items-center">
                View All Entries
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Loyalty Program */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Loyalty Program</CardTitle>
              <CardDescription>
                Earn points with every ticket purchase and unlock exclusive
                rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <LoyaltyPointsDisplay
                  points={userStats.loyaltyPoints}
                  nextTierPoints={userStats.nextTierPoints}
                  tier={
                    userStats.membershipTier as
                      | "Bronze"
                      | "Silver"
                      | "Gold"
                      | "Platinum"
                  }
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-amber-700" />
                    </div>
                    <h4 className="font-medium">Bronze</h4>
                    <p className="text-xs text-gray-500 mt-1">0 - 999 points</p>
                    <ul className="text-xs text-left mt-2 space-y-1">
                      <li>• Access to standard raffles</li>
                      <li>• Email notifications</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="font-medium">Silver</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      1,000 - 4,999 points
                    </p>
                    <ul className="text-xs text-left mt-2 space-y-1">
                      <li>• 5% discount on tickets</li>
                      <li>• Early access to new raffles</li>
                      <li>• Bonus tickets on purchases</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4 text-center">
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                    <h4 className="font-medium">Gold</h4>
                    <p className="text-xs text-gray-500 mt-1">5,000+ points</p>
                    <ul className="text-xs text-left mt-2 space-y-1">
                      <li>• 10% discount on all tickets</li>
                      <li>• VIP-only exclusive raffles</li>
                      <li>• Double bonus tickets</li>
                      <li>• Priority customer support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button
                variant="link"
                className="flex items-center"
                onClick={() => (window.location.href = "/rewards")}
              >
                Learn More About Rewards
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
