"use server";

import axiosInstance from "@/lib/axios";
import { Color } from "@/types";

const getColors = async (): Promise<Color[]> => {
  const res = await axiosInstance.get("/colors");

  return res.data;
};

export default getColors;
