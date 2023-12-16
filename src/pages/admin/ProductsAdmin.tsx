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

import { FilePlus, PencilLine, Trash2 } from "lucide-react";

const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const { toast } = useToast();

  async function fetchData() {
    try {
      // const result = await getProducts();
      // setProducts(result)
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
      // const result = await deleteProducts(id);
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
      <div className="px-10 py-4 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto font-poppins">
        <h1 className="text-2xl font-medium text-center">Database Products</h1>
        <div className="flex items-center justify-between mb-10">
          <input
            type="text"
            placeholder="Search by name product"
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
          <CustomDialog title="Add Products" description={"AW"}>
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
              <TableHead>Display</TableHead>
              <TableHead>CPU</TableHead>
              <TableHead>RAM</TableHead>
              <TableHead>Storage</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Bluetooth</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datas.map((index) => (
              <>
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {index}
                  </TableCell>
                  <TableCell>
                    <img
                      src="src/assets/example-laptop.png"
                      alt="HP 14 inch Laptop 14s-fq0564AU"
                    />
                  </TableCell>
                  <TableCell>HP 14 inch Laptop 14s-fq0564AU</TableCell>
                  <TableCell>16 inch</TableCell>
                  <TableCell>Intel i5 1000hu</TableCell>
                  <TableCell>8 GB</TableCell>
                  <TableCell>512 GB SSD</TableCell>
                  <TableCell>Rp.5.299.000</TableCell>
                  <TableCell>Yes</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell className="flex justify-center items-center h-32 gap-4">
                    <CustomDialog
                      title="Edit Products"
                      description={"Form Validation Product"}
                    >
                      <div className="bg-white dark:bg-[#1265ae24] shadow w-fit h-fit p-2 rounded-lg flex items-center justify-center">
                        <PencilLine />
                      </div>
                    </CustomDialog>
                    <Alert
                      title="Are you sure delete this Products from Database?"
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

export default ProductsAdmin;
