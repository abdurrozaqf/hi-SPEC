export type Transactions = {
  user_picture: string;
  user_name: string;
  name_product: string;
  picture_product: string;
  nota: string;
  total_price: number;
  timestamp: Date;
  status: string;
  url: string;
};

export type ResponseDashboard = {
  total_product: number;
  total_user: number;
  total_transaction: number;
  product: {
    id: number;
    category: string;
    name: string;
    price: number;
    picture: string;
  }[];
};

export type ResponseTransactions = {
  transactions: Transactions[];
  message: string;
  pagination: {
    limit: number;
    page: number;
    total_page: number;
  };
};
