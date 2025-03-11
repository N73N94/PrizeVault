import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "./layout/Header";
import HeroSection from "./home/HeroSection";
import CategoryTabs from "./home/CategoryTabs";
import RaffleGrid from "./raffle/RaffleGrid";
import Footer from "./layout/Footer";

interface HomePageProps {
  isLoggedIn?: boolean;
  username?: string;
  avatarUrl?: string;
}

const HomePage = ({
  isLoggedIn = false,
  username = "Guest",
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
}: HomePageProps) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Featured raffle data
  const featuredRaffle = {
    id: "featured-1",
    title: "Win a Luxury Beachfront Villa",
    description:
      "Experience the ultimate luxury with this stunning 5-bedroom beachfront villa in the Maldives. Complete with private pool, personal chef, and breathtaking ocean views.",
    imageUrl:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80",
    prizeValue: 2500000,
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    ticketsRemaining: 1250,
  };

  // Category data
  const categories = [
    { id: "1", name: "Vehicles", slug: "vehicles" },
    { id: "2", name: "Real Estate", slug: "real-estate" },
    { id: "3", name: "Luxury Items", slug: "luxury" },
    { id: "4", name: "All Raffles", slug: "all" },
  ];

  // Sample raffle data
  const raffles = [
    {
      id: "1",
      title: "Luxury Sports Car Raffle",
      description:
        "Win this stunning high-performance sports car with premium features and incredible handling.",
      imageUrl:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      prizeValue: 150000,
      ticketPrice: 100,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalTickets: 5000,
      soldTickets: 3750,
      category: "vehicles",
    },
    {
      id: "2",
      title: "Beachfront Villa Raffle",
      description:
        "Win a stunning beachfront villa with panoramic ocean views and private access to the beach.",
      imageUrl:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      prizeValue: 2500000,
      ticketPrice: 500,
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      totalTickets: 10000,
      soldTickets: 6500,
      category: "real-estate",
    },
    {
      id: "3",
      title: "Luxury Watch Collection",
      description:
        "Win a collection of five premium luxury watches from the world's most prestigious brands.",
      imageUrl:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      prizeValue: 75000,
      ticketPrice: 50,
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      totalTickets: 8000,
      soldTickets: 5200,
      category: "luxury",
    },
    {
      id: "4",
      title: "Electric Supercar Raffle",
      description:
        "Win the latest electric supercar with cutting-edge technology and zero emissions.",
      imageUrl:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      prizeValue: 200000,
      ticketPrice: 150,
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      totalTickets: 6000,
      soldTickets: 2800,
      category: "vehicles",
    },
    {
      id: "5",
      title: "Mountain Retreat Raffle",
      description:
        "Win a luxurious mountain cabin with stunning views, hot tub, and premium amenities.",
      imageUrl:
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
      prizeValue: 950000,
      ticketPrice: 200,
      endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      totalTickets: 9000,
      soldTickets: 4100,
      category: "real-estate",
    },
    {
      id: "6",
      title: "Designer Jewelry Set",
      description:
        "Win a complete set of designer jewelry including necklace, earrings, bracelet, and ring.",
      imageUrl:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      prizeValue: 45000,
      ticketPrice: 25,
      endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      totalTickets: 12000,
      soldTickets: 9800,
      category: "luxury",
    },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleRaffleClick = (id: string) => {
    console.log(`Navigating to raffle ${id} details page`);
    // In a real app, this would navigate to the raffle detail page
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Helmet>
        <title>Premium Raffle Platform | Win Luxury Prizes</title>
        <meta
          name="description"
          content="Experience the thrill of winning high-value prizes through our transparent and secure raffle platform."
        />
      </Helmet>

      {/* Header */}
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        avatarUrl={avatarUrl}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {" "}
        {/* pt-20 to account for fixed header */}
        {/* Hero Section */}
        <HeroSection featuredRaffle={featuredRaffle} />
        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        {/* Raffle Grid */}
        <RaffleGrid
          raffles={raffles}
          title="Featured Raffles"
          showFilters={true}
          showSearch={true}
          onRaffleClick={handleRaffleClick}
          selectedCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
