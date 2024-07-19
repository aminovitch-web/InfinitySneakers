"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CategoryFilterProps {
  categories: Category[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories }) => {
  const params = useParams();

  return (
    <div className="flex flex-col gap-y-3">
      <h3 className="text-lg font-semibold">Categories</h3>
      <Separator />
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <div key={category.id} className="flex items-center">
            <Button
              variant="outline"
              className={`hover:bg-InfinitySneakers-foreground ${
                params.slug === category.slug
                  ? "bg-InfinitySneakers-foreground"
                  : ""
              }`}
              asChild
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
