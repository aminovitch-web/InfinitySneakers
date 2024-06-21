"use client";

import { useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLocalShipping, MdOutlineAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ThemeToogle from "@/components/header/theme-toogle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { logout } from "@/actions/logout";

const NavbarIcons = ({ session }: any) => {
  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [isShoppingCardOpen, setIsShoppingCardOpen] = useState(false);

  const cartItems = true;

  const handleLinkClick = () => {
    setIsUserCardOpen(false);
    setIsShoppingCardOpen(false);
  };

  const isLoggedIn = !!session?.user;

  const profileCardLinks = isLoggedIn
    ? [
        { name: "Settings", href: "/settings", icon: <CiSettings size={20} /> },
        {
          name: "My Orders",
          href: "/orders",
          icon: <MdOutlineLocalShipping size={20} />,
        },
      ]
    : [
        { name: "Login", href: "/login", icon: <IoLogInOutline size={20} /> },
        {
          name: "Create an account",
          href: "/register",
          icon: <MdOutlineAccountCircle size={20} />,
        },
      ];

  const logoutUser = () => {
    logout();
  };

  return (
    <div className="flex items-center gap-6 xl:gap-7">
      <div>
        <HoverCard
          openDelay={60}
          open={isUserCardOpen}
          onOpenChange={setIsUserCardOpen}
        >
          <HoverCardTrigger asChild>
            <Button variant="icon" className="p-0">
              <FaRegUser className="w-5 h-5" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-60">
            <div className="flex justify-between space-x-4">
              <div className="space-y-2 flex flex-col gap-2 w-full p-2">
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
                      <Link
                        href={link.href}
                        key={link.name}
                        className="w-full"
                        onClick={handleLinkClick}
                      >
                        <Button
                          variant="ghost"
                          className="w-full flex items-start justify-start gap-3"
                        >
                          {link?.icon}
                          <p className="text-sm">{link.name}</p>
                        </Button>
                      </Link>
                    ))}

                    {isLoggedIn && (
                      <Button
                        variant="outline"
                        type="submit"
                        className="w-full flex items-start justify-start gap-3"
                        onClick={() => {
                          handleLinkClick();
                          logoutUser();
                        }}
                      >
                        <IoIosLogOut size={20} />
                        Sign out
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      {session?.user?.role !== "ADMIN" && (
        <>
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
            <Popover
              open={isShoppingCardOpen}
              onOpenChange={setIsShoppingCardOpen}
            >
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="flex items-center justify-center">
                        <FiShoppingCart
                          className="w-5 h-5"
                          onClick={(prev) => !prev}
                        />
                        <span className="w-5 h-5 absolute -top-4 -right-3 bg-InfinitySneakers text-white rounded-full text-sm flex items-center justify-center">
                          2
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View Cart</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </PopoverTrigger>
              <PopoverContent asChild>
                <Card className="w-[360px] p-4 absolute rounded-md shadow-md top-4 -right-4 flex flex-col gap-6 z-50">
                  {!cartItems ? (
                    <div>Cart is Empty</div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <h2 className="text-xl">Shopping Cart</h2>
                      {/* LIST */}
                      <div className="flex flex-col gap-8">
                        {/* ITEM */}
                        <div className="flex gap-4">
                          <Image
                            src={
                              "https://images.pexels.com/photos/20508967/pexels-photo-20508967/free-photo-of-adam-model-ceket-ayakta.jpeg"
                            }
                            alt=""
                            width={72}
                            height={96}
                            className="object-cover rounded-md"
                          />
                          <div className="flex flex-col justify-between w-full">
                            {/* TOP */}
                            <div>
                              {/* TITLE */}
                              <div className="flex items-center justify-between gap-8">
                                <h3 className="font-semibold">Product Name</h3>
                                <div className="p-[6px] bg-primary-foreground rounded-sm text-sm">
                                  $49
                                </div>
                              </div>
                            </div>
                            {/* DESC */}
                            <div className="text-sm text-gray-500">avaible</div>
                            {/* BOTTOM */}
                            <div className="flex justify-between text-sm items-center">
                              <span className="text-gray-500">Qty. 2</span>
                              <Button
                                variant="link"
                                className="text-InfinitySneakers"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* ITEM */}
                        <div className="flex gap-4">
                          <Image
                            src={
                              "https://images.pexels.com/photos/20508967/pexels-photo-20508967/free-photo-of-adam-model-ceket-ayakta.jpeg"
                            }
                            alt=""
                            width={72}
                            height={96}
                            className="object-cover rounded-md"
                          />
                          <div className="flex flex-col justify-between w-full">
                            {/* TOP */}
                            <div>
                              {/* TITLE */}
                              <div className="flex items-center justify-between gap-8">
                                <h3 className="font-semibold">Product Name</h3>
                                <div className="p-[6px] bg-primary-foreground rounded-sm text-sm">
                                  $49
                                </div>
                              </div>
                            </div>
                            {/* DESC */}
                            <div className="text-sm text-gray-500">avaible</div>
                            {/* BOTTOM */}
                            <div className="flex justify-between text-sm items-center">
                              <span className="text-gray-500">Qty. 2</span>
                              <Button
                                variant="link"
                                className="text-InfinitySneakers"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* BOTTOM */}
                      <div>
                        <div className="flex items-center justify-between font-semibold">
                          <span>Subtotal</span>
                          <div>$49</div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2 mb-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Accusantium, consequuntur!
                        </p>
                        <div className="flex justify-between text-sm">
                          <Button asChild variant="secondary">
                            <Link href="/cart" onClick={handleLinkClick}>
                              View Cart
                            </Link>
                          </Button>
                          <Button variant="infinitySneakers">Checkout</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </PopoverContent>
            </Popover>
          </div>
        </>
      )}

      <div>
        <ThemeToogle />
      </div>
    </div>
  );
};

export default NavbarIcons;
