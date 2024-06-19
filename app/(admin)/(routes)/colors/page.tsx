import { format } from "date-fns";

import ColorsClient from "./_components/client";
import { db } from "@/prisma";
import { ColorColumn } from "./_components/columns";

const ColorsPage = async () => {
  const colors = await db.color.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <ColorsClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
