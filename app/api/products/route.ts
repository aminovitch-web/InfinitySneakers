import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/prisma";
import { createSlug } from "@/hooks/use-create-slug";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    const body = await req.json();

    const {
      name,
      description,
      price,
      categoryId,
      colorId,
      sizes,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizes || !sizes.length) {
      return new NextResponse("Sizes are required", { status: 400 });
    }

    const slug = createSlug(name);

    const product = await db.product.create({
      data: {
        name,
        description,
        price,
        slug,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => image),
          },
        },
        sizes: {
          create: sizes.map((size: any) => ({
            size: {
              connect: { id: size?.value },
            },
          })),
        },
      },
    });

    const stockData = sizes.map((size: any) => ({
      productId: product.id,
      sizeId: size?.value,
      quantity: 0,
    }));

    await db.stock.createMany({
      data: stockData,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeNames = decodeURIComponent(searchParams.get("sizeId") || "")
      .split(",")
      .filter(Boolean);
    const isFeatured = searchParams.get("isFeatured");
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;

    const sizeFilter =
      sizeNames.length > 0
        ? {
            sizes: {
              some: {
                size: {
                  id: {
                    in: sizeNames,
                  },
                },
              },
            },
          }
        : {};

    const products = await db.product.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
        categoryId,
        colorId: colorId ? colorId : undefined,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        ...sizeFilter,
        price: {
          gte: minPrice !== undefined ? minPrice : undefined,
          lte: maxPrice !== undefined ? maxPrice : undefined,
        },
      },
      include: {
        images: true,
        category: true,
        color: true,
        sizes: {
          include: {
            size: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
