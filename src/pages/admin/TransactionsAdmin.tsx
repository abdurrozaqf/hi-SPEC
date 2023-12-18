import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";

import { PencilLine, Trash2 } from "lucide-react";

const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState([]);
  const { toast } = useToast();

  async function getDataTransaction() {
    try {
      // const result = await getTransactions();
      // setTransactions(result)
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleDelete(id: number) {
    try {
      // const result = await deleteProducts(id);
      // toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getDataTransaction();
  }, []);
  return (
    <Layout>
      <div className="px-10 py-4 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">
          Database Transactions
        </h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <Table>
          <TableCaption>A list of user recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index}
                </TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>johndoe@mail.com</TableCell>
                <TableCell>
                  Jl. Veteran, Kec. Lowokwaru, Kota Malang, Jawa Timur
                </TableCell>
                <TableCell>Succes</TableCell>
                <TableCell className="flex justify-center items-center h-32 gap-4">
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
                    onAction={() => handleDelete(index)}
                  >
                    <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                      <Trash2 />
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

export default TransactionsAdmin;
