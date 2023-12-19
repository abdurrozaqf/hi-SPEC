import * as z from "zod";

export const statusSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

export type StatusSchema = z.infer<typeof statusSchema>;

export type Transactions = {
  transaction_id: number;
  product_id: number;
  total_price: number;
  status: string;
  timestamp: Date | string;
};
