import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const wishlist = await db.wishlist.findMany({
      include: {
        product: {
          include: {
            category: true,
            images: true,
          },
        },
      },
      where: {
        userId: params.userId,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log("[WISHLIST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const isLiked = session.user.wishlist.some(
      (item: any) => item.productId === productId
    );

    if (isLiked) {
      // Dislike
      const deletedWishlist = await db.wishlist.deleteMany({
        where: {
          userId: userId,
          productId: productId,
        },
      });
      return NextResponse.json(deletedWishlist);
    }

    const wishlist = await db.wishlist.create({
      data: {
        userId,
        productId,
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log("[WISHLIST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
