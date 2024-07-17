import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  sortBy: string;
  sortOrder: string;
  onChange: (value: string) => void;
}

const SortSelect: React.FC<SortSelectProps> = ({
  sortBy,
  sortOrder,
  onChange,
}) => {
  return (
    <Select value={`${sortBy}:${sortOrder}`} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="createdAt:desc">Newest</SelectItem>
        <SelectItem value="createdAt:asc">Oldest</SelectItem>
        <SelectItem value="price:asc">Price: Low to High</SelectItem>
        <SelectItem value="price:desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
