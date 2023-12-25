import HumanBannerTagline from "/images/human-banner-tagline.svg";

const BannerTagline = () => {
  return (
    <div className="w-0 lg:w-full background-tagline rounded-3xl flex items-center justify-center mt-0 lg:mt-6">
      <div className="relative">
        <h1 className="font-poppins font-medium text-white text-[0px] lg:text-4xl p-0 lg:p-6 relative">
          It’s very important to understand <br />
          your own needs
        </h1>
        <img
          src={HumanBannerTagline}
          alt="Image Human Banner Tagline"
          loading="lazy"
          className="absolute -bottom-1 -left-28 h-[155px]"
        />
      </div>
    </div>
  );
};

export default BannerTagline;
