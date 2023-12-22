import Image1 from "@/assets/tagline-wishlist-1.svg";
import Image2 from "@/assets/tagline-wishlist-2.svg";
import Image3 from "@/assets/tagline-wishlist-3.svg";

const BannerSponsorWishlist = () => {
  return (
    <div className="w-0 lg:w-full background-tagline rounded-3xl flex items-center justify-around p-0 lg:p-4">
      <img src={Image1} alt="Tagline-1" className="h-0 lg:h-[120px]" />
      <img src={Image2} alt="Tagline-2" className="h-0 lg:h-[120px]" />
      <img src={Image3} alt="Tagline-3" className="h-0 lg:h-[120px]" />
    </div>
  );
};

export default BannerSponsorWishlist;
