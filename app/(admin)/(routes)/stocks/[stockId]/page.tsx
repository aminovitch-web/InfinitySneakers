import { StockForm } from "./_components/stock-form";
import { db } from "@/prisma";

const StockPage = async ({ params }: { params: { stockId: string } }) => {
  const stock = await db.stock.findUnique({
    include: {
      product: {
        include: {
          images: true,
        },
      },
      size: true,
    },
    where: {
      id: params.stockId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <StockForm initialData={stock} />
      </div>
    </div>
  );
};

export default StockPage;
