"use server";

import axiosInstance from "@/lib/axios";
import { Product } from "@/types";

const getProduct = async (id: string): Promise<Product> => {
  const res = await axiosInstance.get(`/products/${id}`);

  return res.data;
};

export default getProduct;
