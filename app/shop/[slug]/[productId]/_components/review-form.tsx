"use client";

import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { Form, FormProvider, useForm } from "react-hook-form";
import { ReviewSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface BillboardFormProps {
  productId: string | null;
}

type ReviewFormValues = z.infer<typeof ReviewSchema>;

const ReviewForm: React.FC<BillboardFormProps> = ({ productId }) => {
  const [loading, setLoading] = useState(false);

  const formMethods = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      productId: productId || "",
      content: "",
      rating: 0,
    },
  });

  const { register, handleSubmit, setValue, watch } = formMethods;
  const rating = watch("rating");

  const handleStarClick = (value: number) => {
    setValue("rating", value);
  };

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      setLoading(true);

      await axiosInstance.post(`/reviews`, data);
      toast.success("Your review has been sent for approval.");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      formMethods.reset();
    }
  };

  return (
    <div>
      <div className="grid gap-4">
        <div className="grid gap-4">
          <FormProvider {...formMethods}>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <FormField
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          id="content"
                          placeholder="Share your thoughts..."
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Star Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <StarIcon
                            key={value}
                            className={`w-6 h-6 cursor-pointer ${
                              rating >= value ? "fill-primary" : "fill-muted"
                            }`}
                            onClick={() => handleStarClick(value)}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                type="submit"
                variant="infinitySneakers"
              >
                Submit Review
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

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
