import { FilePlus, Laptop, Loader2, PencilLine, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import EditProduct from "@/components/form/EditProduct";
import AddProduct from "@/components/form/AddProduct";
import { useToast } from "@/components/ui/use-toast";
import DetailCard from "@/components/DetailCard";
import Pagination from "@/components/Pagination";
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ResponseProducts,
  deleteProduct,
  getProducts,
} from "@/utils/apis/products";
import { Meta } from "@/utils/types/api";
import { formatPrice } from "@/utils/formatter";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<ResponseProducts[]>();
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
      const result = await getProducts({ ...query });

      setProducts(result.data);
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

  async function handleDelete(product_id: number) {
    try {
      const result = await deleteProduct(product_id);
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

  function handleCategory(value: string) {
    if (value == "default") {
      searchParams.delete("category");
      searchParams.delete("page");
    } else {
      searchParams.set("category", value);
      searchParams.delete("page");
    }
    setSearchParams(searchParams);
  }

  const debounceRequest1 = debounce(
    (search: string) => handleSearch(search),
    500
  );

  const debounceRequest2 = debounce(
    (category: string) => handleCategory(category),
    500
  );

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-3 md:px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-start grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Products</h1>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between mb-10">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center space-x-0 md:space-x-6">
            <input
              type="search"
              onChange={(e) => debounceRequest1(e.target.value)}
              placeholder="Search by name product"
              className="w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
            />
            <Select onValueChange={(value) => debounceRequest2(value)}>
              <SelectTrigger className="w-52 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white border-none">
                <SelectValue placeholder="Select by categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Multimedia">Multimedia</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CustomDialog title="Add Products" description={<AddProduct />}>
            <div className="p-3 bg-White shadow dark:shadow-white flex items-center justify-center rounded-xl">
              <FilePlus size={30} />
            </div>
          </CustomDialog>
        </div>
        <div className="flex justify-center grow overflow-auto">
          {isLoading ? (
            <div className="flex items-center h-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <p>Loading</p>
            </div>
          ) : (
            <Table>
              <TableCaption>A list of recent products.</TableCaption>
              <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D]">
                <TableRow>
                  <TableHead className="w-[50px] text-center">No</TableHead>
                  <TableHead className="w-[150px] text-center">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product, index) => (
                  <TableRow key={product.product_id} className="py-10">
                    <TableCell className="text-center">
                      {(meta?.page! - 1) * meta?.limit! + index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={
                          product.picture ||
                          "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png"
                        }
                        alt={product.name}
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{formatPrice(product.price!)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <CustomDialog
                        title="Detail product"
                        description={
                          <DetailCard product_id={product.product_id} />
                        }
                      >
                        <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                          <Laptop />
                        </div>
                      </CustomDialog>
                    </TableCell>
                    <TableCell className="flex justify-center items-center h-32 gap-4 z-50">
                      <CustomDialog
                        title="Edit Products"
                        description={
                          <EditProduct product_id={product.product_id} />
                        }
                      >
                        <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                          <PencilLine />
                        </div>
                      </CustomDialog>
                      <Alert
                        title="Are you sure delete this Products from Database?"
                        onAction={() => handleDelete(product.product_id)}
                        onActionTitle="Delete"
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

export default ProductsAdmin;
