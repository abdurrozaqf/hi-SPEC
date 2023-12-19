import * as z from "zod";

export const statusSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

export type StatusSchema = z.infer<typeof statusSchema>;

export type Transactions = {
  transaction_id: number;
  nota: string;
  product_id: number;
  total_price: number;
  status: string;
  timestamp: Date;
  token: string;
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
