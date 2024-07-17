import getColors from "@/actions/color/get-colors";
import getProducts from "@/actions/product/get-products";
import getSizes from "@/actions/size/get-sizes";
import ProductCard from "@/components/home/product-card";
import NoResults from "@/components/no-results";
import FiltersSection from "@/components/filters-section";
// import getCategory from "@/actions/category/get-category"; // Uncomment if needed

interface ShopPageProps {
  searchParams: {
    colorId?: string;
    sizeId?: string;
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

  const products = await getProducts({
    colorId,
    sizeId: sizeIds.length > 0 ? sizeIds.join(",") : undefined,
  });

  // const category = await getCategory(); // Uncomment if needed

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
        <div className="hidden lg:flex lg:flex-col lg:gap-y-4">
          <FiltersSection sizes={sizes} colors={colors} />
        </div>
        <div className="mt-6 lg:col-span-4 lg:mt-0">
          <div className="mb-4">{products.length} Products</div>

          {products.length === 0 && <NoResults />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
