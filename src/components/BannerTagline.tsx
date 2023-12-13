import HumanBannerTagline from "@/assets/human-banner-tagline.png";

const BannerTagline = () => {
  return (
    <div className="w-full bg-banner-tagline h-36 rounded-3xl flex justify-center  relative">
      <img
        src={HumanBannerTagline}
        alt="Image Human Banner Tagline"
        className="absolute bottom-0 left-[19rem] h-40"
      />
      <h1 className="font-poppins font-medium text-white text-4xl mt-10">
        It’s very important to understand <br />
        your own needs
      </h1>
    </div>
  );
};

export default BannerTagline;
