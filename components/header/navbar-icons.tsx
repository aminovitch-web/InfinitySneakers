"use client";

import { useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { MdOutlineLocalShipping, MdOutlineAccountCircle } from "react-icons/md";
import { IoLogInOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

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
import { logout } from "@/actions/logout";
import { RootState } from "@/store/store";
import { CartItem } from "@/types";
import { Card } from "@/components/ui/card";
import Currency from "@/components/currency";
import { removeItem } from "@/store/slices/cart-slice";

const NavbarIcons = () => {
  const { data } = useSession();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart);

  const [isUserCardOpen, setIsUserCardOpen] = useState(false);
  const [isShoppingCardOpen, setIsShoppingCardOpen] = useState(false);

  const handleLinkClick = () => {
    setIsUserCardOpen(false);
    setIsShoppingCardOpen(false);
  };

  const isLoggedIn = !!data?.user;

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
    logout().then(() => {
      window.location.replace("/login");
    });
  };

  const handleRemoveItem = (productId: string, size: string) => {
    dispatch(removeItem({ productId, size }));
  };

  return (
    <div className="flex items-center gap-6 xl:gap-7 max-xl:gap-4">
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

      <>
        <div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/wishlist"
                className="flex items-center justify-center"
              >
                <FaRegHeart className="w-5 h-5 cursor-pointer" />
              </Link>
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
                        {cartItems?.items?.length}
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
                {cartItems?.items.length < 1 ? (
                  <div className="flex flex-col gap-4">
                    <div>Cart is Empty</div>
                    <Button asChild variant="infinitySneakers">
                      <Link href="/shop" onClick={handleLinkClick}>
                        Go Shop
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <h2 className="text-xl">Shopping Cart</h2>
                    {/* LIST */}
                    <div className="flex flex-col gap-8">
                      {/* ITEM */}
                      {cartItems?.items.map((item: CartItem, i) => (
                        <div className="flex gap-4" key={i}>
                          <div className="w-28 h-max aspect-square relative ">
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name || ""}
                              sizes="30vw"
                              className="rounded-lg object-cover"
                              fill
                            />
                          </div>

                          <div className="flex flex-col justify-between w-full">
                            {/* TOP */}
                            <div className="flex flex-col gap-2 mb-2">
                              {/* TITLE */}
                              <div className="flex items-center justify-between gap-8">
                                <Link
                                  href={`/shop/${item.product.slug}/${item.product.id}`}
                                  onClick={handleLinkClick}
                                >
                                  <h3 className="font-semibold">
                                    {item.product.name}
                                  </h3>
                                </Link>

                                <div className="p-[6px] bg-primary-foreground rounded-sm text-sm">
                                  <Currency value={item.product.price} />
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-8">
                                <h3 className="text-sm">
                                  Color:{" "}
                                  <span className="font-bold">
                                    {item.product.color.name}
                                  </span>
                                </h3>
                                <h3 className="text-sm">
                                  Size:{" "}
                                  <span className="font-bold">
                                    {item.size.name}
                                  </span>
                                </h3>
                              </div>
                            </div>
                            {/* BOTTOM */}
                            <div className="flex justify-between text-sm items-center">
                              <span className="text-gray-500">
                                Qty. {item.quantity}
                              </span>
                              <Button
                                variant="link"
                                className="text-InfinitySneakers"
                                onClick={() =>
                                  handleRemoveItem(
                                    item.product.id,
                                    item.size.id
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* BOTTOM */}
                    <div>
                      <div className="flex items-center justify-between font-semibold">
                        <span>Subtotal</span>
                        <div>
                          <Currency value={cartItems?.totalAmount} />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm mt-6">
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

      <div>
        <ThemeToogle />
      </div>
    </div>
  );
};

export default NavbarIcons;
