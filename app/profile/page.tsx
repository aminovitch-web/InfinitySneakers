"use client";

import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import BreadcrumbComponent from "@/components/breadcrumb-component";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/alert-modal";
import deleteAccount from "@/actions/user/delete-account";
import { logout } from "@/actions/logout";

const ProfilePage = () => {
  const user = useCurrentUser();

  const breadcrumbs = [{ label: "Home", href: "/" }, { label: "Profile" }];

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      // Delete
      await deleteAccount(user?.id!);

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
      setOpen(false);
      await logout();
    }
  };

  return (
    <>
      <main className="flex-1">
        <div className="grid gap-2">
          <BreadcrumbComponent items={breadcrumbs} />
          <div className="grid gap-4 rounded-lg mt-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h2 className="text-xl font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              {user && (
                <Button
                  disabled={loading}
                  variant="destructive"
                  onClick={() => setOpen(true)}
                  className="flex items-center gap-2"
                >
                  <FaRegTrashAlt className="h-4 w-4" />
                  Delete Account
                </Button>
              )}
            </div>
            <Separator />
            <div className="flex flex-col gap-4 mt-4">
              <div>
                <h3 className="text-sm font-medium">Name</h3>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
              {user?.surname !== null && (
                <div>
                  <h3 className="text-sm font-medium">Surname</h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.surname}
                  </p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Joined</h3>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(user?.createdAt), "MMMM do, yyyy")}
                </p>
              </div>
              {user?.address !== null && (
                <div>
                  <h3 className="text-sm font-medium">Address</h3>
                  <p className="text-sm text-muted-foreground">
                    {user?.address}
                  </p>
                </div>
              )}
              {user?.phone !== null && (
                <div>
                  <h3 className="text-sm font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">{user?.phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
    </>
  );
};

export default ProfilePage;
