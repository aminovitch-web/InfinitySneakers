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

const ReviewsSort: React.FC<SortSelectProps> = ({
  sortBy,
  sortOrder,
  onChange,
}) => {
  return (
    <div className="flex gap-2 items-center justify-end">
      <div>Sort by: </div>
      <div>
        <Select value={`${sortBy}:${sortOrder}`} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt:desc">Newest</SelectItem>
            <SelectItem value="createdAt:asc">Oldest</SelectItem>
            <SelectItem value="rating:desc">Highest Rating</SelectItem>
            <SelectItem value="rating:asc">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ReviewsSort;
