import { useEffect, useState } from "react";
import { format } from "date-fns";

import { PencilLine, Trash2 } from "lucide-react";
import debounce from "lodash.debounce";
import axios from "axios";

import {
  Transactions,
  getTransactions,
  deleteTransactions,
} from "@/utils/apis/admin";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Product = {
  product_id: number;
  category: string;
  name: string;
  cpu: string;
  ram: string;
  display: string;
  storage: string;
  thickness: string;
  weight: string;
  bluetooth: string;
  hdmi: string;
  price: number;
  picture: string;
};

interface MergedData extends Transactions {
  product: Pick<Product, "name" | "picture" | "price" | "category">;
}

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState<Transactions[]>();
  const [products, setProducts] = useState<Product[]>();
  const [search, setSearch] = useState("");

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await getTransactions();
      setTransactions(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const fetchDataProduct = async () => {
    try {
      const Response = await getTransactions();
      const dataResponse = Response.data;

      const promises = dataResponse.map(async (data: any) => {
        const res = await axios.get(
          `http://3.104.106.44:8000/product/${data.product_id}`
        );
        const dataProducts = res.data.data;

        return dataProducts;
      });
      const results: any = await Promise.all(promises);
      setProducts(results);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const mergedData: MergedData[] =
    transactions?.map((transaction) => {
      const matchingProduct = products?.find(
        (product) => product.product_id === transaction.product_id
      );

      if (matchingProduct) {
        return {
          ...transaction,
          product: {
            name: matchingProduct.name,
            picture: matchingProduct.picture,
            price: matchingProduct.price,
            category: matchingProduct.category,
          },
        };
      } else {
        // Handle case when matching product is not found
        return {
          ...transaction,
          product: {
            name: "Unknown",
            picture:
              "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
            price: 0,
            category: "Unknown",
          },
        };
      }
    }) || [];
  // const mergedData: MergedData[] = transactions?.map((transaction) => {
  //   const matchingProduct = products?.find(
  //     (product) => product.product_id === transaction.product_id
  //   );

  //   if (matchingProduct) {
  //     return {
  //       ...transaction,
  //       product: {
  //         name: matchingProduct.name ?? "Unknown",
  //         picture:
  //           matchingProduct.picture ??
  //           "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
  //         price: matchingProduct.price ?? 0,
  //         category: matchingProduct.category ?? "Unknown",
  //       },
  //     };
  //   }

  //   return transaction;
  // });

  // async function handleDelete(transaction_id: number) {
  //   try {
  //     const result = await deleteTransactions(transaction_id);
  //     toast({ description: result.message });
  //   } catch (error: any) {
  //     toast({
  //       title: "Oops! Something went wrong.",
  //       description: error.toString(),
  //       variant: "destructive",
  //     });
  //   }
  // }

  const debounceRequest = debounce((search: string) => setSearch(search), 1000);

  useEffect(() => {
    fetchData();
    fetchDataProduct();
  }, []);

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">
          Database Transactions
        </h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => debounceRequest(e.target.value)}
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <Table>
          <TableCaption>A list of user recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              {/* <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead> */}
              <TableHead>Image Product</TableHead>
              <TableHead>Name Product</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead className="text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mergedData?.map((data, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                {/* <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>johndoe@mail.com</TableCell> */}
                <TableCell>
                  <img
                    src={data.product?.picture}
                    alt={data.product?.name}
                    className="object-cover h-24"
                  />
                </TableCell>
                <TableCell>{data.product?.name}</TableCell>
                <TableCell>
                  {data.total_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>
                  {format(new Date(data.timestamp), "iiii, dd MMMM Y")}
                </TableCell>
                <TableCell>{data.status}</TableCell>
                {/* <TableCell className="flex justify-center items-center h-32 gap-4">
                  <CustomDialog
                    title="Edit Transactions"
                    description={"Form Validation Transaction"}
                  >
                    <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                      <PencilLine />
                    </div>
                  </CustomDialog>
                  <Alert
                    title="Are you sure delete this User from Database?"
                    onAction={() => handleDelete(data.transaction_id)}
                  >
                    <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                      <Trash2 />
                    </div>
                  </Alert>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default TransactionsAdmin;
