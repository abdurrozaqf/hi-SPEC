import axiosWithConfig from "../axiosWithConfig";
import { Response, ResponsePagination } from "@/utils/types/api";

export const getDashboard = async () => {
  try {
    const response = await axiosWithConfig.get(`/dashboard`);

    return response.data as Response;
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
