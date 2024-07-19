import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";

export async function GET(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    if (!params.reviewId) {
      return new NextResponse("Review id is required", { status: 400 });
    }

    const review = await db.review.findUnique({
      include: {
        product: true,
      },
      where: {
        id: params.reviewId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const { isApproved } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // if (isApproved !== null) {
    //   return new NextResponse("isApproved is required", { status: 400 });
    // }

    if (!params.reviewId) {
      return new NextResponse("Review id is required", { status: 400 });
    }

    const review = await db.review.updateMany({
      where: {
        id: params.reviewId,
      },
      data: {
        isApproved,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!params.reviewId) {
      return new NextResponse("Review id is required", { status: 400 });
    }

    const review = await db.review.deleteMany({
      where: {
        id: params.reviewId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log("[REVIEW_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
