"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/home/product-card";
import NoResults from "@/components/no-results";
import SortSelect from "@/components/sort-select";

interface ProductListProps {
  initialProducts: Product[];
  initialSortBy: string;
  initialSortOrder: string;
}

const ProductList: React.FC<ProductListProps> = ({
  initialProducts,
  initialSortBy,
  initialSortOrder,
}) => {
  const [products, setProducts] = useState(initialProducts);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const sortProducts = (
    products: Product[],
    sortBy: string,
    sortOrder: string
  ) => {
    return products.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price);
      } else if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  };

  useEffect(() => {
    setProducts(sortProducts([...initialProducts], sortBy, sortOrder));
  }, [sortBy, sortOrder, initialProducts]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">{products.length} Products</div>
        <div>
          
          <div className="text-sm">
            <SortSelect
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={(value) => {
                const [newSortBy, newSortOrder] = value.split(":");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            />
          </div>
        </div>
      </div>
      {products.length === 0 ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
