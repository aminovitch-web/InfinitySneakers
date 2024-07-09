import { notFound } from "next/navigation";

import getProducts from "@/actions/product/get-products";
import ProductList from "@/components/home/product-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WishlistCheck from "./_components/wishlist-check";
import Currency from "@/components/currency";
import getProduct from "@/actions/product/get-product";
import ProductImages from "./_components/product-images";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SingleProductPageProps {
  params: {
    slug: string;
  };
}

const SingleProductPage: React.FC<SingleProductPageProps> = async ({
  params,
}) => {
  const product = await getProduct(params.slug);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product || (Array.isArray(product) && product.length === 0)) {
    return notFound();
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="relative flex flex-col lg:flex-row gap-16">
        {/* IMG */}
        {product?.images !== undefined ? (
          <div className="w-full lg:w-1/2 lg:sticky top-20 h-max z-50">
            <ProductImages items={product?.images} />
          </div>
        ) : (
          ""
        )}
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          <span className="text-InfinitySneakers">
            {product?.category?.name}
          </span>
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-4xl font-medium">{product?.name}</h1>
          </div>
          <div className="flex items-center gap-4 my-4">
            <h3 className="text-lg">
              <Currency value={product?.price} />
            </h3>
          </div>

          <div className="flex items-center  gap-4">
            <Button variant="infinitySneakers" className="px-10 py-6 w-52 text-lg">
              Add to Bag
            </Button>
            <WishlistCheck product={product} />
          </div>

          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-y-4">
        <Separator />

        <Tabs defaultValue="suggestedProducts" className="mt-10">
          <TabsList
            className={`w-1/2 h-12 flex max-lg:flex-col max-lg:h-20 max-md:w-full`}
          >
            <TabsTrigger value="suggestedProducts" className="w-full h-full">
              WE THINK YOU'LL LIKE
            </TabsTrigger>
            <TabsTrigger value="recentlyViewedItems" className="w-full h-full">
              RECENTLY VIEWED ITEMS
            </TabsTrigger>
          </TabsList>
          <TabsContent value="suggestedProducts">
            <ProductList
              items={suggestedProducts.filter(
                (item) => item.id !== product?.id
              )}
            />
          </TabsContent>
          <TabsContent value="recentlyViewedItems">
            <ProductList
              items={suggestedProducts.filter(
                (item) => item.id !== product?.id
              )}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SingleProductPage;
