import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";

import SkeletonTransactionsUser from "@/components/SkeletonTransactionsUser";
import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
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

import { MyTransactions, getNota, getProfile } from "@/utils/apis/users";
import { formatDate, formatPrice } from "@/utils/formatter";

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
      toast({
        description:
          "Download invoice successful, please check your email for details.",
        variant: "default",
      });
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

        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow w-full z-10">
            <TableRow>
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[100px] text-center">Image</TableHead>
              <TableHead>Name Product</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Date Transaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <SkeletonTransactionsUser />
            ) : (
              <>
                {transactions?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={data.product_picture}
                        alt={data.product_name}
                        loading="lazy"
                      />
                    </TableCell>
                    <TableCell>{data.product_name}</TableCell>
                    <TableCell>{data.nota}</TableCell>
                    <TableCell>{formatPrice(data.total_price!)}</TableCell>
                    <TableCell>{formatDate(data.timestamp!)}</TableCell>
                    <TableCell
                      className={
                        data.status === "Pending"
                          ? "text-yellow-600 font-medium text-lg"
                          : data.status === "Canceled"
                          ? "text-red-600 font-medium text-lg"
                          : data.status === "Success"
                          ? "text-green-700 font-medium text-lg"
                          : "text-black font-medium text-lg"
                      }
                    >
                      {data.status}
                    </TableCell>
                    <TableCell>
                      <Alert
                        title={`Download nota ${data.nota}`}
                        description={
                          <p>
                            <span>Download your invoice product:</span>
                            <br />
                            <span className="font-medium">
                              {data.product_name}
                            </span>
                          </p>
                        }
                        onAction={() => handleNota(data.transaction_id)}
                        onActionTitle="Download"
                      >
                        <div
                          aria-label="Downlaad Invoice"
                          className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center"
                        >
                          <DownloadIcon />
                        </div>
                      </Alert>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Transaction;
