"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import Image from "next/image";

export type ReviewColumn = {
  id: string;
  image: string;
  isApproved: boolean;
  productName: string;
  name: string;
  content: string;
  rating: number;
  createdAt: string;
};

export const columns: ColumnDef<ReviewColumn>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-16 h-16 relative">
        <Image
          src={row?.original.image}
          alt=""
          fill
          sizes="50vw"
          className="rounded-md object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
  },
  {
    accessorKey: "isApproved",
    header: "Approved",
    cell: ({ row }) => (
      <div>
        {row.original.isApproved === true ? "✅" : "❌"}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
