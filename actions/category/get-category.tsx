"use server";

import axiosInstance from "@/lib/axios";
import { Category } from "@/types";

const getCategory = async (id: string): Promise<Category> => {
  const res = await axiosInstance.get(`/categories/${id}`);

  return res.data;
};

export default getCategory;
