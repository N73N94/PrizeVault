import React, { useState } from "react";
import RaffleCard from "./RaffleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RaffleItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  prizeValue: number;
  ticketPrice: number;
  endDate: Date;
  totalTickets: number;
  soldTickets: number;
  category: "vehicles" | "real-estate" | "luxury";
}

interface RaffleGridProps {
  raffles?: RaffleItem[];
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  onRaffleClick?: (id: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const RaffleGrid = ({
  raffles = [
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
        "Win"
    }
