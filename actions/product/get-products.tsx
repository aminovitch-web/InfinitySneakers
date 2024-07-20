"use server";

import qs from "query-string";
import axiosInstance from "@/lib/axios";
import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const { ...filters } = query;

  const url = qs.stringifyUrl({
    url: URL,
    query: {
      ...filters,
    },
  });

  const res = await axiosInstance.get(url);

  return res.data;
};

export default getProducts;
