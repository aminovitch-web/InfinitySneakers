"use client";

import React, { useState } from "react";
import SelectedFilters from "@/components/selected-filters";
import Filter from "@/components/filter";
import { Color, Size, Category, Product } from "@/types";
import SliderFilter from "./slider-filter";
import CategoryFilter from "./category-filter";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
} from "@/components/ui/drawer";
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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger onClick={() => setDrawerOpen(true)}>
            <div className="flex items-center gap-1">
              <Badge className="lg:hidden">Open Filters</Badge>
            </div>
          </DrawerTrigger>
          <DrawerContent className="DialogContent px-1">
            <DrawerClose
              className="right-2 top-2 absolute"
              onClick={() => setDrawerOpen(false)}
            >
              <IoMdClose className="w-5 h-5" />
            </DrawerClose>
            <DrawerHeader className="w-full flex flex-col items-center gap-4 mt-4 mb-4">
              <div className="grid gap-1 text-center">
                <h2 className="text-xl font-semibold">Filters</h2>
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
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
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
