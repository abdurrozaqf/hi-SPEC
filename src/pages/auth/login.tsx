import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

import RegisterForm from "@/components/form/RegisterForm";
import LoginForm from "@/components/form/LoginForm";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/Dialog";

import LinesSponsor from "@/assets/lines-sponsor.svg";
import HumanLogin from "@/assets/Home-page-human.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen font-poppins background-login flex flex-col">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around grow p-4 lg:p-0">
        <div className="w-auto md:px-10">
          <h1 className="text-white font-poppins font-bold text-3xl md:text-5xl">
            Smart solution <br /> for your brand are here
          </h1>
          <h3 className="text-white mt-10 lg:mt-16 font-semibold text-xl mb-2">
            Join us now
          </h3>

          <div className="flex flex-col items-center justify-center">
            <CustomDialog title="Login" description={<LoginForm />}>
              <Button className="bg-[#C9DFF2] rounded-full w-[400px] md:w-[670px] lg:w-[500px] xl:w-[580px] py-6 lg:py-7 text-[#1E1E1E] font-semibold text-base hover:text-white">
                Login
              </Button>
            </CustomDialog>

            <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-white after:ml-4 after:block after:h-px after:flex-grow after:bg-white">
              <p className=" bg-white rounded-full px-6 py-1 leading-none text-black">
                or
              </p>
            </div>

            <CustomDialog title="Register" description={<RegisterForm />}>
              <Button className="bg-[#48B774] rounded-full w-[400px] md:w-[670px] lg:w-[500px] xl:w-[580px] py-6 lg:py-7 text-white font-semibold text-base">
                Register
              </Button>
            </CustomDialog>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-white font-semibold text-[12px] w-[240px] md:w-[330px]">
              Enjoy exploring our products! Use the guest account to view the
              latest items
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-white h-[33px] rounded-full font-semibold text-[12px] text-[#1E1E1E] hover:text-white"
            >
              Try it view
            </Button>
          </div>
        </div>

        <div className="h-full lg:flex items-end -mb-2 hidden absolute lg:relative">
          <img
            src={HumanLogin}
            alt="human"
            className="h-[560px] xl:h-[650px] w-auto"
          />
        </div>
      </div>

      <footer className="bg-[#E4ECF1] lg:w-full h-16 lg:h-20 flex items-center justify-center z-10">
        <Marquee pauseOnHover direction="right">
          <img src={LinesSponsor} alt="sponsors" className="flex mr-20" />
        </Marquee>
      </footer>
    </div>
  );
};

export default Login;
