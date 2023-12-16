import { useEffect } from "react";

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

const UsersAdmin = () => {
  const { toast } = useToast();

  async function fetchData() {
    try {
      // const result = await getUsers();
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
      // const result = await deleteUsers(id);
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
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="px-10 py-4 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Users</h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search by name user"
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <Table>
          <TableCaption>A list of your recent Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Create at</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((index) => (
              <>
                <TableRow>
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
                  <TableCell>+62 823 3378 9990</TableCell>
                  <TableCell>Des, 15 2023</TableCell>
                  <TableCell className="flex justify-center items-center h-32 gap-4">
                    <CustomDialog
                      title="Edit User"
                      description={"Form Validation User"}
                    >
                      <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                        <PencilLine />
                      </div>
                    </CustomDialog>
                    <Alert
                      title="Are you sure delete this User from Database?"
                      onAction={() => handleDelete(1)}
                    >
                      <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                        <Trash2 />
                      </div>
                    </Alert>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default UsersAdmin;
