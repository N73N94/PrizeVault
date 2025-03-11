import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RaffleFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  priceRange: [number, number];
  categories: {
    vehicles: boolean;
    "real-estate": boolean;
    luxury: boolean;
    electronics: boolean;
    experiences: boolean;
  };
  sortBy: "newest" | "ending-soon" | "price-low-high" | "price-high-low";
  status: "all" | "active" | "ending-soon" | "new";
}

const RaffleFilters = ({ onFilterChange, className }: RaffleFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setActiveFilters({
      ...activeFilters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleCategoryChange = (category: keyof FilterState["categories"]) => {
    setActiveFilters({
      ...activeFilters,
      categories: {
        ...activeFilters.categories,
        [category]: !activeFilters.categories[category],
      },
    });
  };

  const handleSortChange = (sortBy: FilterState["sortBy"]) => {
    setActiveFilters({
      ...activeFilters,
      sortBy,
    });
  };

  const handleStatusChange = (status: FilterState["status"]) => {
    setActiveFilters({
      ...activeFilters,
      status,
    });
  };

  const applyFilters = () => {
    onFilterChange(activeFilters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
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
    };
    setActiveFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 1000)
      count++;
    if (Object.values(activeFilters.categories).some((v) => v)) count++;
    if (activeFilters.sortBy !== "newest") count++;
    if (activeFilters.status !== "all") count++;
    return count;
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 md:w-96 p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filter Raffles</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>

            <Separator />

            {/* Price Range */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Ticket Price Range</Label>
              <div className="pt-2">
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  value={activeFilters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {formatCurrency(activeFilters.priceRange[0])}
                  </span>
                  <span className="text-sm">
                    {formatCurrency(activeFilters.priceRange[1])}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vehicles"
                    checked={activeFilters.categories.vehicles}
                    onCheckedChange={() => handleCategoryChange("vehicles")}
                  />
                  <label
                    htmlFor="vehicles"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vehicles
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="real-estate"
                    checked={activeFilters.categories["real-estate"]}
                    onCheckedChange={() => handleCategoryChange("real-estate")}
                  />
                  <label
                    htmlFor="real-estate"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Real Estate
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="luxury"
                    checked={activeFilters.categories.luxury}
                    onCheckedChange={() => handleCategoryChange("luxury")}
                  />
                  <label
                    htmlFor="luxury"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Luxury Items
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="electronics"
                    checked={activeFilters.categories.electronics}
                    onCheckedChange={() => handleCategoryChange("electronics")}
                  />
                  <label
                    htmlFor="electronics"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Electronics
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="experiences"
                    checked={activeFilters.categories.experiences}
                    onCheckedChange={() => handleCategoryChange("experiences")}
                  />
                  <label
                    htmlFor="experiences"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Experiences
                  </label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Sort By */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sort By</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={
                    activeFilters.sortBy === "newest" ? "default" : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortChange("newest")}
                >
                  Newest
                </Button>
                <Button
                  variant={
                    activeFilters.sortBy === "ending-soon"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortChange("ending-soon")}
                >
                  Ending Soon
                </Button>
                <Button
                  variant={
                    activeFilters.sortBy === "price-low-high"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortChange("price-low-high")}
                >
                  Price: Low to High
                </Button>
                <Button
                  variant={
                    activeFilters.sortBy === "price-high-low"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleSortChange("price-high-low")}
                >
                  Price: High to Low
                </Button>
              </div>
            </div>

            <Separator />

            {/* Status */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Status</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={
                    activeFilters.status === "all" ? "default" : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleStatusChange("all")}
                >
                  All Raffles
                </Button>
                <Button
                  variant={
                    activeFilters.status === "active" ? "default" : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleStatusChange("active")}
                >
                  Active
                </Button>
                <Button
                  variant={
                    activeFilters.status === "ending-soon"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleStatusChange("ending-soon")}
                >
                  Ending Soon
                </Button>
                <Button
                  variant={
                    activeFilters.status === "new" ? "default" : "outline"
                  }
                  size="sm"
                  className="justify-start"
                  onClick={() => handleStatusChange("new")}
                >
                  New Arrivals
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active filter pills */}
      {getActiveFilterCount() > 0 && (
        <div className="ml-2 flex flex-wrap gap-2">
          {activeFilters.priceRange[0] > 0 ||
          activeFilters.priceRange[1] < 1000 ? (
            <div className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
              <span>
                {formatCurrency(activeFilters.priceRange[0])} -{" "}
                {formatCurrency(activeFilters.priceRange[1])}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => {
                  setActiveFilters({
                    ...activeFilters,
                    priceRange: [0, 1000],
                  });
                  onFilterChange({
                    ...activeFilters,
                    priceRange: [0, 1000],
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : null}

          {Object.entries(activeFilters.categories)
            .filter(([_, isSelected]) => isSelected)
            .map(([category]) => (
              <div
                key={category}
                className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center"
              >
                <span>
                  {category === "real-estate"
                    ? "Real Estate"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 p-0"
                  onClick={() => {
                    handleCategoryChange(
                      category as keyof FilterState["categories"],
                    );
                    onFilterChange({
                      ...activeFilters,
                      categories: {
                        ...activeFilters.categories,
                        [category]: false,
                      },
                    });
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}

          {activeFilters.sortBy !== "newest" && (
            <div className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
              <span>
                {activeFilters.sortBy === "ending-soon"
                  ? "Ending Soon"
                  : activeFilters.sortBy === "price-low-high"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => {
                  setActiveFilters({
                    ...activeFilters,
                    sortBy: "newest",
                  });
                  onFilterChange({
                    ...activeFilters,
                    sortBy: "newest",
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {activeFilters.status !== "all" && (
            <div className="bg-gray-100 text-xs rounded-full px-3 py-1 flex items-center">
              <span>
                {activeFilters.status === "active"
                  ? "Active"
                  : activeFilters.status === "ending-soon"
                    ? "Ending Soon"
                    : "New Arrivals"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0"
                onClick={() => {
                  setActiveFilters({
                    ...activeFilters,
                    status: "all",
                  });
                  onFilterChange({
                    ...activeFilters,
                    status: "all",
                  });
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {getActiveFilterCount() > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-6 px-2"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RaffleFilters;
