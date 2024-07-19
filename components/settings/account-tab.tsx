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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";
import { PhoneInput } from "@/components/ui/phone-input";
import ImageUpload from "../ui/image-upload";

const AccountTab = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: {
      image: user?.image || undefined,
      name: user?.name || undefined,
      surname: user?.surname || undefined,
      email: user?.email || undefined,
      address: user?.address || undefined,
      phone: user?.phone || undefined,
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
              Update your user information
            </p>
          </div>
        </CardHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          disabled={isPending}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                          multiple={false}
                          isProfile={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} id="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="surname">Surname</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              id="surname"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              type="email"
                              id="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} id="address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left" htmlFor="phone">
                        Phone Number
                      </FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          placeholder="Enter a phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-left">
                        Enter a phone number
                      </FormDescription>
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

export default AccountTab;
