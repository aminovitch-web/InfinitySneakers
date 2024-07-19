import { Category } from "@/types";
import React from "react";
import NoResults from "../no-results";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-2xl">Categories</h3>
      {categories?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <div
            key={category.id}
            className="bg-transparent group rounded-xl border p-3 space-y-4"
          >
            {/* Images and Actions */}
            <div className="aspect-video rounded-xl bg-gray-100 relative overflow-hidden">
              <Link href={`/category/${category.slug}`}>
                <Image
                  src={category.billboard.imageUrl}
                  alt={category.name}
                  fill
                  sizes="30vw"
                  className="aspect-video object-cover rounded-md transition-transform duration-300 brightness-[.6]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Badge
                    variant="secondary"
                    className="bg-InfinitySneakers p-2 hover:bg-InfinitySneakers-foreground text-base text-white"
                  >
                    {category.name}
                  </Badge>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
