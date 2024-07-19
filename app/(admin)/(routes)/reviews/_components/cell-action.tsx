"use client";

import { FiMoreHorizontal } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CopyIcon } from "@radix-ui/react-icons";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReviewColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";

interface CellActionProps {
  data: ReviewColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  // loading state and modal state
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Review Id copied to clipboard.");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete store
      await axios.delete(`/api/reviews/${data.id}`);
      router.refresh();
      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <FiMoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>

          {/* Update */}
          <DropdownMenuItem
            onClick={() => router.push(`/reviews/${data.id}`)}
          >
            <CiEdit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <MdDeleteOutline className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
