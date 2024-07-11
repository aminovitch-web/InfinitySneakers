"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { StockColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface StocksClientProps {
  data: StockColumn[];
}

const StocksClient: React.FC<StocksClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Stocks (${data.length})`}
          description="Manage stocks for your store"
        />
      </div>
      <Separator />

      <DataTable
        columns={columns}
        data={data}
        searchKey="productName"
        searchPlaceholder="Filter products"
      />

      <Heading
        title="API"
        className="mt-10"
        description="API calls for Stocks."
      />
      <Separator />
      <ApiList entityName="stocks" entityIdName="stockId" />
    </>
  );
};

export default StocksClient;
