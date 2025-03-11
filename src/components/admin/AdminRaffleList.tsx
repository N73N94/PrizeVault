import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

interface Raffle {
  id: string;
  title: string;
  category: string;
  status: "active" | "completed" | "draft" | "cancelled";
  ticketPrice: number;
  ticketsSold: number;
  totalTickets: number;
  endDate: Date;
  prizeValue: number;
  createdAt: Date;
}

const AdminRaffleList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for raffles
  const raffles: Raffle[] = [
    {
      id: "raffle-1",
      title: "Luxury Sports Car Raffle",
      category: "vehicles",
      status: "active",
      ticketPrice: 100,
      ticketsSold: 3750,
      totalTickets: 5000,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      prizeValue: 150000,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-2",
      title: "Beachfront Villa Raffle",
      category: "real-estate",
      status: "active",
      ticketPrice: 500,
      ticketsSold: 6500,
      totalTickets: 10000,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      prizeValue: 2500000,
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-3",
      title: "Luxury Watch Collection",
      category: "luxury",
      status: "completed",
      ticketPrice: 50,
      ticketsSold: 8000,
      totalTickets: 8000,
      endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      prizeValue: 75000,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-4",
      title: "Electric Supercar Raffle",
      category: "vehicles",
      status: "active",
      ticketPrice: 150,
      ticketsSold: 2800,
      totalTickets: 6000,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      prizeValue: 200000,
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-5",
      title: "Mountain Retreat Raffle",
      category: "real-estate",
      status: "active",
      ticketPrice: 200,
      ticketsSold: 4100,
      totalTickets: 9000,
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      prizeValue: 950000,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-6",
      title: "Designer Jewelry Set",
      category: "luxury",
      status: "completed",
      ticketPrice: 25,
      ticketsSold: 12000,
      totalTickets: 12000,
      endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      prizeValue: 45000,
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-7",
      title: "Premium Gaming Setup",
      category: "electronics",
      status: "draft",
      ticketPrice: 20,
      ticketsSold: 0,
      totalTickets: 7500,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      prizeValue: 15000,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "raffle-8",
      title: "World Tour Experience",
      category: "experiences",
      status: "cancelled",
      ticketPrice: 75,
      ticketsSold: 1200,
      totalTickets: 5000,
      endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      prizeValue: 85000,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ];

  // Filter raffles based on search term and filters
  const filteredRaffles = raffles.filter((raffle) => {
    // Filter by search term
    if (
      searchTerm &&
      !raffle.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter !== "all" && raffle.status !== statusFilter) {
      return false;
    }

    // Filter by category
    if (categoryFilter !== "all" && raffle.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getProgressPercentage = (sold: number, total: number) => {
    return Math.round((sold / total) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Manage Raffles</CardTitle>
            <CardDescription>
              Create, edit, and monitor all raffles
            </CardDescription>
          </div>
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Create Raffle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search raffles..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="real-estate">Real Estate</SelectItem>
              <SelectItem value="luxury">Luxury Items</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="experiences">Experiences</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Raffle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Progress</TableHead>
                <TableHead className="hidden md:table-cell">End Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRaffles.length > 0 ? (
                filteredRaffles.map((raffle) => (
                  <TableRow key={raffle.id}>
                    <TableCell className="font-medium">
                      {raffle.title}
                    </TableCell>
                    <TableCell>{getStatusBadge(raffle.status)}</TableCell>
                    <TableCell className="capitalize">
                      {raffle.category.replace("-", " ")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatCurrency(raffle.ticketPrice)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <div className="w-full max-w-[100px] h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${getProgressPercentage(raffle.ticketsSold, raffle.totalTickets)}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-xs whitespace-nowrap">
                          {raffle.ticketsSold}/{raffle.totalTickets}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(raffle.endDate)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Raffle
                          </DropdownMenuItem>
                          {raffle.status === "active" && (
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" />
                              Extend Deadline
                            </DropdownMenuItem>
                          )}
                          {raffle.status === "draft" && (
                            <DropdownMenuItem>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Publish Raffle
                            </DropdownMenuItem>
                          )}
                          {raffle.status !== "completed" &&
                            raffle.status !== "cancelled" && (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel Raffle
                              </DropdownMenuItem>
                            )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-gray-500"
                  >
                    No raffles found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRaffleList;
