import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Alert from "@/components/AlertDialog";

import { MyWishlists } from "@/utils/apis/users";
import { formatPrice } from "@/utils/formatter";

interface Props {
  data: MyWishlists;
  onDeleteWishlist: (id: number) => void;
  onBuyProdcut: (product_id: number, total_price: number) => void;
}

const ProductCardWishlist = (props: Props) => {
  const { data, onDeleteWishlist, onBuyProdcut } = props;
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-fit rounded-xl shadow-products-card overflow-auto relative font-poppins"
      key={data.product_id}
    >
      <div>
        <div className="flex justify-center py-4">
          <img
            src={data.picture}
            alt={data.name}
            loading="lazy"
            className="h-32 w-auto"
          />
        </div>
        <div className="bg-white dark:bg-[#1265ae24] px-4 py-3">
          <p className="text-[#757575] dark:text-[#b5b5b5] font-bold text-sm tracking-tight truncate">
            {data.name}
          </p>
          <h1 className="font-bold text-lg">{formatPrice(data.price!)}</h1>
          <p className="font-medium text-end text-[0.625rem] mt-4">
            Check detail
          </p>
          <hr className="border-2 my-2" />
          <div className="flex items-center gap-4 w-full justify-between">
            <Alert
              title="Delete product from Wishlist?"
              description="Product will be deleted from wishlist"
              onAction={() => onDeleteWishlist(data.favorite_id)}
              onActionTitle="Delete"
              style="w-full"
            >
              <Button className="w-full bg-[#CC4949] hover:bg-[#B13838] text-white">
                Delete
              </Button>
            </Alert>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-fit p-2"
                  aria-label="More options"
                >
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="font-poppins">
                <DropdownMenuItem
                  onClick={() => navigate(`/detail-product/${data.product_id}`)}
                >
                  Detail Product
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Alert
                    title="Are you sure want buy this Product?"
                    description={
                      <>
                        <div className="flex flex-col justify-center items-center mb-10">
                          <img
                            src={data.picture}
                            alt={data.picture}
                            loading="lazy"
                            className="h-80 w-fit"
                          />
                          <h1 className="font-bold text-xl text-center">
                            {data.name}
                          </h1>
                          <p className="font-semibold text-2xl">
                            Product price: {formatPrice(data.price!)}
                          </p>
                        </div>
                      </>
                    }
                    onAction={() => onBuyProdcut(data.product_id, data.price)}
                    onActionTitle="Buy Now"
                  >
                    <p className="text-sm pl-2 pr-6 rounded py-1 hover:bg-slate-100  dark:hover:bg-[#1E293B]">
                      Buy Product
                    </p>
                  </Alert>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/compare")}>
                  Try Compare
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWishlist;
