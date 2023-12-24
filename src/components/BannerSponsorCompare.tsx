import Image2 from "@/assets/tagline-compare-2.png";
import Image3 from "@/assets/tagline-compare-3.svg";

const BannerSponsorCompare = () => {
  return (
    <div className="w-0 lg:w-full background-tagline rounded-3xl flex items-center justify-around mt-0 lg:mt-6">
      <h1 className="font-poppins font-medium italic text-white text-[0px] lg:text-4xl p-0 lg:p-6">
        Transform <br />
        the way you learn
      </h1>
      <img src={Image2} alt="Tagline-2" className="h-0 lg:h-[155px]" />
      <img src={Image3} alt="Tagline-3" className="h-0 lg:h-[100px]" />
    </div>
  );
};

export default BannerSponsorCompare;
