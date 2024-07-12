"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import ProductList from "@/components/home/product-list";

const RecentlyViewedItems = () => {
  const recentlyViewedItems = useSelector(
    (state: RootState) => state.recentlyViewed.items
  );

  return <ProductList items={recentlyViewedItems} />;
};

export default RecentlyViewedItems;
