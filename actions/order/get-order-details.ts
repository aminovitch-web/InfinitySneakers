"use server";

import axiosInstance from "@/lib/axios";
import { Order } from "@/types";

const getOrderDetails = async (id: string): Promise<Order> => {
  const res = await axiosInstance(`/orders/${id}`);

  return res.data;
};

export default getOrderDetails;
