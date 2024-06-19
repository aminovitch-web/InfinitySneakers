import { format } from "date-fns";

import BillboardsClient from "./_components/client";
import { db } from "@/prisma";
import { BillboardColumn } from "./_components/columns";

const BillboardsPage = async () => {
  const billboards = await db.billboard.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <BillboardsClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
