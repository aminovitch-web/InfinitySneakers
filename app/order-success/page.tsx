"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Currency from "@/components/currency";
import getOrderDetails from "@/actions/order/get-order-details";
import { Order } from "@/types";
import Confetti from "@/components/ui/confetti";
import { useCurrentUser } from "@/hooks/use-current-user";

const OrderSuccess = () => {
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        try {
          const orderData = await getOrderDetails(orderId);
          setOrder(orderData);
        } catch (error) {
          console.error("Failed to fetch order details:", error);
        }
      }
    };

    fetchOrder();
  }, [orderId]);

  useEffect(() => {
    if (!searchParams.get("success") || !orderId || order === null) {
      router.replace("/");
    }
  }, [router, searchParams, orderId, order]);

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-green-500 p-4 text-white">
              <FaCheck className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order Completed
            </h1>
            <p className="text-muted-foreground text-center">
              Thank you for your purchase! Your order is being processed.
            </p>
          </div>
          <Card className="h-auto">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              {order ? (
                <div className="flex flex-col gap-5 justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order #</span>
                    <span className="text-right max-w-60">{order?.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-right max-w-60">{order?.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-right max-w-60">{order?.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="text-right max-w-60">
                      {order?.address}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-right max-w-60">
                      {format(new Date(order?.createdAt), "MMMM do, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-right max-w-60">
                      <Currency value={order?.totalAmount} />
                    </span>
                  </div>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {user !== undefined && (
                <Link
                  href="/profile/orders"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  View Orders
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Back to Home
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      {order !== null && searchParams.get("success") && orderId && (
        <Confetti
          duration={4000}
          isActive={
            order !== null && searchParams.get("success") && orderId
              ? true
              : false
          }
        />
      )}
    </div>
  );
};

export default OrderSuccess;
