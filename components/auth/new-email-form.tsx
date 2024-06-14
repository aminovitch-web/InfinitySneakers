"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewEmailSchema } from "@/schemas";
import {
  Form,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from "@/components/ui/form";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { newEmail } from "@/actions/new-email";

const NewEmailForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();

  const token = searchParams.get("token") as string;

  const form = useForm<z.infer<typeof NewEmailSchema>>({
    resolver: zodResolver(NewEmailSchema),
    defaultValues: {
      code: "",
      token,
    },
  });

  const onSubmit = (values: z.infer<typeof NewEmailSchema>) => {
    setError("");
    setSuccess("");

    if (!token) {
      setError("Missing token");
      return;
    }

    startTransition(() => {
      newEmail(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => [setError("Something went wrong!")]);
    });
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="code">Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      id="code"
                      placeholder="Enter your verification code"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            className="w-full"
            type="submit"
            variant="infinitySneakers"
            disabled={isPending}
          >
            Confirm Your Email
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewEmailForm;
