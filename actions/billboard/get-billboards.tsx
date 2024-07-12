"use server";

import axiosInstance from "@/lib/axios";
import { Billboard } from "@/types";

const getBillboards = async (): Promise<Billboard[]> => {
  const res = await axiosInstance.get("/billboards");

  return res.data;
};

export default getBillboards;
