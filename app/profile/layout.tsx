"use client";

import { useState } from "react";
import Link from "next/link";
import { FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer"; // Import drawer components from Shadcn UI
import { Badge } from "@/components/ui/badge";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useCurrentUser();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mt-10">
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-64 flex-col border-r p-6 md:flex">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>
                {user?.name?.charAt(0)} {user?.surname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-center">
              <h2 className="text-xl font-semibold">
                {user?.name} {user?.surname}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              {user?.role === "ADMIN" && (
                <div className="bg-InfinitySneakers rounded-md mt-2 text-white">
                  {user?.role}
                </div>
              )}
            </div>
          </div>
          <Separator className="my-6" />
          <nav className="grid gap-2">
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <FaRegUserCircle className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/profile/wishlist"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <FaRegHeart className="w-5 h-5" />
              Wish List
            </Link>
            <Link
              href="/profile/orders"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <MdOutlineLocalShipping className="h-5 w-5" />
              My Orders
            </Link>
            <Link
              href="/profile/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
              prefetch={false}
            >
              <IoSettingsOutline className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:px-10">
          <Drawer
            direction="left"
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
          >
            <DrawerTrigger onClick={() => setDrawerOpen(true)}>
              <div className="flex items-center gap-1">
                <Avatar className="w-10 h-10 cursor-pointer md:hidden">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>
                    {user?.name?.charAt(0)} {user?.surname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="md:hidden">Open Menu</Badge>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerClose
                className="right-2 top-2 absolute"
                onClick={() => setDrawerOpen(false)}
              >
                <IoMdClose className="w-5 h-5" />
              </DrawerClose>
              <DrawerHeader className="w-full flex flex-col items-center gap-6 mt-8">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>
                    {user?.name?.charAt(0)} {user?.surname?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid gap-1 text-center">
                  <h2 className="text-xl font-semibold">
                    {user?.name} {user?.surname}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {user?.role === "ADMIN" && (
                    <div className="bg-InfinitySneakers rounded-md mt-2">
                      {user?.role}
                    </div>
                  )}
                </div>
                <Separator className="my-6" />
                <nav className="flex flex-col w-full justify-center gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaRegUserCircle className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/profile/wishlist"
                    className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <FaRegHeart className="w-5 h-5" />
                    Wish List
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <MdOutlineLocalShipping className="h-5 w-5" />
                    My Orders
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                    prefetch={false}
                    onClick={() => setDrawerOpen(false)}
                  >
                    <IoSettingsOutline className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
