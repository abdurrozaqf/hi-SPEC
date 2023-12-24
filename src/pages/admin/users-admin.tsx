import { Loader2, PencilLine, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { format } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfileUsers from "@/components/form/EditProfileUsers";
import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/Pagination";
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

import { ResponseUsers, deleteProfile, getUsers } from "@/utils/apis/users";
import { Meta } from "@/utils/types/api";

const UsersAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<ResponseUsers[]>();
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
      const result = await getUsers({ ...query });

      setUsers(result.data);
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

  async function handleDeleteUsers(user_id: number) {
    try {
      const result = await deleteProfile(user_id);
      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  function handleSearch(value: string) {
    if (value !== "") {
      searchParams.set("name", value);
      searchParams.delete("page");
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  const debounceRequest = debounce(
    (search: string) => handleSearch(search),
    500
  );

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-3 md:px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center mb-6 md:mb-0">
          Database Users
        </h1>
        <div className="flex mb-6 md:mb-10">
          <input
            type="search"
            onChange={(e) => debounceRequest(e.target.value)}
            placeholder="Search by name user"
            className="w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <div className="flex justify-center grow overflow-auto">
          {isLoading ? (
            <div className="flex items-center h-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Loading</p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of your recent Users.</TableCaption>
              <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow z-10">
                <TableRow>
                  <TableHead className="w-[50px] text-center">No</TableHead>
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
                {users
                  ?.filter((user) => user.role !== "admin")
                  .map((user, index) => (
                    <TableRow key={user.user_id}>
                      <TableCell className="text-center">
                        {(meta?.page! - 1) * meta?.limit! + index + 1}
                      </TableCell>
                      <TableCell>
                        <Avatar className="shadow-products-card">
                          <AvatarImage
                            src={user.avatar}
                            alt={user.name}
                            className="object-cover"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.phone_number}</TableCell>
                      <TableCell>
                        {format(new Date(user.time), "iiii, dd MMM Y")}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-4">
                          <CustomDialog
                            title={`Edit Profile ${user.name}`}
                            description={<EditProfileUsers datas={user} />}
                          >
                            <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                              <PencilLine />
                            </div>
                          </CustomDialog>
                          <Alert
                            title="Are you sure delete this Products from Database?"
                            onAction={() => handleDeleteUsers(user.user_id)}
                            onActionTitle="Delete"
                          >
                            <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                              <Trash2 />
                            </div>
                          </Alert>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
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

export default UsersAdmin;
