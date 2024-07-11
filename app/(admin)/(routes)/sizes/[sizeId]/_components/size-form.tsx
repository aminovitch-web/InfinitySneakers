"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { FaRegTrashAlt } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { AlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Size } from "@prisma/client";

import { SizeSchema } from "@/schemas";

interface SizeFormProps {
  initialData: Size | null;
}

type SizeFormValues = z.infer<typeof SizeSchema>;

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Size" : "Create Size";

  const description = initialData ? "Edit your size" : "Create a new size";

  const toastMessage = initialData
    ? "Size updated successfully"
    : "Size created successfully";

  const action = initialData ? "Save Changes" : "Create Size";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(SizeSchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/sizes/${params.sizeId}`, data);
      } else {
        await axios.post(`/api/sizes`, data);
      }

      router.push("/sizes");
      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete
      await axios.delete(`/api/sizes/${params.sizeId}`);

      router.push("/sizes");
      router.refresh();

      toast.success("Size deleted successfully");
    } catch (error) {
      toast.error("Make sure you removed all products using this size first. ");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <FaRegTrashAlt className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />

      {/* Form  and spreading the form using react hook form */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Size name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="ml-auto"
            type="submit"
            variant="infinitySneakers"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
