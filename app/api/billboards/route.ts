import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    const billboard = await db.billboard.create({
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const billboards = await db.billboard.findMany();

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
