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

    const wishlists = await db.wishlist.findMany();

    return NextResponse.json(wishlists);
  } catch (error) {
    console.log("[WISHLISTS_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
