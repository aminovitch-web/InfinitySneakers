"use client";

import { useEffect, useState } from "react";
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
import BreadcrumbComponent from "@/components/breadcrumb-component";
import { useCurrentUser } from "@/hooks/use-current-user";
import ReviewForm from "./review-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, parseISO } from "date-fns";
import axiosInstance from "@/lib/axios";

interface ProductPageContentProps {
  product: Product;
  suggestedProducts: Product[];
}

const ProductPageContent: React.FC<ProductPageContentProps> = ({
  product,
  suggestedProducts,
}) => {
  const dispatch = useDispatch();
  const [reviews, setReviews] = useState<any[]>([]);
  const user = useCurrentUser();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axiosInstance(`/reviews?productId=${product.id}`);
      const data = await response.data;
      setReviews(data);
    };

    fetchReviews();
  }, [product.id]);

  useEffect(() => {
    dispatch(addItem(product));
  }, [dispatch, product]);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: `${product?.name}` },
  ];

  const getTimeAgo = (dateString: any) => {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  };

  // Check if the user has purchased the product
  const hasPurchasedProduct = user?.order?.some((order: any) =>
    order.orderItems.some((item: any) => item.productId === product.id)
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="my-4">
        <BreadcrumbComponent items={breadcrumbs} />
      </div>
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
        <h2 className="text-3xl font-bold mb-4">Product Reviews</h2>

        {user && hasPurchasedProduct && <ReviewForm productId={product.id} />}
        <ul className="flex flex-col gap-4 mt-12">
          {reviews?.map((review) => (
            <div key={review.id} className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage src={review?.user?.image || ""} />
                <AvatarFallback>
                  {review?.user?.name?.charAt(0)}{" "}
                  {review?.user?.surname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-4 w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-4 items-start">
                    <div className="grid gap-0.5 text-sm">
                      <h3 className="font-semibold">{review?.user?.name}</h3>
                      <time className="text-sm text-muted-foreground">
                        {getTimeAgo(review?.createdAt)}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <StarIcon
                        key={value}
                        className={`w-5 h-5 ${
                          review?.rating >= value
                            ? "fill-primary"
                            : "fill-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm leading-loose text-muted-foreground">
                  <p>{review?.content}</p>
                </div>
              </div>
            </div>
          ))}
        </ul>
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

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
