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

import { FilePlus, Laptop, PencilLine, Trash2 } from "lucide-react";
import axios from "axios";
import debounce from "lodash.debounce";
import AddProduct from "@/components/form/AddProduct";
import { deleteProduct } from "@/utils/apis/products";
import EditProduct from "@/components/form/EditProduct";

// type Datas = {
//   data: {
//     product_id: number;
//     category: string;
//     name: string;
//     price: number;
//     picture: string;
//   }[];
//   message: string;
//   pagination: {
//     limit: number;
//     page: number;
//   };
// };

type Products = {
  product_id: number;
  name: string;
  price: number;
  picture: string;
  category?: string;
};

const ProductsAdmin = () => {
  // const [products, setProducts] = useState<Datas>();
  const [products, setProducts] = useState<Products[]>();
  console.log(products);

  const [search, setSearch] = useState("");

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await axios.get(
        `http://3.104.106.44:8000/product/search?name=${search}`
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

  const debounceRequest = debounce((search: string) => setSearch(search), 1000);

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <Layout>
      <div className="px-10 py-4 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto font-poppins">
        <h1 className="text-2xl font-medium text-center">Database Products</h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            onChange={(e) => debounceRequest(e.target.value)}
            placeholder="Search by name product"
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
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
                  <CustomDialog title="Detail Laptop" description={"ASUS"}>
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
