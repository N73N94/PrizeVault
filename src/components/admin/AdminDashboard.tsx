import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Users,
  Ticket,
  DollarSign,
  Gift,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import AdminRaffleList from "./AdminRaffleList";
import AdminUserList from "./AdminUserList";
import AdminAnalytics from "./AdminAnalytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the dashboard
  const dashboardStats = {
    totalUsers: 2547,
    activeRaffles: 12,
    completedRaffles: 48,
    totalRevenue: 1250000,
    ticketsSold: 25000,
    conversionRate: 4.2,
    recentActivity: [
      {
        id: "act1",
        type: "purchase",
        user: "John Doe",
        details: "Purchased 5 tickets for Luxury Car Raffle",
        amount: 500,
        time: "10 minutes ago",
      },
      {
        id: "act2",
        type: "raffle_end",
        user: "System",
        details: "Beach House Raffle has ended",
        amount: null,
        time: "2 hours ago",
      },
      {
        id: "act3",
        type: "winner",
        user: "Sarah Williams",
        details: "Won the Luxury Watch Collection Raffle",
        amount: null,
        time: "5 hours ago",
      },
      {
        id: "act4",
        type: "new_raffle",
        user: "Admin",
        details: "Created new raffle: Mountain Retreat Getaway",
        amount: null,
        time: "1 day ago",
      },
      {
        id: "act5",
        type: "refund",
        user: "Michael Johnson",
        details: "Refunded 2 tickets for canceled raffle",
        amount: -200,
        time: "2 days ago",
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <Ticket className="h-4 w-4 text-green-500" />;
      case "raffle_end":
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "winner":
        return <Gift className="h-4 w-4 text-yellow-500" />;
      case "new_raffle":
        return <Plus className="h-4 w-4 text-purple-500" />;
      case "refund":
        return <DollarSign className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500">
            Manage raffles, users, and platform settings
          </p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Raffle
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto">
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="raffles">
            <Ticket className="h-4 w-4 mr-2" />
            Raffles
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">
                      {dashboardStats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50"
                  >
                    +12%
                  </Badge>
                  <span className="ml-2 text-gray-500">vs. last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Active Raffles</p>
                    <p className="text-2xl font-bold">
                      {dashboardStats.activeRaffles}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Ticket className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50"
                  >
                    +3
                  </Badge>
                  <span className="ml-2 text-gray-500">new this week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(dashboardStats.totalRevenue)}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50"
                  >
                    +8.5%
                  </Badge>
                  <span className="ml-2 text-gray-500">vs. last month</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Tickets Sold</p>
                    <p className="text-2xl font-bold">
                      {dashboardStats.ticketsSold.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Ticket className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs">
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50"
                  >
                    +5.2%
                  </Badge>
                  <span className="ml-2 text-gray-500">conversion rate</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest transactions and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 py-2"
                  >
                    <div className="mt-0.5">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{activity.user}</p>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {activity.details}
                      </p>
                    </div>
                    {activity.amount && (
                      <div
                        className={`font-medium ${activity.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatCurrency(activity.amount)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Raffle Performance</CardTitle>
                <CardDescription>
                  Top performing raffles by ticket sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Luxury Sports Car</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Beachfront Villa</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Luxury Watch Collection</span>
                      <span>60%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Mountain Retreat</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Designer Jewelry Set</span>
                      <span>40%</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
                <CardDescription>New users by referral source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Direct</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Social Media</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Referral Program</span>
                      <span>20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Search Engines</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Email Campaigns</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="raffles">
          <AdminRaffleList />
        </TabsContent>

        <TabsContent value="users">
          <AdminUserList />
        </TabsContent>

        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
