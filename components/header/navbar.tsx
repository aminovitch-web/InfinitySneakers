"use client";

import Link from "next/link";

import Menu from "@/components/header/menu";
import SearchBar from "@/components/header/search-bar";
import NavbarIcons from "@/components/header/navbar-icons";

const Navbar = ({ session }: any) => {  
  return (
    <header className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* MOBILE */}
      <div className="flex items-center justify-between h-full md:hidden">
        <Link href="/" className="text-xl font-medium tracking-wide">
          InfinitySneakers
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="text-xl font-medium tracking-wide">
            InfinitySneakers
          </Link>
          <div className="hidden xl:flex gap-4">
            <Link href="/" className="hover:text-InfinitySneakers">
              Home
            </Link>
            <Link href="/" className="hover:text-InfinitySneakers">
              Shop
            </Link>
            <Link href="/" className="hover:text-InfinitySneakers">
              Contact
            </Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavbarIcons session={session} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
