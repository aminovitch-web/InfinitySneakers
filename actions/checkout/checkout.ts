import axiosInstance from "@/lib/axios";

const onCheckout = async (items: any) => {
  const response = await axiosInstance.post("/checkout", {
    products: items?.map((item: any) => ({
      id: item?.product?.id,
      quantity: item?.quantity,
      size: item?.size,
    })),
  });

  window.location = response.data.url;
};

export default onCheckout;
