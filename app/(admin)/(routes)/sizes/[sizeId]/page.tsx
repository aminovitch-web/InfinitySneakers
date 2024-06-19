import { SizeForm } from "./_components/size-form";
import { db } from "@/prisma";

const BillboardPage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default BillboardPage;
