import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const navigate = useNavigate();
  function handleWishlist() {}

  return (
    <Layout>
      <div className="flex flex-col gap-10 lg:gap-6 lg:flex-row grow bg-white dark:bg-[#1265ae24] rounded-lg px-10 py-6">
        {/* bagian kiri */}
        <div className="flex flex-col">
          <Button
            onClick={() => navigate(-1)}
            className="flex w-fit h-fit items-center bg-transparent text-black dark:text-white hover:bg-transparent"
          >
            <div className="mr-4">
              <ArrowLeft />
            </div>
            <div>Back</div>
          </Button>
          <div className="flex items-center justify-center grow">
            <img
              src="src/assets/example-laptop-2.png"
              alt="laptop"
              className="w-full"
            />
          </div>
        </div>

        {/* Bagian tengah */}
        <div className=" px-6 grow">
          {/* Nama produk */}
          <h3 className="text-[#1E1E1E] dark:text-white font-semibold text-lg mt-4 mb-1">
            ASUS ExpertBook B5 B5402FBA -HY7110X Star Black
          </h3>
          <h1 className="text-[#1E1E1E] dark:text-white font-bold text-3xl mb-2">
            Rp31.799.000
          </h1>
          <hr className="bg-[#757575]" />
          <p className="text-[#48B774] font-bold text-base my-2">Detail</p>
          <hr className="bg-[#757575]" />

          {/* info produk */}
          <h4 className="text-[#1E1E1E] dark:text-white font-bold text-base mt-4">
            Info Produk
          </h4>
          <p>Fungsionalitas: Kerja</p>
          <p>Kapasitas Memori: 501 GB sampai 1000 GB</p>
          <p>Kapasitas Ram: 8 GB</p>
          {/* <p>Merek: ASUS</p> */}
          <p>Tipe Prosesor: intel</p>
          <p>Ukuran Layar: 12-15 Inci</p>

          {/* spesifikasi */}
          <h4 className="text-[#1E1E1E] dark:text-white font-bold text-base mt-4">
            Spesifikasi
          </h4>
          <p>
            Processor : Intel® Core™ i7-1260P Processor 2.1 GHz (18M Cache, up
            to 4.7 GHz, 12 cores)
          </p>
          {/* <p>OS : Windows 11 Pro</p> */}
          <p>
            Panel : 14.0-inch LED Backlit FHD (1920 x 1080) 16:9 (1W) 400nits
            anti-glare touch panel
          </p>
          {/* <p>
            Graphic: Intel Iris X? Graphics (available for Intel® Core™ i5/i7/i9
            with dual channel memory)
          </p> */}
          <p>Memory : 8G DDR5 on board + 8GB DDR5 SO-DIMM</p>
          <p>Storage : 1TB M.2 NVMe™ PCIe® 4.0 SSD</p>
        </div>

        {/* bagian kanan */}
        <div className="px-6 lg:px-0">
          <div className="border border-solid border-[#D9D9D9] p-3 rounded-lg">
            <div className="m-2">
              <h2 className="font-bold mb-4">Enter the purchase amount here</h2>
              <div className="flex border border-solid border-[#D9D9D9] rounded-md justify-between px-2">
                <p className="text-[#D9D9D9]">-</p>
                <p>1</p>
                <p className="text-[#48B774]">+</p>
              </div>

              <div className="flex justify-between my-1">
                <p>Sub total:</p>
                <h1 className="font-bold text-xl">Rp31.799.000</h1>
              </div>
              <Button className="w-full bg-[#48B774]">Buy Now</Button>

              <div className="flex justify-between items-center mt-3">
                <p className="text-xs">Make your Wishlist come true</p>
                <div
                  onClick={() => handleWishlist()}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <p className="font-bold text-xs">Wishlist</p>
                  <img
                    src="src/assets/wishlist-icon.png"
                    alt="wishlist icon"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <img src="src/assets/Iklan.png" alt="iklan" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailProduct;
