"use client";

import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
      });
    });

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    id="email"
                    placeholder="m@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error || urlError} />
        <FormSuccess message={success} />

        <Button
          className="w-full"
          type="submit"
          variant="infinitySneakers"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
