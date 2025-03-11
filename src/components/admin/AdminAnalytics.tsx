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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  LineChart,
  PieChart,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Ticket,
  Gift,
} from "lucide-react";

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [chartType, setChartType] = useState("revenue");

  // Mock data for analytics
  const analyticsData = {
    summary: {
      totalRevenue: 1250000,
      ticketsSold: 25000,
      activeUsers: 2547,
      conversionRate: 4.2,
      averageTicketValue: 50,
      topCategory: "vehicles",
    },
    revenueByCategory: [
      { category: "Vehicles", percentage: 45, amount: 562500 },
      { category: "Real Estate", percentage: 30, amount: 375000 },
      { category: "Luxury Items", percentage: 15, amount: 187500 },
      { category: "Electronics", percentage: 7, amount: 87500 },
      { category: "Experiences", percentage: 3, amount: 37500 },
    ],
    usersBySource: [
      { source: "Direct", percentage: 35, count: 891 },
      { source: "Social Media", percentage: 25, count: 637 },
      { source: "Referral Program", percentage: 20, count: 509 },
      { source: "Search Engines", percentage: 15, count: 382 },
      { source: "Email Campaigns", percentage: 5, count: 128 },
    ],
    monthlyStats: [
      { month: "Jan", revenue: 85000, users: 180, tickets: 1700 },
      { month: "Feb", revenue: 92000, users: 210, tickets: 1840 },
      { month: "Mar", revenue: 105000, users: 240, tickets: 2100 },
      { month: "Apr", revenue: 110000, users: 260, tickets: 2200 },
      { month: "May", revenue: 125000, users: 290, tickets: 2500 },
      { month: "Jun", revenue: 140000, users: 320, tickets: 2800 },
      { month: "Jul", revenue: 155000, users: 350, tickets: 3100 },
      { month: "Aug", revenue: 170000, users: 380, tickets: 3400 },
      { month: "Sep", revenue: 185000, users: 410, tickets: 3700 },
      { month: "Oct", revenue: 200000, users: 440, tickets: 4000 },
      { month: "Nov", revenue: 215000, users: 470, tickets: 4300 },
      { month: "Dec", revenue: 230000, users: 500, tickets: 4600 },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // This would be replaced with actual chart components in a real implementation
  const renderChartPlaceholder = () => {
    return (
      <div className="w-full h-80 bg-gray-50 rounded-lg flex items-center justify-center border">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {chartType === "revenue" && (
              <BarChart3 className="h-12 w-12 text-gray-400" />
            )}
            {chartType === "users" && (
              <LineChart className="h-12 w-12 text-gray-400" />
            )}
            {chartType === "tickets" && (
              <PieChart className="h-12 w-12 text-gray-400" />
            )}
          </div>
          <p className="text-gray-500 mb-2">
            {chartType === "revenue" && "Revenue Chart"}
            {chartType === "users" && "User Growth Chart"}
            {chartType === "tickets" && "Ticket Sales Chart"}
          </p>
          <p className="text-xs text-gray-400">
            Chart visualization would be implemented with a library like
            Chart.js or Recharts
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Analytics Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track platform performance and user engagement
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Calendar className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <DollarSign className="h-5 w-5 text-green-500 mb-1" />
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(analyticsData.summary.totalRevenue)}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50 mt-1"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" /> +12%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Ticket className="h-5 w-5 text-blue-500 mb-1" />
                  <p className="text-xs text-gray-500">Tickets Sold</p>
                  <p className="text-lg font-bold">
                    {analyticsData.summary.ticketsSold.toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50 mt-1"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" /> +8%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-5 w-5 text-purple-500 mb-1" />
                  <p className="text-xs text-gray-500">Active Users</p>
                  <p className="text-lg font-bold">
                    {analyticsData.summary.activeUsers.toLocaleString()}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50 mt-1"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" /> +15%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <Gift className="h-5 w-5 text-yellow-500 mb-1" />
                  <p className="text-xs text-gray-500">Conversion Rate</p>
                  <p className="text-lg font-bold">
                    {analyticsData.summary.conversionRate}%
                  </p>
                  <Badge
                    variant="outline"
                    className="text-red-600 bg-red-50 mt-1"
                  >
                    <TrendingDown className="h-3 w-3 mr-1" /> -0.5%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <DollarSign className="h-5 w-5 text-orange-500 mb-1" />
                  <p className="text-xs text-gray-500">Avg. Ticket Value</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(analyticsData.summary.averageTicketValue)}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-green-600 bg-green-50 mt-1"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" /> +2%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="h-5 w-5 text-indigo-500 mb-1" />
                  <p className="text-xs text-gray-500">Top Category</p>
                  <p className="text-lg font-bold capitalize">
                    {analyticsData.summary.topCategory}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-gray-600 bg-gray-50 mt-1"
                  >
                    45% of sales
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart Controls */}
          <div className="mb-6">
            <Tabs value={chartType} onValueChange={setChartType}>
              <TabsList className="w-full max-w-md">
                <TabsTrigger value="revenue">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="users">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
                <TabsTrigger value="tickets">
                  <Ticket className="h-4 w-4 mr-2" />
                  Tickets
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Chart Area */}
          {renderChartPlaceholder()}

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenueByCategory.map((item) => (
                    <div key={item.category}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{item.category}</span>
                        <span>{formatCurrency(item.amount)}</span>
                      </div>
                      <div className="flex items-center">
                        <Progress
                          value={item.percentage}
                          className="h-2 flex-1"
                        />
                        <span className="ml-2 text-xs text-gray-500 w-10 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Acquisition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.usersBySource.map((item) => (
                    <div key={item.source}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{item.source}</span>
                        <span>{item.count} users</span>
                      </div>
                      <div className="flex items-center">
                        <Progress
                          value={item.percentage}
                          className="h-2 flex-1"
                        />
                        <span className="ml-2 text-xs text-gray-500 w-10 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends Table */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Month</th>
                      <th className="text-right py-3 px-4">Revenue</th>
                      <th className="text-right py-3 px-4">New Users</th>
                      <th className="text-right py-3 px-4">Tickets Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.monthlyStats.map((month) => (
                      <tr key={month.month} className="border-b">
                        <td className="py-3 px-4">{month.month}</td>
                        <td className="text-right py-3 px-4">
                          {formatCurrency(month.revenue)}
                        </td>
                        <td className="text-right py-3 px-4">{month.users}</td>
                        <td className="text-right py-3 px-4">
                          {month.tickets}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
