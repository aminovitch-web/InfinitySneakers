"use server";

import axiosInstance from "@/lib/axios";
import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> => {
  const res = await axiosInstance.get("/categories");

  return res.data;
};

export default getCategories;
