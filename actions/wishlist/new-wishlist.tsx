import axiosInstance from "@/lib/axios";
import { Wishlist } from "@/types";

const newWishlist = async (
  userId: string,
  data: any
): Promise<Wishlist> => {
  const res = await axiosInstance.post(`/wishlist/${userId}`, data);

  return res.data;
};

export default newWishlist;
