import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { db } from "@/prisma";
import { auth } from "@/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const userSession = await auth();
    const userId = userSession?.user.id;

    const { products } = await req.json();

    if (!products || products.length === 0) {
      return new NextResponse("Products are required", { status: 400 });
    }

    const productIds = products.map((p: any) => p.id);

    const dbProducts = await db.product.findMany({
      include: {
        images: true,
      },
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product: any) => {
      const dbProduct = dbProducts.find((p) => p.id === product.id);

      if (!dbProduct) {
        throw new Error(`Product with ID ${product.id} not found`);
      }

      line_items.push({
        quantity: product.quantity,
        price_data: {
          currency: "USD",
          product_data: {
            name: `${dbProduct.name} (Size: ${product.size.name})`,
            images: [dbProduct.images[0]?.url || ""],
          },
          unit_amount: Math.round(dbProduct.price * 100),
        },
      });
    });

    const totalAmount = products.reduce((sum: number, product: any) => {
      const dbProduct = dbProducts.find((p) => p.id === product.id);
      if (dbProduct) {
        const productPrice = dbProduct.price * product.quantity;
        return sum + productPrice;
      }
      return sum;
    }, 0);

    const order = await db.order.create({
      data: {
        isPaid: false,
        name: "",
        email: "",
        userId: userId || "",
        totalAmount: totalAmount,
        orderItems: {
          create: products.map((product: any) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            quantity: product.quantity || 1,
            size: product.size.name, // Size should be a string
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_FRONTEND_URL}/order-success?success=1&orderId=${order.id}`,
      cancel_url: `${process.env.NEXT_FRONTEND_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json(
      { url: session.url },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
