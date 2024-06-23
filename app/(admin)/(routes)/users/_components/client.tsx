"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { UserColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface UsersClientProps {
  data: UserColumn[];
}

const UsersClient: React.FC<UsersClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users for your store"
        />
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
        description="API calls for Users."
      />
      <Separator />
      <ApiList entityName="users" entityIdName="userId" />
    </>
  );
};

export default UsersClient;
