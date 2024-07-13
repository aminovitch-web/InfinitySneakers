import { NextResponse } from "next/server";

import { db } from "@/prisma";

export async function GET(req: Request) {
  try {
    const orders = await db.order.findMany();

    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDERS_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
