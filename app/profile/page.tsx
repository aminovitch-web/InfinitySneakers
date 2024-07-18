"use client";

import { format } from "date-fns";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/hooks/use-current-user";
import Orders from "./_components/orders";

const ProfilePage = () => {
  const user = useCurrentUser();

  return (
    <main className="flex-1">
      <div className="grid gap-6">
        <div className="grid gap-4 rounded-lg mt-6 shadow-sm">
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
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-1">
              <h3 className="text-sm font-medium">Joined</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(user?.createdAt), "MMMM do, yyyy")}
              </p>
            </div>
          </div>
        </div>
        <Orders />
      </div>
    </main>
  );
};

export default ProfilePage;
