"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface BillboardsClientProps {
  data: BillboardColumn[];
}

const BillboardsClient: React.FC<BillboardsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          variant="infinitySneakers"
          onClick={() => router.push("/billboards/new")}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable
        columns={columns}
        data={data}
        searchKey="label"
        searchPlaceholder="Filter labels"
      />

      <Heading
        title="API"
        className="mt-10"
        description="API calls for Billboards."
      />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

export default BillboardsClient;
