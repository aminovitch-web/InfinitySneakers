"use client";

import React from "react";
import SelectedFilters from "@/components/selected-filters";
import Filter from "@/components/filter";
import { Color, Size, Category, Product } from "@/types";
import SliderFilter from "./slider-filter";
import CategoryFilter from "./category-filter";

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
  );
};

export default FiltersSection;
