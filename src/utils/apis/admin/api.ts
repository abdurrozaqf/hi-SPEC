import { Request, ResponsePagination } from "@/utils/types/api";
import { ResponseTransactions } from "./types";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

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

    const url = query ? `/admin/dashboard?${query}` : `/admin/dashboard`;
    const response = await axiosWithConfig.get(url);

    return response.data as ResponsePagination;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getUsers = async (params?: Request) => {
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

    const url = query ? `/admin/users?${query}` : `/admin/users`;

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

    const url = query ? `/admin/transactions?${query}` : `/admin/transactions`;

    const response = await axiosWithConfig.get(url);

    return response.data as ResponseTransactions;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
