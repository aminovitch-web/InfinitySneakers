"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

import onCheckout from "@/actions/checkout/checkout";
import Currency from "@/components/currency";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { removeAll } from "@/store/slices/cart-slice";
import { useDispatch } from "react-redux";

const Summary = ({ cartItems }: any) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Something went wrong!");
    }
  }, [searchParams, removeAll]);

  const onClick = () => {
    onCheckout(cartItems?.items).then(() => {
      dispatch(removeAll());
    });
  };

  return (
    <div className="bg-popover border rounded-lg p-6 grid gap-4 h-60">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Order Summary</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>
            <Currency value={cartItems.totalAmount} />
          </span>
        </div>
      </div>
      <Button
        size="lg"
        className="w-full"
        variant="infinitySneakers"
        disabled={cartItems.items.length < 1}
        onClick={onClick}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
