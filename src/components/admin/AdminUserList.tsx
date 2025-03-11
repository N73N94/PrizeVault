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
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Ban,
  Award,
  ShieldCheck,
  ShieldX,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: "active" | "suspended" | "pending";
  role: "user" | "admin" | "moderator";
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  totalSpent: number;
  ticketsPurchased: number;
  rafflesWon: number;
  joinDate: Date;
  lastActive: Date;
}

const AdminUserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Mock data for users
  const users: User[] = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      status: "active",
      role: "user",
      membershipTier: "Silver",
      totalSpent: 1250,
      ticketsPurchased: 25,
      rafflesWon: 1,
      joinDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      status: "active",
      role: "admin",
      membershipTier: "Gold",
      totalSpent: 5000,
      ticketsPurchased: 75,
      rafflesWon: 2,
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-3",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      status: "suspended",
      role: "user",
      membershipTier: "Bronze",
      totalSpent: 500,
      ticketsPurchased: 10,
      rafflesWon: 0,
      joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-4",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      status: "active",
      role: "moderator",
      membershipTier: "Silver",
      totalSpent: 2000,
      ticketsPurchased: 40,
      rafflesWon: 1,
      joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-5",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      status: "active",
      role: "user",
      membershipTier: "Platinum",
      totalSpent: 10000,
      ticketsPurchased: 150,
      rafflesWon: 3,
      joinDate: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-6",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      status: "pending",
      role: "user",
      membershipTier: "Bronze",
      totalSpent: 0,
      ticketsPurchased: 0,
      rafflesWon: 0,
      joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-7",
      name: "David Miller",
      email: "david.miller@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      status: "active",
      role: "user",
      membershipTier: "Gold",
      totalSpent: 7500,
      ticketsPurchased: 100,
      rafflesWon: 2,
      joinDate: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: "user-8",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      status: "active",
      role: "user",
      membershipTier: "Silver",
      totalSpent: 3000,
      ticketsPurchased: 60,
      rafflesWon: 1,
      joinDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
  ];

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    // Filter by search term
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by status
    if (statusFilter !== "all" && user.status !== statusFilter) {
      return false;
    }

    // Filter by role
    if (roleFilter !== "all" && user.role !== roleFilter) {
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
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>;
      case "moderator":
        return <Badge className="bg-blue-500">Moderator</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getMembershipBadge = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return <Badge className="bg-amber-700">{tier}</Badge>;
      case "Silver":
        return <Badge className="bg-gray-400">{tier}</Badge>;
      case "Gold":
        return <Badge className="bg-yellow-500">{tier}</Badge>;
      case "Platinum":
        return <Badge className="bg-blue-500">{tier}</Badge>;
      default:
        return <Badge variant="secondary">{tier}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle>Manage Users</CardTitle>
            <CardDescription>View and manage user accounts</CardDescription>
          </div>
          <Button className="mt-4 md:mt-0">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users by name or email..."
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
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">
                  Membership
                </TableHead>
                <TableHead className="hidden md:table-cell">Spent</TableHead>
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {getMembershipBadge(user.membershipTier)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatCurrency(user.totalSpent)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {formatDate(user.joinDate)}
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
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem className="text-amber-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : user.status === "suspended" ? (
                            <DropdownMenuItem className="text-green-600">
                              <ShieldCheck className="mr-2 h-4 w-4" />
                              Reactivate User
                            </DropdownMenuItem>
                          ) : null}
                          {user.role !== "admin" ? (
                            <DropdownMenuItem>
                              <Award className="mr-2 h-4 w-4" />
                              Change Role
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
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
                    No users found matching your filters.
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

export default AdminUserList;
