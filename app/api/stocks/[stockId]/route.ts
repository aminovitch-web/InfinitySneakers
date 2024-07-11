import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";

export async function GET(
  req: Request,
  { params }: { params: { stockId: string } }
) {
  try {
    if (!params.stockId) {
      return new NextResponse("Stock id is required", { status: 400 });
    }

    const stock = await db.stock.findUnique({
      include: {
        product: true,
        size: true,
      },
      where: {
        id: params.stockId,
      },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.log("[STOCK_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { stockId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const { quantity } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    if (!params.stockId) {
      return new NextResponse("Stock id is required", { status: 400 });
    }

    const stock = await db.stock.updateMany({
      where: {
        id: params.stockId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.log("[STOCK_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { stockId: string } }
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

    if (!params.stockId) {
      return new NextResponse("Stock id is required", { status: 400 });
    }

    const stock = await db.stock.deleteMany({
      where: {
        id: params.stockId,
      },
    });

    return NextResponse.json(stock);
  } catch (error) {
    console.log("[STOCK_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
