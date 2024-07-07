import getBillboard from "@/actions/billboard/get-billboard";
import getProducts from "@/actions/product/get-products";
import Billboard from "@/components/home/billboard";
import ProductList from "@/components/home/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("clyaz9qiu000343h97fechjz2");

  return (
    <main className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
