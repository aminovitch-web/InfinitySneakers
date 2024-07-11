import { format } from "date-fns";

import StocksClient from "./_components/client";
import { db } from "@/prisma";
import { StockColumn } from "./_components/columns";

const StocksPage = async () => {
  const stocks = await db.stock.findMany({
    include: {
      product: {
        include: {
          images: true,
        },
      },
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedStocks: StockColumn[] = stocks.map((item) => ({
    id: item.id,
    image: item.product.images[0].url,
    productName: item.product.name,
    size: item.size.name,
    quantity: item.quantity,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <StocksClient data={formattedStocks} />
      </div>
    </div>
  );
};

export default StocksPage;
