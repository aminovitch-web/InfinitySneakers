import { CategoryForm } from "./_components/category-form";
import { db } from "@/prisma";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await db.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await db.billboard.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
