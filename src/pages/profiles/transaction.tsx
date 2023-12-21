import { useEffect, useState } from "react";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";
import Layout from "@/components/Layout";
import BannerSponsorWishlist from "@/components/BannerSponsorWishlist";

const getDatafromLS = () => {
  const data = localStorage.getItem("userID");
  if (data) {
    return JSON.parse(data);
  }
};

const Transaction = () => {
  const [datas, setDatas] = useState();
  const dataUserId = getDatafromLS();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const result = await axios.get(`dataUserId`);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <Layout>
      <BannerSponsorWishlist />
    </Layout>
  );
};

export default Transaction;
