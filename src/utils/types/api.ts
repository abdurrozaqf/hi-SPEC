import { Product } from "../apis/products/types";

export type Response = {
  message: string;
  data: Product[];
};

export type ResponsePagination = {
  message: string;
  data: Product[];
  pagination: {
    page: number;
    pagesize: number;
  };
};
