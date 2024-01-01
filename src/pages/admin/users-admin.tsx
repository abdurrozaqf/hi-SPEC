import { useSearchParams } from "react-router-dom";
import { PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import EditProfileUsers from "@/components/form/EditProfileUsers";
import SkeletonUsersAdmin from "@/components/SkeletonUsersAdmin";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { formatDate } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

import DefaultAvatar from "/images/default-avatar.png";

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
      fetchData();
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
        <h1 className="text-2xl font-medium text-center">Database Users</h1>
        <div className="flex my-6 md:my-10 px-4 md:px-0">
          <input
            type="search"
            aria-label="Search Users"
            placeholder="Search by name user"
            onChange={(e) => debounceRequest(e.target.value)}
            className="w-full md:w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <div className="flex justify-center grow overflow-auto">
          <Table>
            <TableCaption>A list of your recent Users.</TableCaption>
            <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow z-10">
              <TableRow>
                <TableHead className="w-[50px] text-center">No</TableHead>
                <TableHead>Role</TableHead>
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
              {isLoading ? (
                <SkeletonUsersAdmin />
              ) : (
                <>
                  {users?.map((user, index) => (
                    <TableRow key={user.user_id}>
                      <TableCell className="text-center">
                        {(meta?.page! - 1) * meta?.limit! + index + 1}
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Avatar className="shadow-md">
                          <AvatarImage
                            src={user.avatar || DefaultAvatar}
                            alt={user.name}
                            loading="lazy"
                            className="object-cover"
                          />
                        </Avatar>
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.phone_number}</TableCell>
                      <TableCell>{formatDate(user.time!)}</TableCell>
                      <TableCell>
                        <div className="flex justify-center items-center gap-4">
                          <CustomDialog
                            title={`Edit Profile ${user.name}`}
                            description={
                              <EditProfileUsers
                                datas={user}
                                refecthUsers={() => fetchData()}
                              />
                            }
                          >
                            <div
                              aria-label="Edit Users"
                              className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center"
                            >
                              <PencilLine />
                            </div>
                          </CustomDialog>
                          <Alert
                            title="Are you sure delete this User from Database?"
                            onAction={() => handleDeleteUsers(user.user_id)}
                            onActionTitle="Continue"
                          >
                            <div
                              aria-label="Delete Users"
                              className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center"
                            >
                              <Trash2 />
                            </div>
                          </Alert>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
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
