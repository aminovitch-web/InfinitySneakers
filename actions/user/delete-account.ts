import axiosInstance from "@/lib/axios";

const deleteAccount = async (userId: string) => {
  const response = await axiosInstance.delete(`/profile/${userId}`);

  return response.data;
};

export default deleteAccount;
