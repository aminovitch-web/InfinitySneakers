"use client";

import { useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ThemeToogle from "@/components/header/theme-toogle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartModal from "@/components/header/cart-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavbarIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // TEMPORARY
  const isLoggedIn = false;

  const profileCardLinks = isLoggedIn
    ? [
        { name: "My Account", href: "/profile" },
        { name: "Orders", href: "/profile/orders" },
      ]
    : [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
      ];

  return (
    <div className="flex items-center gap-6 xl:gap-7">
      <div>
        <HoverCard openDelay={60}>
          <HoverCardTrigger asChild>
            <Button variant="icon" className="p-0">
              <FaRegUser className="w-5 h-5" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-60">
            <div className="flex justify-between space-x-4">
              <div className="space-y-2 flex flex-col gap-2 text-center w-full p-2">
                <div>
                  {!isLoggedIn && (
                    <div>
                      <h4 className="text-sm font-semibold">
                        Login / Register
                      </h4>
                      <Separator className="my-3" />
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    {profileCardLinks?.map((link) => (
                      <Link href={link.href} key={link.name}>
                        <Button variant="ghost">
                          <p className="text-sm">{link.name}</p>
                        </Button>
                      </Link>
                    ))}

                    {isLoggedIn && <Button variant="outline">Logout</Button>}
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="flex items-center justify-center">
              <FaRegHeart className="w-5 h-5 cursor-pointer" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Wish List</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center justify-center">
                    <FiShoppingCart
                      className="w-5 h-5"
                      onClick={(prev) => !prev}
                    />
                    <div className="w-5 h-5 absolute -top-4 -right-3 bg-InfinitySneakers text-white rounded-full text-sm flex items-center justify-center">
                      2
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Cart</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent asChild>
            <CartModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <ThemeToogle />
      </div>
    </div>
  );
};

export default NavbarIcons;
