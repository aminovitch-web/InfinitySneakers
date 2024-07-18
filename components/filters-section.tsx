"use client";

import SelectedFilters from "@/components/selected-filters";
import Filter from "@/components/filter";
import { Color, Size } from "@/types";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface FiltersSectionProps {
  sizes: Size[];
  colors: Color[];
}

const FiltersSection: React.FC<FiltersSectionProps> = ({ sizes, colors }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const priceRange = searchParams.get("priceRange")?.split(",").map(Number) || [
    0, 1000,
  ];
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    priceRange as [number, number]
  );

  const onPriceChange = (value: number[]) => {
    setLocalPriceRange(value as [number, number]);

    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      priceRange: value.length > 0 ? value.join(",") : undefined,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.pathname,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <SelectedFilters />
      <Filter valueKey="sizeId" name="Sizes" data={sizes} allowMultiple />
      <Filter valueKey="colorId" name="Colors" data={colors} />
      <div className="flex flex-col gap-y-2">
        <h4 className="text-sm font-medium">Price Range</h4>
        <Slider
          value={localPriceRange}
          onValueChange={onPriceChange}
          min={0}
          max={1000}
          step={10}
        />
        <div className="flex justify-between text-xs">
          <span>${localPriceRange[0]}</span>
          <span>${localPriceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FiltersSection;
