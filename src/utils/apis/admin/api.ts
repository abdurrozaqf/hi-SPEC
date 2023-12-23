import { Request, Response, ResponsePagination } from "@/utils/types/api";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { ResponseTransactions, Transactions } from "./types";

export const getNota = async (transaction_id: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/transaction/download/${transaction_id}`
    );

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

export const getDashboard = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/dashboard?${query}` : `/dashboard`;
    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getTransactions = async (params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`${key}=${params[key]}`);
      }

      query = queryParams.join("&");
    }

    const url = query ? `/transactions?${query}` : `/transactions`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponseTransactions;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
