"use server";

import axiosInstance from "@/lib/axios";
import { Size } from "@/types";

const getSizes = async (): Promise<Size[]> => {
  const res = await axiosInstance.get("/sizes");

  return res.data;
};

export default getSizes;
