import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const stocks = await db.stock.findMany();

    return NextResponse.json(stocks);
  } catch (error) {
    console.log("[STOCKS_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
