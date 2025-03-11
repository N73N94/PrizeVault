import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import RaffleDetail from "@/components/raffle/RaffleDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Mock data for different raffle types
const raffleData = {
  "1": {
    id: "1",
    title: "Luxury Sports Car Raffle",
    description:
      "Win this stunning high-performance sports car with premium features and incredible handling.",
    longDescription:
      "Experience the thrill of owning a high-performance luxury sports car. This vehicle combines cutting-edge technology with elegant design, offering an unparalleled driving experience. With a powerful engine, premium interior, and state-of-the-art features, this car represents the pinnacle of automotive engineering. The winner will receive a brand new model with full manufacturer warranty and all taxes paid.",
    imageUrls: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80",
    ],
    prizeValue: 150000,
    ticketPrice: 100,
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    totalTickets: 5000,
    soldTickets: 3750,
    category: "vehicles",
    specifications: [
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
  },
  "2": {
    id: "2",
    title: "Beachfront Villa Raffle",
    description:
      "Win a stunning beachfront villa with panoramic ocean views and private access to the beach.",
    longDescription:
      "Imagine waking up to the sound of waves and breathtaking ocean views every day. This luxurious beachfront villa offers the ultimate coastal living experience with 5 bedrooms, 4 bathrooms, a private pool, and direct beach access. Featuring high-end finishes, smart home technology, and sustainable design elements, this property represents the pinnacle of luxury real estate. The winner will receive full ownership of this fully furnished property with all transfer taxes and fees covered.",
    imageUrls: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
    prizeValue: 2500000,
    ticketPrice: 500,
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    totalTickets: 10000,
    soldTickets: 6500,
    category: "real-estate",
    specifications: [
      { label: "Property Type", value: "Villa" },
      { label: "Location", value: "Coastal Paradise" },
      { label: "Size", value: "4,500 sq ft" },
      { label: "Bedrooms", value: "5" },
      { label: "Bathrooms", value: "4" },
      { label: "Lot Size", value: "0.75 acres" },
      { label: "Year Built", value: "2021" },
      { label: "Features", value: "Private Pool, Beach Access" },
      { label: "Furnishing", value: "Fully Furnished" },
      { label: "Taxes & Fees", value: "Included in Prize" },
    ],
  },
  "3": {
    id: "3",
    title: "Luxury Watch Collection",
    description:
      "Win a collection of five premium luxury watches from the world's most prestigious brands.",
    longDescription:
      "This extraordinary collection features five of the most coveted timepieces from the world's most prestigious watchmakers. Each watch represents the pinnacle of horological craftsmanship, featuring mechanical movements, precious metals, and timeless design. The collection includes iconic models that are not only luxurious accessories but also valuable investments that can be passed down through generations. The winner will receive all five watches in their original boxes with certificates of authenticity and extended warranties.",
    imageUrls: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&q=80",
      "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    ],
    prizeValue: 75000,
    ticketPrice: 50,
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalTickets: 8000,
    soldTickets: 5200,
    category: "luxury",
    specifications: [
      { label: "Collection Size", value: "5 Watches" },
      { label: "Brand 1", value: "Swiss Luxury Manufacturer" },
      { label: "Model 1", value: "Chronograph Automatic" },
      { label: "Brand 2", value: "German Precision Timepieces" },
      { label: "Model 2", value: "Perpetual Calendar" },
      { label: "Brand 3", value: "Heritage Watchmaker" },
      { label: "Model 3", value: "Diving Professional" },
      { label: "Brand 4 & 5", value: "Limited Edition Models" },
      { label: "Materials", value: "18k Gold, Platinum, Stainless Steel" },
      { label: "Authentication", value: "Certificates & Extended Warranties" },
    ],
  },
};

const RaffleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const raffleId = id || "1";
  const raffle =
    raffleData[raffleId as keyof typeof raffleData] || raffleData["1"];

  return (
    <>
      <Helmet>
        <title>{raffle.title} | Premium Raffle Platform</title>
        <meta name="description" content={raffle.description} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <RaffleDetail
            id={raffle.id}
            title={raffle.title}
            description={raffle.description}
            longDescription={raffle.longDescription}
            imageUrls={raffle.imageUrls}
            prizeValue={raffle.prizeValue}
            ticketPrice={raffle.ticketPrice}
            endDate={raffle.endDate}
            totalTickets={raffle.totalTickets}
            soldTickets={raffle.soldTickets}
            category={raffle.category as "vehicles" | "real-estate" | "luxury"}
            specifications={raffle.specifications}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RaffleDetailPage;
