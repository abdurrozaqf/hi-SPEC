import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import {
  ResponseProducts,
  deleteProduct,
  getProducts,
} from "@/utils/apis/products";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditProduct from "@/components/form/EditProduct";
import AddProduct from "@/components/form/AddProduct";
import { useToast } from "@/components/ui/use-toast";
import DetailCard from "@/components/DetailCard";
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

import { FilePlus, Laptop, PencilLine, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import { Meta } from "@/utils/types/api";

const ProductsAdmin = () => {
  const [products, setProducts] = useState<ResponseProducts[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [meta, setMeta] = useState<Meta>();
  console.log(meta);

  const { toast } = useToast();

  async function fetchData() {
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
    } else {
      searchParams.delete("name");
    }
    setSearchParams(searchParams);
  }

  function handleCategory(value: string) {
    if (value == "default") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
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

  useEffect(() => {
    fetchData();
  }, [searchParams]);

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-between grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Products</h1>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-6">
            <input
              type="text"
              onChange={(e) => debounceRequest1(e.target.value)}
              placeholder="Search by name product"
              className="w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
            />

            <div>
              <Select onValueChange={(value) => debounceRequest2(value)}>
                <SelectTrigger className="w-52 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white">
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
          </div>
          <CustomDialog title="Add Products" description={<AddProduct />}>
            <div className="p-3 bg-White shadow dark:shadow-white flex items-center justify-center rounded-xl">
              <FilePlus size={30} />
            </div>
          </CustomDialog>
        </div>
        <Table>
          <TableCaption>A list of recent products.</TableCaption>
          <TableHeader className="sticky top-0 bg-[#05152D]">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Detail</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={
                      product.picture ||
                      "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png"
                    }
                    alt={product.name}
                    className="object-cover w-14 gap-14 bg-center"
                  />
                </TableCell>
                <TableCell>{product.name || "Unknown"}</TableCell>
                <TableCell>
                  {product.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </TableCell>
                <TableCell>{product.category || "-"}</TableCell>
                <TableCell>
                  <CustomDialog
                    title="Detail Laptop"
                    description={<DetailCard product_id={product.product_id} />}
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

export default ProductsAdmin;
