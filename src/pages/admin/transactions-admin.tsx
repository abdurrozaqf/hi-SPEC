import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/Pagination";
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

import { Transactions, getTransactions } from "@/utils/apis/admin";
import { getDetailProduct } from "@/utils/apis/products";
import { Product } from "@/utils/apis/products";
import { formatPrice } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

interface MergedData extends Transactions {
  product: Pick<Product, "name" | "picture" | "price" | "category">;
}

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState<Transactions[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<Meta>();

  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    fetchDataProduct();
  }, [searchParams]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getTransactions({ ...query });

      setTransactions(result.data);
      setMeta(result.pagination);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const fetchDataProduct = async () => {
    setIsLoading(true);
    try {
      const Response = await getTransactions();
      const dataResponse = Response.data;

      const promises = dataResponse.map(async (data: any) => {
        const res = await getDetailProduct(data.product_id);
        const dataProducts = res.data;
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
    } finally {
      setIsLoading(false);
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

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-start grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center mb-10">
          Database Transactions
        </h1>

        {transactions === null ? (
          <div className="flex grow justify-center items-center">
            <p className="text-sm text-slate-500 font-light tracking-wide">
              There is no transaction list
            </p>
          </div>
        ) : (
          <div className="flex justify-center grow overflow-auto">
            {isLoading ? (
              <div className="flex items-center h-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Loading</p>
              </div>
            ) : (
              <Table>
                <TableCaption>A list of user recent invoices.</TableCaption>
                <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D]">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">No.</TableHead>
                    <TableHead>Image Product</TableHead>
                    <TableHead>Name Product</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <>
                    {mergedData?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          <img
                            src={data.product?.picture}
                            alt={data.product?.name}
                            className="object-cover h-24"
                          />
                        </TableCell>
                        <TableCell>
                          <p className="truncate">{data.product?.name}</p>
                        </TableCell>
                        <TableCell>{formatPrice(data.total_price!)}</TableCell>
                        <TableCell>
                          {format(new Date(data.timestamp), "iiii, dd MMMM Y")}
                        </TableCell>
                        <TableCell>{data.status}</TableCell>
                      </TableRow>
                    ))}
                  </>
                </TableBody>
              </Table>
            )}
          </div>
        )}
        <div className="mt-4">
          <Pagination
            meta={meta}
            onClickPage={(page) => handlePrevNextPage(page)}
            onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
            onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsAdmin;
