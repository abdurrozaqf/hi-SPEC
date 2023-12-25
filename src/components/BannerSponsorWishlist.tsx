import Image1 from "/images/tagline-wishlist-1.svg";
import Image2 from "/images/tagline-wishlist-2.svg";
import Image3 from "/images/tagline-wishlist-3.svg";

const BannerSponsorWishlist = () => {
  return (
    <div className="w-0 lg:w-full background-tagline rounded-3xl flex items-center justify-around p-0 lg:p-4">
      <img
        src={Image1}
        alt="Tagline-1"
        loading="lazy"
        className="h-0 lg:h-[120px]"
      />
      <img
        src={Image2}
        alt="Tagline-2"
        loading="lazy"
        className="h-0 lg:h-[120px]"
      />
      <img
        src={Image3}
        alt="Tagline-3"
        loading="lazy"
        className="h-0 lg:h-[120px]"
      />
    </div>
  );
};

export default BannerSponsorWishlist;
