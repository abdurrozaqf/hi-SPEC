import Alert from "@/components/AlertDialog";
import CustomDialog from "@/components/Dialog";
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
import { useToast } from "@/components/ui/use-toast";
import { FilePlus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const datas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductsAdmin = () => {
  const { toast } = useToast();

  async function fetchData() {
    try {
      // const result = await getProducts();
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
      <div className="p-10 bg-white dark:bg-[#1265ae24] rounded-xl grow shadow-products-card overflow-auto">
        <div className="flex items-center justify-between  mb-10">
          <input
            type="text"
            placeholder="Search by name"
            className="w-1/4 placeholder:italic outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
          <CustomDialog title="Add Products" description={"AW"}>
            <div className="p-3 bg-White shadow-products-card flex items-center justify-center rounded-xl">
              <FilePlus size={30} />
            </div>
          </CustomDialog>
        </div>
        <Table>
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">No.</TableHead>
              <TableHead className="w-[150px] text-center">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
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
                  <TableCell>Rp.5.299.000</TableCell>
                  <TableCell>Office</TableCell>
                  <TableCell className="flex flex-col justify-center items-center h-32">
                    <Alert
                      title="Are you sure delete this Products from Database?"
                      onAction={() => handleDelete(1)}
                    >
                      <Trash2 />
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
