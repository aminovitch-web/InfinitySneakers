"use client";

import { useState } from "react";
import { format } from "date-fns";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const Orders = () => {
  const user = useCurrentUser();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order);
  };

  // Sort orders by createdAt date in descending order (most recent first)
  const sortedOrders = user?.order
    .slice()
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <>
      <div className="grid gap-4 rounded-lg bg-background mt-6 shadow-sm">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div
                    className="font-medium cursor-pointer w-fit"
                    onClick={() => handleOrderClick(item)}
                  >
                    #{item.id}
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(item.createdAt), "MMMM do, yyyy")}
                </TableCell>
                <TableCell>${item.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={item.isPaid ? "secondary" : "outline"}>
                    {item.isPaid ? "Delivered" : "Pending"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Shadcn Dialog for Order Details */}
      {selectedOrder && (
        <Dialog open={true} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogTitle className="text-lg">Order Details</DialogTitle>
            <Separator />
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {format(new Date(selectedOrder.createdAt), "MMMM do, yyyy")}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Badge variant={selectedOrder.isPaid ? "green" : "outline"}>
                {selectedOrder.isPaid ? "Delivered" : "Pending"}
              </Badge>
            </p>
            {selectedOrder.isPaid && (
              <p>
                <strong>Address:</strong> {selectedOrder.address}
              </p>
            )}
            {/* Render order items */}
            {selectedOrder.orderItems.map((orderItem: any) => (
              <div key={orderItem.id} className="flex items-center space-x-4">
                <div>{orderItem.quantity} x</div>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={orderItem.product.images[0]?.url} />
                  <AvatarFallback>
                    {orderItem.product.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h4 className="text-lg font-semibold">
                    {orderItem.product.name}
                  </h4>
                  <p className="text-sm">Size: {orderItem.size}</p>
                  <p className="text-sm">
                    Price: ${orderItem.product.price.toFixed(2)}
                  </p>
                  {/* Add color information if available */}
                  {orderItem.product.colorId && (
                    <Badge variant="outline" className="w-fit">
                      Color: {orderItem.product.color.name}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Orders;
