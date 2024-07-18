import { db } from "@/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: {
                  include: {
                    images: true,
                    color: true,
                  },
                },
              },
            },
          },
        },
        wishlist: {
          include: {
            product: {
              include: {
                category: true,
                images: true,
              },
            },
          },
        },
      },
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: {
                  include: {
                    images: true,
                    color: true,
                  },
                },
              },
            },
          },
        },
        wishlist: {
          include: {
            product: {
              include: {
                category: true,
                images: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};
