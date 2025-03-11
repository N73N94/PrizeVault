import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories?: {
    id: string;
    name: string;
    slug: string;
  }[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const CategoryTabs = ({
  categories = [
    { id: "1", name: "Vehicles", slug: "vehicles" },
    { id: "2", name: "Real Estate", slug: "real-estate" },
    { id: "3", name: "Luxury Items", slug: "luxury" },
    { id: "4", name: "All Raffles", slug: "all" },
  ],
  activeCategory = "all",
  onCategoryChange = (category) =>
    console.log(`Category changed to: ${category}`),
}: CategoryTabsProps) => {
  return (
    <div className="w-full bg-background py-4 border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <Tabs
          defaultValue={activeCategory}
          onValueChange={onCategoryChange}
          className="w-full"
        >
          <TabsList className="w-full sm:w-auto flex justify-between sm:justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.slug}
                className={cn(
                  "flex-1 sm:flex-initial text-sm sm:text-base px-4 py-2",
                  "transition-all duration-200 ease-in-out",
                  "hover:bg-primary/10",
                )}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default CategoryTabs;
