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

import { useToast } from "@/components/ui/use-toast";
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";

import { PencilLine, Trash2 } from "lucide-react";
import axios from "axios";
import debounce from "lodash.debounce";
import { format } from "date-fns";
import { deleteUser } from "@/utils/apis/users";
import EditUser from "@/components/form/EditUser";

type Users = {
  user_id: number;
  name: string;
  email: string;
  avatar: string;
  address: string;
  time: Date;
  phone_number: string;
};

const UsersAdmin = () => {
  const [users, setUsers] = useState<Users[]>();
  const [search, setSearch] = useState("");

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await axios.get(
        `http://3.104.106.44:8000/user/search?name=${search}`
      );
      setUsers(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleDelete(user_id: number) {
    try {
      const result = await deleteUser(user_id);
      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const debounceRequest = debounce((search: string) => setSearch(search), 1000);

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Layout>
      <div className="px-10 py-4 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Users</h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            onChange={(e) => debounceRequest(e.target.value)}
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
              {/* <TableHead className="text-center">Action</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src={
                      user.avatar ||
                      "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
                    }
                    alt={user.name}
                    className="object-cover bg-center rounded-full w-14 h-14"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>
                  {format(new Date(user.time), "iiii, dd MMMM Y")}
                </TableCell>
                {/* <TableCell className="flex justify-center items-center h-32 gap-4">
                  <CustomDialog
                    title="Edit User"
                    description={<EditUser user_id={user.user_id} />}
                  >
                    <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                      <PencilLine />
                    </div>
                  </CustomDialog>
                  <Alert
                    title={`Are you sure delete ${user.name.toUpperCase()} from database?`}
                    onAction={() => handleDelete(1)}
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

export default UsersAdmin;
