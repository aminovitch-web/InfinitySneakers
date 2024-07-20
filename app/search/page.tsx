import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/home/product-card";
import NoResults from "@/components/no-results";
import Billboard from "@/components/home/billboard";
import BreadcrumbComponent from "@/components/breadcrumb-component";
import FiltersSection from "@/components/filters-section";
import getProducts from "@/actions/product/get-products";
import getSizes from "@/actions/size/get-sizes";
import getColors from "@/actions/color/get-colors";
import getCategories from "@/actions/category/get-categories";
import getBillboards from "@/actions/billboard/get-billboards";
import ProductList from "../shop/_components/product-list";

interface SearchPageProps {
  searchParams: {
    s: string;
    colorId?: string;
    sizeId?: string;
    sortBy?: string;
    sortOrder?: string;
    priceRange?: string;
  };
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const sizes = await getSizes();
  const colors = await getColors();
  const categories = await getCategories();
  const billboards = await getBillboards();
  const s = searchParams.s;

  const sizeNameToId = Object.fromEntries(
    sizes.map((size) => [size.name, size.id])
  );
  const colorNameToId = Object.fromEntries(
    colors.map((color) => [color.name, color.id])
  );

  const sizeNames = decodeURIComponent(searchParams.sizeId || "")
    .split(",")
    .filter(Boolean);
  const sizeIds = sizeNames
    .map((name) => sizeNameToId[name])
    .filter((id) => id !== undefined);

  const colorId = searchParams.colorId
    ? colorNameToId[searchParams.colorId]
    : undefined;

  // Parse priceRange from searchParams
  const priceRange = searchParams?.priceRange
    ? searchParams?.priceRange.split(",").map(Number)
    : undefined;
  const minPrice = priceRange ? priceRange[0] : undefined;
  const maxPrice = priceRange ? priceRange[1] : undefined;

  const products = await getProducts({
    colorId,
    sizeId: sizeIds.length > 0 ? sizeIds.join(",") : undefined,
    minPrice,
    maxPrice,
    search: s,
  });

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Search" }];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="space-y-10 pb-10">
        <Billboard data={billboards[0]} />
        <BreadcrumbComponent items={breadcrumbs} />
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <div className="hidden lg:flex lg:flex-col lg:gap-y-4">
            <FiltersSection
              sizes={sizes}
              colors={colors}
              categories={categories}
              products={products}
            />
          </div>
          <div className="mt-6 lg:col-span-4 lg:mt-0">
            <ProductList
              initialProducts={products}
              initialSortBy={searchParams.sortBy || "createdAt"}
              initialSortOrder={searchParams.sortOrder || "desc"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
