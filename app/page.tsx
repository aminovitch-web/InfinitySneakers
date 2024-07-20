import getBillboards from "@/actions/billboard/get-billboards";
import getCategories from "@/actions/category/get-categories";
import getProducts from "@/actions/product/get-products";
import Billboard from "@/components/home/billboard";
import Categories from "@/components/home/categories";
import ProductList from "@/components/home/product-list";
import StoreInfo from "@/components/home/store-info";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboards();
  const categories = await getCategories();

  return (
    <main className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="space-y-10 pb-10">
        <Billboard data={billboards[0]} />
        <div className="flex flex-col gap-y-8">
          <ProductList title="Featured Products" items={products} />
        </div>
        <div className="flex flex-col gap-y-8">
          <Categories categories={categories} />
        </div>
        {/* <div className="flex flex-col gap-y-8">
          <StoreInfo />
        </div> */}
      </div>
    </main>
  );
};

export default HomePage;
