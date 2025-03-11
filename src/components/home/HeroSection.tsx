import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Star } from "lucide-react";

interface HeroSectionProps {
  featuredRaffle?: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    prizeValue: number;
    endDate: Date;
    ticketsRemaining: number;
  };
}

const HeroSection = ({
  featuredRaffle = {
    id: "featured-1",
    title: "Win a Luxury Beachfront Villa",
    description:
      "Experience the ultimate luxury with this stunning 5-bedroom beachfront villa in the Maldives. Complete with private pool, personal chef, and breathtaking ocean views.",
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    prizeValue: 2500000,
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    ticketsRemaining: 1250,
  },
}: HeroSectionProps) => {
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
    const timeRemaining = featuredRaffle.endDate.getTime() - now.getTime();

    if (timeRemaining <= 0) return "Ended";

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    return `${days}d ${hours}h remaining`;
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary/10 to-secondary/10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-2">
                Featured Raffle
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
                {featuredRaffle.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-4">
                {featuredRaffle.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md w-full sm:w-auto">
                <CardContent className="p-4 flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-semibold text-lg">
                      {formatCurrency(featuredRaffle.prizeValue)}
                    </p>
                    <p className="text-sm text-gray-500">Prize Value</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md w-full sm:w-auto">
                <CardContent className="p-4 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-semibold text-lg">
                      {getTimeRemaining()}
                    </p>
                    <p className="text-sm text-gray-500">Until Drawing</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-4">
              <Button size="lg" className="group">
                Enter Raffle
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="mt-3 text-sm text-gray-500">
                Only {featuredRaffle.ticketsRemaining} tickets remaining!
              </p>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px]">
            <img
              src={featuredRaffle.imageUrl}
              alt={featuredRaffle.title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
              <div className="absolute bottom-6 left-6 right-6">
                <Badge
                  variant="default"
                  className="mb-2 bg-primary/90 backdrop-blur-sm"
                >
                  Real Estate
                </Badge>
                <p className="text-white text-lg md:text-xl font-medium">
                  Luxury Living at Its Finest
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform description */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Premium Raffles with Transparent Odds
          </h2>
          <p className="text-gray-600">
            Our platform offers high-value raffles with complete transparency,
            secure blockchain verification, and exciting prizes ranging from
            luxury vehicles to dream homes. Every ticket gives you a real chance
            to win.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
