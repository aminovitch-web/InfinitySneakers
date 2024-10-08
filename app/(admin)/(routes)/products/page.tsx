import { format } from "date-fns";
import ProductClient from "./_components/client";
import { db } from "@/prisma";
import { ProductColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async () => {
  const products = await db.product.findMany({
    include: {
      category: true,
      sizes: {
        include: {
          size: true,
        },
      },
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    sizes: item.sizes.map((size) => size.size.name).join(", "), // Multiple sizes
    color: item.color.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
