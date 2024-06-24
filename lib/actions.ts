import { db } from "@/prisma";

export const getTotalSales = async () => {
  const orders = await db.order.findMany();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );
  return { totalOrders, totalRevenue };
};

export const getTotalProducts = async () => {
  const products = await db.product.findMany();
  const totalProducts = products.length;
  return { totalProducts };
};

export const getTotalCategories = async () => {
  const categories = await db.category.findMany();
  const totalCategories = categories.length;
  return { totalCategories };
};

export const getTotalUsers = async () => {
  const users = await db.user.findMany();
  const totalUsers = users.length;
  return { totalUsers };
};

export const getSalesPerMonth = async () => {
  const orders = await db.order.findMany();

  const salesPerMonth: { [key: number]: number } = orders.reduce(
    (acc, order) => {
      const monthIndex = new Date(order.createdAt).getMonth();
      acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
      return acc;
    },
    {} as { [key: number]: number }
  );

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i)
    );
    return { name: month, sales: salesPerMonth[i] || 0 };
  });

  return graphData;
};
