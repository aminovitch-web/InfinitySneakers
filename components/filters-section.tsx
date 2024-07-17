"use client";

import SelectedFilters from "@/components/selected-filters";
import Filter from "@/components/filter";
import { Color, Size } from "@/types";

interface FiltersSectionProps {
  sizes: Size[];
  colors: Color[];
}

const FiltersSection: React.FC<FiltersSectionProps> = ({ sizes, colors }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <SelectedFilters />
      <Filter valueKey="sizeId" name="Sizes" data={sizes} allowMultiple />
      <Filter valueKey="colorId" name="Colors" data={colors} />
    </div>
  );
};

export default FiltersSection;
