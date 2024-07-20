"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
  DrawerOverlay,
  DrawerPortal,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SearchBar from "./search-bar";
import ThemeToogle from "./theme-toogle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  const { data } = useSession();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [open, setOpen] = useState(false);
  const isLoggedIn = !!data?.user;

  const pathname = usePathname();

  const adminLinks = [
    {
      href: "/dashboard",
      name: "Dashboard",
      isActive: pathname === "/dashboard" ? true : false,
    },
    {
      href: "/billboards",
      name: "Billboards",
      isActive: pathname === "/billboards" ? true : false,
    },
    {
      href: "/categories",
      name: "Categories",
      isActive: pathname === "/categories" ? true : false,
    },
    {
      href: "/colors",
      name: "Colors",
      isActive: pathname === "/colors" ? true : false,
    },
    {
      href: "/sizes",
      name: "Sizes",
      isActive: pathname === "/sizes" ? true : false,
    },
    {
      href: "/orders",
      name: "Orders",
      isActive: pathname === "/orders" ? true : false,
    },
    {
      href: "/products",
      name: "Products",
      isActive: pathname === "/products" ? true : false,
    },
    {
      href: "/stocks",
      name: "Stocks",
      isActive: pathname === "/stocks" ? true : false,
    },
    {
      href: "/reviews",
      name: "Reviews",
      isActive: pathname === "/reviews" ? true : false,
    },
    {
      href: "/users",
      name: "Users",
      isActive: pathname === "/users" ? true : false,
    },
  ];

  const publicLinks = [
    {
      href: "/",
      name: "Home",
      isActive: pathname === "/" ? true : false,
    },
    {
      href: "/shop",
      name: "Shop",
      isActive: pathname === "/shop" ? true : false,
    },
    {
      href: "/contact",
      name: "Contact",
      isActive: pathname === "/contact" ? true : false,
    },
    {
      href: "/cart",
      name: `Cart (${cartItems?.items?.length})`,
      isActive: pathname === "/cart" ? true : false,
    },
  ];

  const logoutUser = () => {
    logout().then(() => {
      window.location.replace("/login");
    });
  };

  return (
    <nav>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <IoIosMenu
            className="w-7 h-7 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </SheetTrigger>
        <SheetContent
          className="DialogContent flex flex-col justify-between"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <SheetHeader className="w-full flex flex-col items-center gap-6 mt-8">
            <h4 className="text-xl font-medium">InfinitySneakers</h4>
            <Separator />
            {data?.user?.role === "ADMIN"
              ? adminLinks.map((link) => (
                  <Link
                    href={link.href}
                    className={`hover:text-InfinitySneakers text-lg ${
                      link.isActive && "text-InfinitySneakers"
                    }`}
                    onClick={() => setOpen(false)}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                ))
              : publicLinks.map((link) => (
                  <Link
                    href={link.href}
                    className={`hover:text-InfinitySneakers text-lg ${
                      link.isActive && "text-InfinitySneakers"
                    }`}
                    onClick={() => setOpen(false)}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
            <SearchBar />
            <div className="flex items-center justify-center w-full">
              <ThemeToogle />
            </div>
          </SheetHeader>
          <SheetFooter className="flex flex-col gap-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild onClick={() => setOpen(false)}>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    logoutUser();
                  }}
                >
                  Sign out
                </Button>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Menu;
