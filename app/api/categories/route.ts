import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";
import { createSlug } from "@/hooks/use-create-slug";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const slug = createSlug(name);

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        slug,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany({
      include: {
        billboard: true,
        products: {
          include: {
            images: true,
            color: true,
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Interal error", { status: 500 });
  }
}
