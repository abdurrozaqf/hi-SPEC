export type Response<T = any> = {
  message: string;
  data: T;
};

export type ResponsePagination<T = any> = {
  message: string;
  data: T;
  pagination: {
    limit: number;
    page: number;
  };
};
