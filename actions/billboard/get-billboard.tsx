"use server"

import axiosInstance from "@/lib/axios";
import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await axiosInstance.get(`/billboards/${id}`);

  return res.data;
};

export default getBillboard;
