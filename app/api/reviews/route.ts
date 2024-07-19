import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();
    const { productId, content, rating } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId || !content || !rating) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the user has purchased this product
    const hasPurchased = await db.orderItem.findFirst({
      where: {
        order: {
          userId,
          isPaid: true,
        },
        productId,
      },
    });

    if (!hasPurchased) {
      return new NextResponse(
        "You must purchase the product to leave a review",
        { status: 403 }
      );
    }

    // Create the review with initial approval status as false
    const review = await db.review.create({
      data: {
        userId,
        productId,
        content,
        rating,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const reviews = await db.review.findMany({
      where: {
        productId,
        isApproved: true, // Only fetch approved reviews
      },
      include: {
        user: true, // Fetch user details to get name and image
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.log("[REVIEW_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
