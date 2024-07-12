import { notFound } from "next/navigation";

import getProducts from "@/actions/product/get-products";
import getProduct from "@/actions/product/get-product";
import ProductPageContent from "./_components/product-page-content";

interface SingleProductPageProps {
  params: {
    slug: string;
    productId: string;
  };
}

const SingleProductPage: React.FC<SingleProductPageProps> = async ({
  params,
}) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product || (Array.isArray(product) && product.length === 0)) {
    return notFound();
  }

  return (
    <ProductPageContent
      product={product}
      suggestedProducts={suggestedProducts}
    />
  );
};

export default SingleProductPage;
