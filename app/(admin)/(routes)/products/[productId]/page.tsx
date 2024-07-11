import { ProductForm } from "./_components/product-form";
import { db } from "@/prisma";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  let initialData = undefined;

  try {
    const product = await db.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        sizes: {
          include: {
            size: true,
          },
        },
      },
    });

    if (product) {
      const formattedSizes = product.sizes.map((ps) => ({
        value: ps.size.id,
        label: ps.size.name,
      }));

      initialData = {
        ...product,
        sizes: formattedSizes,
      };
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  const categories = await db.category.findMany();
  const sizes = await db.size.findMany();
  const colors = await db.color.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ProductForm
          initialData={initialData}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;
