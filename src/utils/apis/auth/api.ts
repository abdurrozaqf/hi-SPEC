import { Response } from "@/utils/types/api";
import { LoginSchema, RegisterSchema } from "./types";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

export const RegisterAccount = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const LoginAccount = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<{ token: string; user_id: string }>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
