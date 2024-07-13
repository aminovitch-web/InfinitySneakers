import getProducts from "@/actions/product/get-products";
import getProduct from "@/actions/product/get-product";
import ProductPageContent from "./_components/product-page-content";
import ProductRedirect from "./_components/product-redirect";

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

  return (
    <>
      <ProductRedirect product={product} />
      {product && (
        <ProductPageContent
          product={product}
          suggestedProducts={suggestedProducts}
        />
      )}
    </>
  );
};

export default SingleProductPage;
