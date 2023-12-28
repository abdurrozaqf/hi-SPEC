import { FilePlus, Laptop, PencilLine, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

import SkeletonProductsAdmin from "@/components/SkeletonProductsAdmin";
import EditProduct from "@/components/form/EditProduct";
import AddProduct from "@/components/form/AddProduct";
import { useToast } from "@/components/ui/use-toast";
import Pagination from "@/components/Pagination";
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
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
import { formatPrice } from "@/utils/formatter";
import { Meta } from "@/utils/types/api";

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

  const refetchProducts = useCallback(() => {
    fetchData();
  }, []);

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
    250
  );

  function handlePrevNextPage(page: string | number) {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
  }

  return (
    <Layout>
      <div className="px-3 md:px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl flex flex-col justify-start grow shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">Database Products</h1>
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center justify-between my-10">
          <div className="flex flex-col md:flex-row items-center gap-x-6 gap-y-4">
            <input
              type="search"
              aria-label="Search Products"
              placeholder="Search by name product"
              onChange={(e) => debounceRequest1(e.target.value)}
              className="w-full md:w-fit placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
            />
            <div className="flex items-center gap-x-4">
              <Select onValueChange={(value) => debounceRequest2(value)}>
                <SelectTrigger
                  aria-label="Select Categories"
                  className="w-52 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white border-none"
                >
                  <SelectValue placeholder="Select by categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Multimedia">Multimedia</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                </SelectContent>
              </Select>
              <div className="block md:hidden">
                <CustomDialog title="Add Products" description={<AddProduct />}>
                  <div className="p-3 bg-White shadow dark:shadow-white flex items-center justify-center rounded-xl">
                    <FilePlus size={30} />
                  </div>
                </CustomDialog>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <CustomDialog title="Add Products" description={<AddProduct />}>
              <div
                aria-label="Add Products"
                className="p-3 bg-White shadow dark:shadow-white flex items-center justify-center rounded-xl"
              >
                <FilePlus size={30} />
              </div>
            </CustomDialog>
          </div>
        </div>
        <div className="flex justify-center grow overflow-auto">
          <Table>
            <TableCaption>A list of recent products.</TableCaption>
            <TableHeader className="sticky top-0 bg-white dark:bg-[#05152D] drop-shadow z-10">
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
              {isLoading ? (
                <SkeletonProductsAdmin />
              ) : (
                <>
                  {products?.map((product, index) => (
                    <TableRow key={product.product_id} className="py-10">
                      <TableCell className="text-center">
                        {(meta?.page! - 1) * meta?.limit! + index + 1}
                      </TableCell>
                      <TableCell className="flex items-center justify-center">
                        <img
                          src={product.picture}
                          alt={product.name}
                          loading="lazy"
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{formatPrice(product.price!)}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Link
                          to={`/detail-product/${product.product_id}`}
                          aria-label="Details Products"
                        >
                          <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                            <Laptop />
                          </div>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-4">
                          <CustomDialog
                            title="Edit Products"
                            description={
                              <EditProduct
                                product_id={product.product_id}
                                refecthProduct={() => refetchProducts()}
                              />
                            }
                          >
                            <div
                              aria-label="Edit Products"
                              className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center"
                            >
                              <PencilLine />
                            </div>
                          </CustomDialog>
                          <Alert
                            title="Are you sure delete this Products from Database?"
                            onAction={() => handleDelete(product.product_id)}
                            onActionTitle="Delete"
                          >
                            <div
                              aria-label="Delete Products"
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

export default ProductsAdmin;
