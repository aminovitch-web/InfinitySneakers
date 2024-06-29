"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Menu from "@/components/header/menu";
import SearchBar from "@/components/header/search-bar";
import NavbarIcons from "@/components/header/navbar-icons";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();

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
  ];

  return (
    <header className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="flex items-center justify-between h-full lg:hidden">
        <Link href="/" className="text-xl font-medium tracking-wide">
          InfinitySneakers
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden lg:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="text-xl font-medium tracking-wide">
            InfinitySneakers
          </Link>
          <div className="hidden lg:flex gap-4">
            {data?.user?.role === "ADMIN"
              ? adminLinks.map((link) => (
                  <Link
                    href={link.href}
                    className={`hover:text-InfinitySneakers ${
                      link.isActive && "text-InfinitySneakers"
                    }`}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                ))
              : publicLinks.map((link) => (
                  <Link
                    href={link.href}
                    className={`hover:text-InfinitySneakers ${
                      link.isActive && "text-InfinitySneakers"
                    }`}
                    key={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
          </div>
        </div>
        {/* RIGHT */}
        <div
          className={`${
            data?.user.role !== "ADMIN" ? "w-[55%]" : ""
          } flex items-center justify-between gap-8`}
        >
          {data?.user?.role !== "ADMIN" && <SearchBar />}
          <NavbarIcons />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
