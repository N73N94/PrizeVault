import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryTabs from "@/components/home/CategoryTabs";
import RaffleGrid from "@/components/raffle/RaffleGrid";
import RaffleFilters, { FilterState } from "@/components/raffle/RaffleFilters";
import { useNavigate, useSearchParams } from "react-router-dom";

const RafflesPage = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    categories: {
      vehicles: false,
      "real-estate": false,
      luxury: false,
      electronics: false,
      experiences: false,
    },
    sortBy: "newest",
    status: "all",
  });
  const navigate = useNavigate();

  // Update category when URL param changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

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
    {
      id: "7",
      title: "Premium Gaming Setup",
      description:
        "Win a complete high-end gaming setup with the latest hardware, peripherals, and accessories.",
      imageUrl:
        "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=800&q=80",
      prizeValue: 15000,
      ticketPrice: 20,
      endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      totalTickets: 7500,
      soldTickets: 3200,
      category: "electronics",
    },
    {
      id: "8",
      title: "World Tour Experience",
      description:
        "Win a 30-day luxury world tour visiting 10 countries with all accommodations and flights included.",
      imageUrl:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80",
      prizeValue: 85000,
      ticketPrice: 75,
      endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
      totalTickets: 5000,
      soldTickets: 2100,
      category: "experiences",
    },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    navigate(`/raffles?category=${category}`);
  };

  const handleSearchSubmit = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleRaffleClick = (id: string) => {
    navigate(`/raffle/${id}`);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Filter raffles based on active category, search term, and filters
  const filteredRaffles = raffles.filter((raffle) => {
    // Filter by category
    if (activeCategory !== "all" && raffle.category !== activeCategory) {
      return false;
    }

    // Filter by search term
    if (
      searchTerm &&
      !raffle.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !raffle.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by price range
    if (
      raffle.ticketPrice < filters.priceRange[0] ||
      raffle.ticketPrice > filters.priceRange[1]
    ) {
      return false;
    }

    // Filter by selected categories (if any are selected)
    const hasSelectedCategories = Object.values(filters.categories).some(
      (selected) => selected,
    );
    if (
      hasSelectedCategories &&
      !filters.categories[raffle.category as keyof typeof filters.categories]
    ) {
      return false;
    }

    // Filter by status
    if (filters.status !== "all") {
      const now = new Date();
      const timeRemaining = raffle.endDate.getTime() - now.getTime();
      const daysRemaining = timeRemaining / (1000 * 60 * 60 * 24);

      if (filters.status === "ending-soon" && daysRemaining > 3) {
        return false;
      } else if (
        filters.status === "new" &&
        raffle.soldTickets / raffle.totalTickets > 0.1
      ) {
        return false;
      } else if (
        filters.status === "active" &&
        (daysRemaining <= 0 || raffle.soldTickets === raffle.totalTickets)
      ) {
        return false;
      }
    }

    return true;
  });

  // Sort raffles based on selected sort option
  const sortedRaffles = [...filteredRaffles].sort((a, b) => {
    switch (filters.sortBy) {
      case "ending-soon":
        return a.endDate.getTime() - b.endDate.getTime();
      case "price-low-high":
        return a.ticketPrice - b.ticketPrice;
      case "price-high-low":
        return b.ticketPrice - a.ticketPrice;
      case "newest":
      default:
        // Assuming newer raffles have higher IDs
        return parseInt(b.id) - parseInt(a.id);
    }
  });

  // Category data
  const categories = [
    { id: "1", name: "All Raffles", slug: "all" },
    { id: "2", name: "Vehicles", slug: "vehicles" },
    { id: "3", name: "Real Estate", slug: "real-estate" },
    { id: "4", name: "Luxury Items", slug: "luxury" },
    { id: "5", name: "Electronics", slug: "electronics" },
    { id: "6", name: "Experiences", slug: "experiences" },
  ];

  return (
    <>
      <Helmet>
        <title>Browse Raffles | Premium Raffle Platform</title>
        <meta
          name="description"
          content="Browse our selection of high-value raffles including luxury vehicles, real estate, and more."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-white">
        <Header onSearchSubmit={handleSearchSubmit} />

        <main className="flex-grow pt-20">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">
                {activeCategory === "all"
                  ? "All Raffles"
                  : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1).replace("-", " ")} Raffles`}
              </h1>
              <RaffleFilters onFilterChange={handleFilterChange} />
            </div>

            <RaffleGrid
              raffles={sortedRaffles}
              title=""
              showFilters={false}
              showSearch={false}
              onRaffleClick={handleRaffleClick}
              selectedCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RafflesPage;
