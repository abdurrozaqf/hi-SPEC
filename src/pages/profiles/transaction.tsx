import { DownloadIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
// import DetailTransaction from "@/components/DetailTransaction";
import { useToast } from "@/components/ui/use-toast";
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

import { MyTransactions, getProfile } from "@/utils/apis/users";
import { formatPrice } from "@/utils/formatter";
import { getNota } from "@/utils/apis/admin";

const Transaction = () => {
  const [transactions, setTransactions] = useState<MyTransactions[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getProfile();
      setTransactions(result.data.transaction);
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

  async function handleNota(transaction_id: number) {
    try {
      const result = await getNota(transaction_id);
      window.open(`${result.url}`, "_blank");
      console.log("url download nota", result.url);

      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <BannerSponsorWishlist />
      <div className="flex flex-col grow bg-white dark:bg-[#1265ae24] mt-0 lg:mt-6 px-4 py-4 lg:px-8 lg:py-6 rounded-lg shadow-products-card font-poppins overflow-auto">
        <h1 className="text-center mb-10 text-xl font-bold">
          History Transactions
        </h1>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Loading</p>
          </div>
        ) : (
          <>
            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow w-full">
                <TableRow>
                  <TableHead className="w-[50px] text-center">No</TableHead>
                  <TableHead className="w-[100px]">Image Product</TableHead>
                  <TableHead>Name Product</TableHead>
                  <TableHead>Nota</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Date Transaction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <img src={data.product_picture} alt={data.product_name} />
                    </TableCell>
                    <TableCell>{data.product_name}</TableCell>
                    <TableCell>{data.nota}</TableCell>
                    <TableCell>{formatPrice(data.total_price!)}</TableCell>
                    <TableCell>
                      {format(new Date(), "iiii, dd MMM Y")}
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
                    <TableCell>
                      <Alert
                        title={`Download nota ${data.nota}`}
                        description={`Download your invoice product: ${data.product_name}`}
                        onAction={() => handleNota(data.transaction_id)}
                        onActionTitle="Download"
                      >
                        <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                          <DownloadIcon />
                        </div>
                      </Alert>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Transaction;
