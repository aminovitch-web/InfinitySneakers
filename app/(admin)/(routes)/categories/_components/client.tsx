"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CategoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface CategoriesClientProps {
  data: CategoryColumn[];
}

const CategoriesClient: React.FC<CategoriesClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories for your store"
        />
        <Button
          variant="infinitySneakers"
          onClick={() => router.push("/categories/new")}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Filter names"
      />

      <Heading
        title="API"
        className="mt-10"
        description="API calls for Categories."
      />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
};

export default CategoriesClient;
