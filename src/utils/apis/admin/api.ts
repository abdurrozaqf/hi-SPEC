import { Response, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { Transactions } from "./types";

export const getDashboard = async () => {
  try {
    const response = await axiosWithConfig.get(`/dashboard`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const buyProducts = async (body: {
  product_id: number;
  total_price: number;
}) => {
  try {
    const response = await axiosWithConfig.post(`/transaction`, body);

    return response.data as Response<Transactions>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getTransactions = async () => {
  try {
    const response = await axiosWithConfig.get(`/transactions`);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
