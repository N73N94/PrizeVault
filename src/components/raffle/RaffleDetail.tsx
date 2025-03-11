import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  DollarSign,
  Ticket,
  Users,
  Calendar,
  Info,
  Share2,
  Heart,
  Award,
  ChevronLeft,
  ChevronRight,
  Maximize,
  RotateCw,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import TicketPurchaseModal from "./TicketPurchaseModal";

interface RaffleDetailProps {
  id?: string;
  title?: string;
  description?: string;
  longDescription?: string;
  imageUrls?: string[];
  prizeValue?: number;
  ticketPrice?: number;
  endDate?: Date;
  totalTickets?: number;
  soldTickets?: number;
  category?: "vehicles" | "real-estate" | "luxury";
  specifications?: { label: string; value: string }[];
  recentPurchasers?: {
    id: string;
    name: string;
    avatar: string;
    ticketCount: number;
    purchaseDate: Date;
  }[];
  odds?: { tickets: number; probability: number }[];
}

const RaffleDetail = ({
  id = "1",
  title = "Luxury Sports Car Raffle",
  description = "Win this stunning high-performance sports car with premium features and incredible handling.",
  longDescription = "Experience the thrill of owning a high-performance luxury sports car. This vehicle combines cutting-edge technology with elegant design, offering an unparalleled driving experience. With a powerful engine, premium interior, and state-of-the-art features, this car represents the pinnacle of automotive engineering. The winner will receive a brand new model with full manufacturer warranty and all taxes paid.",
  imageUrls = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
  ],
  prizeValue = 150000,
  ticketPrice = 100,
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  totalTickets = 5000,
  soldTickets = 3750,
  category = "vehicles",
  specifications = [
    { label: "Make", value: "Luxury Brand" },
    { label: "Model", value: "Sports Coupe" },
    { label: "Year", value: "2023" },
    { label: "Engine", value: "4.0L V8 Twin-Turbo" },
    { label: "Horsepower", value: "550 hp" },
    { label: "0-60 mph", value: "3.5 seconds" },
    { label: "Transmission", value: "8-speed Automatic" },
    { label: "Color", value: "Metallic Silver" },
    { label: "Interior", value: "Black Leather" },
    { label: "Warranty", value: "3 Years / 36,000 Miles" },
  ],
  recentPurchasers = [
    {
      id: "user1",
      name: "John D.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      ticketCount: 5,
      purchaseDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "user2",
      name: "Sarah M.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      ticketCount: 10,
      purchaseDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
    {
      id: "user3",
      name: "Robert K.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      ticketCount: 3,
      purchaseDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    },
    {
      id: "user4",
      name: "Emily L.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      ticketCount: 7,
      purchaseDate: new Date(Date.now() - 18 * 60 * 60 * 1000),
    },
  ],
  odds = [
    { tickets: 1, probability: 0.02 },
    { tickets: 5, probability: 0.1 },
    { tickets: 10, probability: 0.2 },
    { tickets: 25, probability: 0.5 },
    { tickets: 50, probability: 1 },
    { tickets: 100, probability: 2 },
  ],
}: RaffleDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [ticketCount, setTicketCount] = useState(1);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isFullscreenImage, setIsFullscreenImage] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Calculate percentage of tickets sold
  const percentageSold = Math.round((soldTickets / totalTickets) * 100);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const timeRemaining = endDate.getTime() - now.getTime();

    if (timeRemaining <= 0) return "Ended";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
    );

    if (days > 0) return `${days}d ${hours}h ${minutes}m remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1,
    );
  };

  // Handle ticket count changes
  const handleTicketCountChange = (value: number[]) => {
    setTicketCount(value[0]);
  };

  const handleTicketInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setTicketCount(value);
    }
  };

  // Handle purchase button click
  const handlePurchaseClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/raffle/${id}` } });
      return;
    }
    setIsPurchaseModalOpen(true);
  };

  // Calculate current odds
  const calculateOdds = (tickets: number) => {
    const closestOdd = odds.reduce((prev, curr) => {
      return Math.abs(curr.tickets - tickets) < Math.abs(prev.tickets - tickets)
        ? curr
        : prev;
    });
    return closestOdd.probability;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back button */}
      <Button
        variant="ghost"
        className="mb-4 pl-0"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Raffles
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images and details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main image and thumbnails */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
              <img
                src={imageUrls[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                <div className="absolute bottom-4 left-4">
                  <Badge
                    className={cn(
                      "text-white",
                      category === "vehicles"
                        ? "bg-blue-600"
                        : category === "real-estate"
                          ? "bg-green-600"
                          : "bg-purple-600",
                    )}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50"
                onClick={() => setIsFullscreenImage(true)}
              >
                <Maximize className="h-4 w-4" />
              </Button>
              <div className="absolute inset-y-0 left-2 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/30 text-white hover:bg-black/50"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-2 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-black/30 text-white hover:bg-black/50"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Image thumbnails */}
            <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2",
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-transparent",
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Raffle details tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>About This Prize</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{longDescription}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Prize Value</p>
                      <p className="font-semibold">
                        {formatCurrency(prizeValue)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Ticket Price</p>
                      <p className="font-semibold">
                        {formatCurrency(ticketPrice)}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Total Tickets</p>
                      <p className="font-semibold">
                        {totalTickets.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Drawing Date</p>
                      <p className="font-semibold">
                        {endDate.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prize Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b pb-2"
                      >
                        <span className="text-gray-500">{spec.label}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Ticket Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPurchasers.map((purchaser) => (
                      <div
                        key={purchaser.id}
                        className="flex items-center justify-between border-b pb-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={purchaser.avatar}
                              alt={purchaser.name}
                            />
                            <AvatarFallback>
                              {purchaser.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{purchaser.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatTimeAgo(purchaser.purchaseDate)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {purchaser.ticketCount} ticket
                            {purchaser.ticketCount !== 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(
                              purchaser.ticketCount * ticketPrice,
                            )}
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

        {/* Right column - Purchase info */}
        <div className="space-y-6">
          {/* Raffle info card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer */}
              <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-medium">Drawing closes in</span>
                </div>
                <span className="font-bold">{getTimeRemaining()}</span>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{soldTickets.toLocaleString()} sold</span>
                  <span>
                    {(totalTickets - soldTickets).toLocaleString()} remaining
                  </span>
                </div>
                <Progress value={percentageSold} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {soldTickets} participants
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {percentageSold}% sold
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ticket selection */}
              <div>
                <Label htmlFor="ticketCount" className="text-base font-medium">
                  Select Ticket Quantity
                </Label>
                <div className="mt-2">
                  <div className="flex items-center space-x-4 mb-4">
                    <Input
                      id="ticketCount"
                      type="number"
                      min="1"
                      max="100"
                      value={ticketCount}
                      onChange={handleTicketInputChange}
                      className="w-20"
                    />
                    <span className="text-sm text-gray-500">
                      {formatCurrency(ticketCount * ticketPrice)}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[1]}
                    max={100}
                    step={1}
                    value={[ticketCount]}
                    onValueChange={handleTicketCountChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

              {/* Odds calculator */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Your Odds of Winning</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-primary">
                      {calculateOdds(ticketCount)}%
                    </p>
                    <p className="text-sm text-gray-500">
                      with {ticketCount} ticket{ticketCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      1 in {Math.round(100 / calculateOdds(ticketCount))}
                    </p>
                    <p className="text-xs text-gray-400">
                      Based on current entries
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase button */}
              <Button
                className="w-full text-lg py-6"
                size="lg"
                onClick={handlePurchaseClick}
              >
                <Ticket className="mr-2 h-5 w-5" />
                Buy Tickets Now
              </Button>

              {/* Additional info */}
              <div className="flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Drawing on {endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{formatCurrency(ticketPrice)}/ticket</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="mr-2 h-4 w-4" />
                Save
              </Button>
            </CardFooter>
          </Card>

          {/* Winner selection info */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Winner Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <RotateCw className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Random Drawing</p>
                  <p className="text-sm text-gray-500">
                    Winners are selected using a cryptographically secure random
                    number generator.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Verified Results</p>
                  <p className="text-sm text-gray-500">
                    All drawings are verified by an independent third party and
                    results are published publicly.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-full p-2 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Guaranteed Delivery</p>
                  <p className="text-sm text-gray-500">
                    Prize delivery or transfer is guaranteed within 30 days of
                    drawing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fullscreen image modal */}
      {isFullscreenImage && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsFullscreenImage(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img
            src={imageUrls[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImageIndex + 1} / {imageUrls.length}
          </div>
        </div>
      )}

      {/* Purchase modal */}
      <TicketPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        raffleTitle={title}
        ticketCount={ticketCount}
        ticketPrice={ticketPrice}
        totalPrice={ticketCount * ticketPrice}
        winningOdds={calculateOdds(ticketCount)}
      />
    </div>
  );
};

export default RaffleDetail;
