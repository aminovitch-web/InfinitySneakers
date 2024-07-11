"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import Image from "next/image";

export type StockColumn = {
  id: string;
  image: string;
  productName: string;
  size: string;
  quantity: number;
  createdAt: string;
};

export const columns: ColumnDef<StockColumn>[] = [
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
    accessorKey: "size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
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
