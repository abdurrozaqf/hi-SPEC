import HumanBannerTagline from "@/assets/human-banner-tagline.png";

const BannerTagline = () => {
  return (
    <div className="w-full bg-banner-tagline rounded-3xl flex items-center justify-center">
      <div className="relative">
        <h1 className="font-poppins font-medium text-white text-4xl p-6 relative">
          It’s very important to understand <br />
          your own needs
        </h1>
        <img
          src={HumanBannerTagline}
          alt="Image Human Banner Tagline"
          className="absolute bottom-0 -left-28 h-[155px]"
        />
      </div>
    </div>
  );
};

export default BannerTagline;
