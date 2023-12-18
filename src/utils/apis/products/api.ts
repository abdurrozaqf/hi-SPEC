import axiosWithConfig from "../axiosWithConfig";
import { Response } from "@/utils/types/api";

type Product = {
  product_id: number;
  name: string;
  cpu: string;
  ram: string;
  display: string;
  storage: string;
  thickness: string;
  weight: string;
  bluetooth: string;
  hdmi: string;
  price: string;
  category: string;
  image: string;
  picture: string;
};

export const getDetailProduk = async (product_id: string) => {
  try {
    const response = await axiosWithConfig.get(`/product/${product_id}`);

    return response.data as Response<Product>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
