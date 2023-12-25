import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { formatPrice } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState<Transactions[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<Meta>();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getTransactions({ ...query });

      setTransactions(result.transactions);
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

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-3 md:px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-start grow shadow-products-card font-poppins overflow-auto">
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
                <TableCaption>A list of users recent invoices.</TableCaption>
                <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow z-10">
                  <TableRow>
                    <TableHead className="w-[50px] text-center">No.</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Image Product
                    </TableHead>
                    <TableHead>Name Product</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions?.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">
                        {(meta?.page! - 1) * meta?.limit! + index + 1}
                      </TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={
                              data.user_picture || "/images/default-avatar.png"
                            }
                            alt={data.user_name}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{data.user_name}</TableCell>
                      <TableCell>
                        <img
                          src={data.picture_product}
                          alt={data.name_product}
                        />
                      </TableCell>
                      <TableCell>{data.name_product}</TableCell>
                      <TableCell>{data.nota}</TableCell>
                      <TableCell>{formatPrice(data.total_price!)}</TableCell>
                      <TableCell>
                        {format(new Date(data.timestamp), "iiii, dd MMM Y")}
                      </TableCell>
                      <TableCell
                        className={
                          data.status === "Pending"
                            ? "text-yellow-600 font-medium text-lg"
                            : data.status === "Canceled"
                            ? "text-red-600 font-medium text-lg"
                            : data.status === "Success"
                            ? "text-green-600 font-medium text-lg"
                            : "text-black font-medium text-lg"
                        }
                      >
                        {data.status}
                      </TableCell>
                    </TableRow>
                  ))}
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
