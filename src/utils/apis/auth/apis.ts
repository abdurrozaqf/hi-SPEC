import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { BodyLogin, BodyRegister } from ".";

export const RegisterAccount = async (body: BodyRegister) => {
  try {
    const response = await axiosWithConfig.post(
      "https://virtserver.swaggerhub.com/hi_specs/hi_specs/1.0.0/register",
      body
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const LoginAccount = async (body: BodyLogin) => {
  try {
    const response = await axiosWithConfig.post(
      "https://virtserver.swaggerhub.com/hi_specs/hi_specs/1.0.0/login",
      body
    );

    return response.data as Response<{ token: string}>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};