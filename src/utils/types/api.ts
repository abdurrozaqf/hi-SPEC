export interface Request {
  name?: string;
  category?: string;
  minprice?: string;
  maxprice?: string;
  page?: string | number;
  limit?: string | number;
}

export type Response<T = any> = {
  message: string;
  data: T;
};

export type ResponsePagination<T = any> = {
  data: T;
  message: string;
  pagination: {
    limit: number;
    page: number;
  };
};

export interface Meta {
  limit: number;
  page: number;
}
