import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import { deleteProduct } from "@/utils/apis/products";

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
import CustomDialog from "@/components/Dialog";
import Alert from "@/components/AlertDialog";
import Layout from "@/components/Layout";

import { FilePlus, Laptop, PencilLine, Trash2 } from "lucide-react";
import axios from "axios";
import DetailCard from "@/components/DetailCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Products = {
  product_id: number;
  name: string;
  price: number;
  picture: string;
  category?: string;
};

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Products[]>();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await axios.get(
        `http://3.104.106.44:8000/product/search?limit=100&name=${search}&category=${category}`
      );
      setProducts(result.data.data);
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

  function handleCategory(value: string) {
    if (value !== "") {
      setCategory(value);
    } else {
      setCategory("");
    }
  }

  const debounceRequest1 = debounce(
    (search: string) => setSearch(search),
    1000
  );
  const debounceRequest2 = debounce(
    (category: string) => handleCategory(category),
    1000
  );

  useEffect(() => {
    fetchData();
  }, [search, category]);

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto font-poppins">
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
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Select by categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={` `}>Default</SelectItem>
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
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
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
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <img
                    src={
                      product.picture ||
                      "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png"
                    }
                    alt="HP 14 inch Laptop 14s-fq0564AU"
                    className="object-cover w-14 gap-14 bg-center"
                  />
                </TableCell>
                <TableCell>
                  {product.name || "HP 14 inch Laptop 14s-fq0564AU"}
                </TableCell>
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
      </div>
    </Layout>
  );
};

export default ProductsAdmin;
