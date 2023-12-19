import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

import RegisterForm from "@/components/form/register-form";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/form/login-form";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/Dialog";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen font-poppins bg-[url('src/assets/Home-page-background.png')] bg-cover bg-no-repeat flex flex-col">
      <div className="container flex flex-col lg:flex-row items-center justify-center lg:justify-around grow">
        {/* Bagian kiri */}
        <div>
          <h1 className="text-white font-poppins font-bold text-[45px]">
            Smart solution <br /> for your brand are here
          </h1>
          <h3 className="text-white mt-16 font-semibold text-xl mb-2">
            Join us now
          </h3>

          <div className="flex flex-col items-center justify-center">
            <CustomDialog title="Login" description={<LoginForm />}>
              <Button className="bg-[#C9DFF2] rounded-full w-[533px] h-[50px] text-[#1E1E1E] font-semibold text-base hover:text-white">
                Login
              </Button>
            </CustomDialog>

            <Separator className="my-8 w-11/12 dark:bg-white" />
            <p className="bg-white w-[59px] text-[#1E1E1E] rounded-full font-medium text-xs text-center flex items-center justify-center -mt-10">
              or
            </p>

            <CustomDialog title="Register" description={<RegisterForm />}>
              <Button className="bg-[#48B774] rounded-full w-[533px] h-[50px] mt-5 text-white font-semibold text-base">
                Register
              </Button>
            </CustomDialog>
          </div>

          <div className="flex justify-between mt-4">
            <p className="text-white font-semibold text-[12px]">
              Enjoy exploring our products! Use the guest account <br /> to view
              the latest items
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-white h-[33px] rounded-full font-semibold text-[12px] text-[#1E1E1E] hover:text-white"
            >
              Try it view
            </Button>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="h-full lg:flex items-end -mb-1 hidden absolute lg:relative">
          <img
            src="src/assets/Home-page-human.png"
            alt="human"
            className="h-[560px] w-auto"
          />
        </div>
      </div>

      {/* footer */}
      <footer className="bg-[#E4ECF1] w-full h-20 flex items-center justify-center z-10">
        <Marquee pauseOnHover direction="right">
          <img src="src/assets/Home-page-sponsor.png" alt="sponsor" />
        </Marquee>
      </footer>
    </div>
  );
};

export default Login;
