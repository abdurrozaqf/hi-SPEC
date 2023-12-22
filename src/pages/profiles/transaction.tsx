import { useEffect, useState } from "react";

import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";
import { useToast } from "@/components/ui/use-toast";
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

import { User, getProfile } from "@/utils/apis/users";
import { formatPrice } from "@/utils/formatter";
import { format } from "date-fns";
import Alert from "@/components/AlertDialog";
import DetailTransaction from "@/components/DetailTransaction";
import { BookCheckIcon, LaptopIcon } from "lucide-react";
import { getNota } from "@/utils/apis/admin";

const datas = [
  {
    product: {
      product_id: 12,
      category: "Office",
      name: "IdeaPad Slim 3 (15 inch AMD)",
      price: 8500000,
      picture:
        "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
    },
    transaction_id: 37,
    nota: "HI-SPEC-37",
    total_price: 8500000,
    status: "Pending",
    timestamp: "2023-12-21T13:37:23.945Z",
    token: "9dc9c680-66f6-464a-82ef-a5b1d6892f8d",
    url: "https://app.sandbox.midtrans.com/snap/v3/redirection/9dc9c680-66f6-464a-82ef-a5b1d6892f8d",
  },
  {
    product: {
      product_id: 42,
      category: "Multimedia",
      name: "Acer Travelmate TMP214-0005",
      price: 9799000,
      picture:
        "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
    },
    transaction_id: 36,
    nota: "HI-SPEC-36",
    total_price: 9799000,
    status: "Canceled",
    timestamp: "2023-12-21T10:58:36.1Z",
    token: "68e54c5b-5fa8-4e53-9a29-05889dffa76f",
    url: "https://app.sandbox.midtrans.com/snap/v3/redirection/68e54c5b-5fa8-4e53-9a29-05889dffa76f",
  },
  {
    product: {
      product_id: 43,
      category: "Gaming",
      name: "MSI Titan GT77 HX",
      price: 68650000,
      picture:
        "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
    },
    transaction_id: 35,
    nota: "HI-SPEC-35",
    total_price: 68650000,
    status: "Success",
    timestamp: "2023-12-21T09:54:27.677Z",
    token: "57087b4e-1688-4045-b3f4-c65a30bc5103",
    url: "https://app.sandbox.midtrans.com/snap/v3/redirection/57087b4e-1688-4045-b3f4-c65a30bc5103",
  },
];

const Transaction = () => {
  const [profile, setProfile] = useState<User>();
  const { toast } = useToast();
  console.log(profile);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await getProfile();
      setProfile(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }
  async function handleNota(transaction_id: number) {
    try {
      const result = await getNota(transaction_id);
      toast({ description: result.message });
      // window.open("https://www.example.com", "_blank");
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
          <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow">
            <TableRow>
              <TableHead className="w-[50px] text-center">No</TableHead>
              <TableHead className="w-[150px]">Image Product</TableHead>
              <TableHead>Name Product</TableHead>
              <TableHead>Nota</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Date Transaction</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((data, index) => (
              <TableRow>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>
                  <img src={data.product.picture} alt={data.product.name} />
                </TableCell>
                <TableCell>{data.product.name}</TableCell>
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
                <TableCell>
                  <Alert
                    title={`Detail Transaction ${data.nota}`}
                    description={
                      <DetailTransaction
                        transaction_id={data.product.product_id}
                      />
                    }
                    onAction={() => handleNota(data.transaction_id)}
                    onActionTitle="Download Nota"
                  >
                    <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                      <BookCheckIcon />
                    </div>
                  </Alert>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default Transaction;
