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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, UserRole } from "@prisma/client";

import { UserSchema } from "@/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface UserFormProps {
  initialData: User | null;
}

type UserFormValues = z.infer<typeof UserSchema>;

export const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const transformedData = {
    name: initialData?.name ?? "",
    surname: initialData?.surname ?? "",
    email: initialData?.email ?? "",
    role: initialData?.role ?? "CUSTOMER",
    active: initialData?.active ?? true,
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit User" : "Create User";

  const description = initialData ? "Edit your user" : "Create a new user";

  const toastMessage = initialData
    ? "User updated successfully"
    : "User created successfully";

  const action = initialData ? "Save Changes" : "Create User";

  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: transformedData || {
      name: "",
      surname: "",
      email: "",
      role: UserRole,
      active: "",
    },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await axios.patch(`/api/users/${params.userId}`, data);
      } else {
        await axios.post(`/api/users`, data);
      }

      router.push("/users");
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
      await axios.delete(`/api/users/${params.userId}`);

      router.push("/users");
      router.refresh();

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Something went wrong.");
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
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="User name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading || transformedData.surname === ""}
                      placeholder="User Surname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a role"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>
                        {UserRole.ADMIN}
                      </SelectItem>
                      <SelectItem value={UserRole.CUSTOMER}>
                        {UserRole.CUSTOMER}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
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
                    <FormLabel>Active</FormLabel>
                    <FormDescription>
                      The user will not be able to log in to the account
                    </FormDescription>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
