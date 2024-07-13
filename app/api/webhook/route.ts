import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/prisma";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  if (event.type === "checkout.session.completed") {
    const orderId = session?.metadata?.orderId;
    if (!orderId) {
      return new NextResponse("Order ID is missing", { status: 400 });
    }

    try {
      const order = await db.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
          name: session.customer_details?.name || "",
          address: addressString,
          phone: session.customer_details?.phone || "",
          email: session.customer_details?.email || "",
        },
        include: {
          orderItems: true,
        },
      });

      // Update stock for each product and size
      const stockUpdatePromises = order.orderItems.map(async (orderItem) => {
        const stock = await db.stock.findFirst({
          where: {
            productId: orderItem.productId,
            size: {
              name: orderItem.size,
            },
          },
        });

        if (stock && stock.quantity >= orderItem.quantity) {
          return db.stock.update({
            where: { id: stock.id },
            data: { quantity: stock.quantity - orderItem.quantity },
          });
        } else {
          throw new Error(
            `Insufficient stock for product ID: ${orderItem.productId}, size: ${orderItem.size}`
          );
        }
      });

      await Promise.all(stockUpdatePromises);

      return new NextResponse(null, { status: 200 });
    } catch (error: any) {
      return new NextResponse(`Database Error: ${error.message}`, {
        status: 500,
      });
    }
  }

  return new NextResponse(`Unhandled event type: ${event.type}`, {
    status: 400,
  });
}
