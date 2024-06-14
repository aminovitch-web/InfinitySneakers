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
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// import { useOrigin } from "@/hooks/use-origin";
import { Billboard } from "@prisma/client";

import { BillboardSchema } from "@/schemas";

interface BillboardFormProps {
  initialData: Billboard | null;
}

type BillboardFormValues = z.infer<typeof BillboardSchema>;

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Billboard" : "Create Billboard";

  const description = initialData
    ? "Edit your billboard"
    : "Create a new billboard";

  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";

  const action = initialData ? "Save Changes" : "Create Billboard";

  //   const origin = useOrigin();
  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(BillboardSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  // onDelete -> delete store -> refresh page -> redirect to root page (root layout will check if user has store and open createStore Modal if not found -> create store page will check if user has store and redirect to dashboard if found )

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);

      //& if initialData is true then we are updating the store else we are creating a new store (initialData is null)

      if (initialData) {
        await axios.patch(`/api/billboards/${params.billboardId}`, data);
      } else {
        await axios.post(`/api/billboards`, data);
      }

      router.refresh();
      router.push(`/billboards`);
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
      await axios.delete(`/api/billboards/${params.billboardId}`);
      router.refresh();

      router.push("/billboards");
      toast.success("Billboard deleted successfully");
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first. "
      );
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
          className="space-y-8 max-w-xl"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Billboard label"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
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
