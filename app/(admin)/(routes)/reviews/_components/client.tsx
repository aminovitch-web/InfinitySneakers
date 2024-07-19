"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ReviewColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/api-list";

interface ReviewsClientProps {
  data: ReviewColumn[];
}

const ReviewsClient: React.FC<ReviewsClientProps> = ({ data }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Reviews (${data.length})`}
          description="Manage reviews for your store"
        />
      </div>
      <Separator />

      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Filter User Name"
      />

      <Heading
        title="API"
        className="mt-10"
        description="API calls for Reviews."
      />
      <Separator />
      <ApiList entityName="reviews" entityIdName="reviewId" />
    </>
  );
};

export default ReviewsClient;
