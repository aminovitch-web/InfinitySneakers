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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ReviewFormSchema } from "@/schemas";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

interface ReviewFormProps {
  initialData: any | null;
}

type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

export const ReviewForm: React.FC<ReviewFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Review" : "Create Review";

  const description = initialData ? "Edit your review" : "Create a new review";

  const toastMessage = initialData
    ? "Review updated successfully"
    : "Review created successfully";

  const action = initialData ? "Save Changes" : "Create Review";

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues: initialData || {
      isApproved: "",
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/reviews/${params.reviewId}`, data);
      } else {
        await axios.post(`/api/reviews`, data);
      }

      router.push("/reviews");
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
      await axios.delete(`/api/reviews/${params.reviewId}`);

      router.push("/reviews");
      router.refresh();

      toast.success("Review deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
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
      <div>
        Product Name:{" "}
        <span className="font-bold">{initialData?.product?.name}</span>
        <br />
      </div>
      <div className="grid grid-cols-5 max-sm:grid-cols-4 justify-between gap-2">
        {initialData?.product?.images.map((item: any, i: number) => (
          <div className="w-full aspect-square relative" key={item.id}>
            <Image
              src={item?.url}
              alt=""
              sizes="30vw"
              className="object-cover rounded-md"
              fill
            />
          </div>
        ))}
      </div>
      <div className="pt-6 flex flex-col gap-4">
        <h4 className="text-xl font-bold">Review</h4>
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 rounded-full aspect-square relative">
            <Image
              src={initialData?.user?.image}
              alt=""
              sizes="30vw"
              className="object-cover rounded-full"
              fill
            />
          </div>
          <div className="flex flex-col">
            <span>{initialData?.user?.name}</span>
            <span>{initialData?.user?.email}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Review Content:</p>
          <span>{initialData?.content}</span>
          <div className="flex items-center gap-1">
            <p>Rating:</p>
            {[1, 2, 3, 4, 5].map((value) => (
              <StarIcon
                key={value}
                className={`w-5 h-5 ${
                  initialData?.rating >= value ? "fill-primary" : "fill-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Form  and spreading the form using react hook form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="isApproved"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    disabled={loading}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Is Approved</FormLabel>
                  <FormDescription>
                    User review will be published on the product page.
                  </FormDescription>
                </div>
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

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
