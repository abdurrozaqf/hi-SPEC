import Navbar from "@/components/Navbar";

const DetailsProducts = () => {
  return (
    <div className="w-full h-screen font-poppins bg-[#E4ECF1] flex flex-col">
      <Navbar />
      <div className="container grid grid-cols-12 grow">
        <div className="col-start-1 col-end-4 pt-12 bg-slate-400 items-center justify-center">
          <img src="src/assets/example-laptop.png" alt="laptop" />
        </div>
        <div className="col-start-4 col-end-10 pt-12 bg-red-400">test2</div>
        <div className="col-start-10 col-end-13 pt-12 bg-green-400">test3</div>
      </div>
    </div>
  );
};

export default DetailsProducts;
