"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { addItem } from "@/store/slices/recently-viewed-slice";
import { Product } from "@/types";
import ProductList from "@/components/home/product-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Currency from "@/components/currency";
import ProductImages from "./product-images";
import { Separator } from "@/components/ui/separator";
import Sizes from "./sizes";
import RecentlyViewedItems from "./recently-viewed-items";

interface ProductPageContentProps {
  product: Product;
  suggestedProducts: Product[];
}

const ProductPageContent: React.FC<ProductPageContentProps> = ({
  product,
  suggestedProducts,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addItem(product));
  }, [dispatch, product]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="relative flex flex-col lg:flex-row gap-16">
        {/* IMGS */}
        {product?.images !== undefined ? (
          <div className="w-full lg:w-1/2 lg:sticky top-10 h-max z-50">
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

          <div className="flex flex-col gap-2">
            <h4 className="font-medium">
              Color: <span className="font-bold">{product?.color.name}</span>
            </h4>
            <div className="w-10 h-10 relative cursor-pointer flex flex-wrap gap-2">
              <Image
                src={product?.images[0]?.url}
                alt=""
                fill
                sizes="50vw"
                className="rounded-md border-2 border-InfinitySneakers hover:scale-105 transition object-cover"
              />
            </div>
          </div>

          <Sizes product={product} />

          <div
            className="product-description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-y-4">
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
            <RecentlyViewedItems />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductPageContent;
