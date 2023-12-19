import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { format } from "date-fns";

import { Transactions, getTransactions } from "@/utils/apis/admin";
import { getDetailProducts } from "@/utils/apis/products/api";
import { Product } from "@/utils/apis/products";
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

interface MergedData extends Transactions {
  product: Pick<Product, "name" | "picture" | "price" | "category">;
}

const TransactionsAdmin = () => {
  const [transactions, setTransactions] = useState<Transactions[]>();
  const [products, setProducts] = useState<Product[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<Meta>();

  const { toast } = useToast();

  async function fetchData() {
    try {
      const result = await getTransactions();
      setTransactions(result.data);
      setMeta(result.pagination);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const fetchDataProduct = async () => {
    try {
      const Response = await getTransactions();
      const dataResponse = Response.data;

      const promises = dataResponse.map(async (data: any) => {
        const res = await getDetailProducts(data.product_id);
        const dataProducts = res.data;

        return dataProducts;
      });
      const results: any = await Promise.all(promises);
      setProducts(results);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  };

  const mergedData: MergedData[] =
    transactions?.map((transaction) => {
      const matchingProduct = products?.find(
        (product) => product.product_id === transaction.product_id
      );

      if (matchingProduct) {
        return {
          ...transaction,
          product: {
            name: matchingProduct.name,
            picture: matchingProduct.picture,
            price: matchingProduct.price,
            category: matchingProduct.category,
          },
        };
      } else {
        return {
          ...transaction,
          product: {
            name: "Unknown",
            picture:
              "https://www.iconpacks.net/icons/2/free-laptop-icon-1928-thumb.png",
            price: 0,
            category: "Unknown",
          },
        };
      }
    }) || [];

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
    fetchDataProduct();
  }, [searchParams]);

  return (
    <Layout>
      <div className="px-10 py-8 bg-white dark:bg-[#1265ae24] rounded-xl grow flex flex-col shadow-products-card font-poppins overflow-auto">
        <h1 className="text-2xl font-medium text-center">
          Database Transactions
        </h1>
        <div className="flex mb-10">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => debounceRequest(e.target.value)}
            className="w-1/4 placeholder:italic placeholder:text-sm outline-none py-2 px-4 rounded-lg dark:bg-transparent shadow dark:shadow-white"
          />
        </div>
        {transactions === null ? (
          <div className="flex grow justify-center items-center">
            <p className="text-sm text-slate-500 font-light tracking-wide">
              There is no transaction list
            </p>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of user recent invoices.</TableCaption>
            <TableHeader className="sticky top-0 bg-[#05152D]">
              <TableRow>
                <TableHead className="w-[50px] text-center">No.</TableHead>
                <TableHead>Image Product</TableHead>
                <TableHead>Name Product</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <>
                {mergedData?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <img
                        src={data.product?.picture}
                        alt={data.product?.name}
                        className="object-cover h-24"
                      />
                    </TableCell>
                    <TableCell>
                      <p className="truncate">{data.product?.name}</p>
                    </TableCell>
                    <TableCell>
                      {data.total_price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </TableCell>
                    <TableCell>
                      {format(new Date(data.timestamp), "iiii, dd MMMM Y")}
                    </TableCell>
                    <TableCell>{data.status}</TableCell>
                  </TableRow>
                ))}
              </>
            </TableBody>
          </Table>
        )}
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

export default TransactionsAdmin;
