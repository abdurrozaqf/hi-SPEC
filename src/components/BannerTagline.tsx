import HumanBannerTagline from "@/assets/human-banner-tagline.svg";

const BannerTagline = () => {
  return (
    <div className="w-full bg-[url('src/assets/banner-tagline.svg')] bg-cover bg-no-repeat bg-center rounded-3xl flex items-center justify-center mt-6">
      <div className="relative">
        <h1 className="font-poppins font-medium text-white text-4xl p-6 relative">
          It’s very important to understand <br />
          your own needs
        </h1>
        <img
          src={HumanBannerTagline}
          alt="Image Human Banner Tagline"
          className="absolute -bottom-1 -left-28 h-[155px]"
        />
      </div>
    </div>
  );
};

export default BannerTagline;
