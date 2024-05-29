"use client";

import Link from "next/link";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";

import { Separator } from "@/components/ui/separator";

const Menu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IoIosMenu
        className="w-7 h-7 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-zinc-900 text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10 px-2">
          <Link href="/">Home</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Contact</Link>
          <Link href="/">Cart (1)</Link>

          <Separator className="bg-zinc-500" />

          <Link href="/">My Account</Link>
          <Link href="/">Orders</Link>
          <Link href="/">Logout</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
