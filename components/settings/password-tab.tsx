"use client";

import * as z from "zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { SettingSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";

const PasswordTab = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { update, data } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      password: undefined || "",
      newPassword: undefined || "",
    },
  });

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-6">
        <CardHeader>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Change your password
            </p>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          id="password"
                          placeholder="Enter your current password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="password"
                          id="newPassword"
                          placeholder="Enter your new password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormSuccess message={success} />
              <FormError message={error} />

              <Button
                type="submit"
                variant="infinitySneakers"
                disabled={isPending}
              >
                Save
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordTab;
