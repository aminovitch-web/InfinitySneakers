"use client";

import React, { useState } from "react";
import SelectedFilters from "@/components/selected-filters";
import Filter from "@/components/filter";
import { Color, Size, Category, Product } from "@/types";
import SliderFilter from "./slider-filter";
import CategoryFilter from "./category-filter";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { IoMdClose } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

interface FiltersSectionProps {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
  products: Product[];
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  sizes,
  colors,
  categories,
  products,
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Calculate max price from products
  const calculateMaxPrice = (products: Product[]) => {
    const maxPrice = Math.max(
      ...products?.map((product) => Number(product.price))
    );
    if (maxPrice < 1000) {
      return 1000;
    }
    return Math.ceil(maxPrice / 10) * 10;
  };

  const maxPrice = calculateMaxPrice(products);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="lg:hidden">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger>
            <div className="flex items-center gap-1">
              <Badge className="lg:hidden">Open Filters</Badge>
            </div>
          </SheetTrigger>
          <SheetContent
            className="DialogContent px-2"
            side="left"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <SheetHeader className="w-full flex flex-col items-center gap-4 mt-4 mb-4">
              <div className="grid gap-1 text-center">
                <SheetTitle className="text-xl font-semibold">
                  Filters
                </SheetTitle>
              </div>
              <Separator className="my-6" />
              <nav className="flex flex-col w-full justify-center gap-2">
                <SelectedFilters />
                <CategoryFilter categories={categories} />
                <Filter
                  valueKey="sizeId"
                  name="Sizes"
                  data={sizes}
                  allowMultiple
                />
                <Filter valueKey="colorId" name="Colors" data={colors} />
                <SliderFilter
                  initialValue={[0, maxPrice]}
                  min={0}
                  max={maxPrice}
                  step={10}
                />
              </nav>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden lg:flex flex-col gap-y-4">
        <SelectedFilters />
        <CategoryFilter categories={categories} />
        <Filter valueKey="sizeId" name="Sizes" data={sizes} allowMultiple />
        <Filter valueKey="colorId" name="Colors" data={colors} />
        <SliderFilter
          initialValue={[0, maxPrice]}
          min={0}
          max={maxPrice}
          step={10}
        />
      </div>
    </div>
  );
};

export default FiltersSection;
