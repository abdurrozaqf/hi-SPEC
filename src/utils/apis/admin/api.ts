import axiosWithConfig from "../axiosWithConfig";
import { Response } from "@/utils/types/api";

export const getTransactions = async () => {
  try {
    const response = await axiosWithConfig.get(`/transactions`);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteTransactions = async (transaction_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/transactions/${transaction_id}`
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
