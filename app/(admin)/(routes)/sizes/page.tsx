import { format } from "date-fns";

import SizesClient from "./_components/client";
import { db } from "@/prisma";
import { SizeColumn } from "./_components/columns";

const SizesPage = async () => {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
