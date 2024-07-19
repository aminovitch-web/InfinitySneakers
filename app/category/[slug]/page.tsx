import { notFound } from "next/navigation";

import getColors from "@/actions/color/get-colors";
import getProducts from "@/actions/product/get-products";
import getSizes from "@/actions/size/get-sizes";
import FiltersSection from "@/components/filters-section";
import ProductList from "@/app/shop/_components/product-list";
import getCategories from "@/actions/category/get-categories";
import Billboard from "@/components/home/billboard";
import BreadcrumbComponent from "@/components/breadcrumb-component";

interface SingleCategoryPageProps {
  searchParams: {
    colorId?: string;
    sizeId?: string;
    sortBy?: string;
    sortOrder?: string;
    priceRange?: string;
  };
  params: {
    slug: string;
  };
}

const SingleCategoryPage: React.FC<SingleCategoryPageProps> = async ({
  searchParams,
  params,
}) => {
  const sizes = await getSizes();
  const colors = await getColors();
  const categories = await getCategories();

  const categorySlug = decodeURIComponent(params.slug || "");

  // Find category ID based on the category name
  const category = categories.find(
    (category) => category.slug.toLowerCase() === categorySlug.toLowerCase()
  );
  const categoryId = category?.id;

  if (!categoryId) {
    notFound();
  }

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
    categoryId,
    colorId,
    sizeId: sizeIds.length > 0 ? sizeIds.join(",") : undefined,
    minPrice,
    maxPrice,
  });

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Category" },
    { label: `${category.name}` },
  ];

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="space-y-10 pb-10">
        <Billboard data={category?.billboard} />
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

export default SingleCategoryPage;
