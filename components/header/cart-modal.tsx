"use client";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";

const CartModal = React.forwardRef(() => {
  const cartItems = true;

  return (
    <Card className="w-max absolute p-4 rounded-md shadow-md top-4 -right-2 flex flex-col gap-6 z-50 bg-primary-foreground">
      {!cartItems ? (
        <div>Cart is Empty</div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2  className="text-xl">Shopping Cart</h2>
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
                    <div className="p-[6px] bg-InfinitySneakers rounded-sm text-white text-sm">
                      $49
                    </div>
                  </div>
                </div>
                {/* DESC */}
                <div className="text-sm text-gray-500">avaible</div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500">Qty. 2</span>
                  <Button variant="link" className="text-InfinitySneakers">
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
                    <div className="p-[6px] bg-InfinitySneakers rounded-sm text-white text-sm">
                      $49
                    </div>
                  </div>
                </div>
                {/* DESC */}
                <div className="text-sm text-gray-500">avaible</div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-500">Qty. 2</span>
                  <Button variant="link" className="text-InfinitySneakers">
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
            <p className="text-gray-500 text-sm mt-2 mb-4 max-w-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium, consequuntur!
            </p>
            <div className="flex justify-between text-sm">
              <Button variant="secondary">View Cart</Button>
              <Button>Checkout</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
});

export default CartModal;
