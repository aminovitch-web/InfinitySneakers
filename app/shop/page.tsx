import getColors from "@/actions/color/get-colors";
import getProducts from "@/actions/product/get-products";
import getSizes from "@/actions/size/get-sizes";
import FiltersSection from "@/components/filters-section";
import ProductList from "./_components/product-list";

interface ShopPageProps {
  searchParams: {
    colorId?: string;
    sizeId?: string;
    sortBy?: string;
    sortOrder?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const ShopPage: React.FC<ShopPageProps> = async ({ searchParams }) => {
  const sizes = await getSizes();
  const colors = await getColors();

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

  const minPrice = searchParams.minPrice
    ? parseFloat(searchParams.minPrice)
    : undefined;
  const maxPrice = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice)
    : undefined;

  const products = await getProducts({
    colorId,
    sizeId: sizeIds.length > 0 ? sizeIds.join(",") : undefined,
    minPrice,
    maxPrice,
  });

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <div className="hidden lg:flex lg:flex-col lg:gap-y-4">
          <FiltersSection sizes={sizes} colors={colors} />
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
  );
};

export default ShopPage;
