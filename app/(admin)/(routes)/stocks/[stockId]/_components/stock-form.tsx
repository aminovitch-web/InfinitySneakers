"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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

import { StockSchema } from "@/schemas";
import Image from "next/image";

interface StockFormProps {
  initialData: any;
}

type StockFormValues = z.infer<typeof StockSchema>;

export const StockForm: React.FC<StockFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Stock" : "Create Stock";

  const description = initialData ? "Edit your Stock" : "Create a new Stock";

  const toastMessage = initialData
    ? "Stock updated successfully"
    : "Stock created successfully";

  const action = initialData ? "Save Changes" : "Create Stock";

  //   const origin = useOrigin();
  const form = useForm<StockFormValues>({
    resolver: zodResolver(StockSchema),
    defaultValues: initialData || {
      quantity: 0,
    },
  });

  const onSubmit = async (data: StockFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/stocks/${params.stockId}`, data);
      } else {
        await axios.post(`/api/stocks`, data);
      }

      router.push("/stocks");
      router.refresh();

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  console.log(form.getValues());

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />

      {/* Form  and spreading the form using react hook form */}

      <div className="text-lg">
        Product Name:{" "}
        <span className="font-bold">{initialData?.product?.name}</span>
        <br />
        Size: <span className="font-bold">{initialData?.size?.name}</span>
      </div>
      <div className="grid grid-cols-5 max-sm:grid-cols-4 justify-between gap-2">
        {initialData?.product?.images.map((item: any, i: number) => (
          <div className="w-full aspect-square relative mt-5" key={item.id}>
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

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Controller
                    name="quantity"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        disabled={loading}
                        placeholder="Quantity"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
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
