import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { format } from "date-fns";

import { AllUser, getUser } from "@/utils/apis/users";
import { Meta } from "@/utils/types/api";

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

const UsersAdmin = () => {
  const [users, setUsers] = useState<AllUser[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [meta, setMeta] = useState<Meta>();
  const { toast } = useToast();

  async function fetchData() {
    try {
      const query = Object.fromEntries([...searchParams]);

      const result = await getUser({ ...query });

      setUsers(result.data);
      setMeta(result.pagination);
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

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Users</h1>
        <div className="flex mb-10">
          <input
            type="text"
            onChange={(e) => debounceRequest(e.target.value)}
            placeholder="Search by name user"
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        <Table>
          <TableCaption>A list of your recent Users.</TableCaption>
          <TableHeader className="sticky top-0 bg-[#05152D]">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Create at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, index) => (
              <TableRow key={index}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Pagination
            meta={meta}
            onClickNext={() => handlePrevNextPage(meta?.page! + 1)}
            onClickPrevious={() => handlePrevNextPage(meta?.page! - 1)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UsersAdmin;
