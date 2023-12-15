import Marquee from "react-fast-marquee";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import CustomDialog from "@/components/Dialog";
import RegisterForm from "@/components/form/register-form";
import LoginForm from "@/components/form/login-form";

const AuthLayout = () => {
  function onSubmit() {}

  return (
    <div className="w-full h-screen font-poppins bg-[url('src/assets/Home-page-background.png')] bg-no-repeat flex flex-col">
      <div className="container grid grid-cols-12 grow">
        {/* Bagian kiri */}
        <div className="col-start-1 col-end-6 pt-12">
          <h1 className="text-white font-poppins font-bold text-[45px]">
            Smart solution <br /> for your brand are here
          </h1>
          <h3 className="text-white mt-16 font-semibold text-xl mb-2">
            Join us now
          </h3>

          <div className="flex flex-col items-center justify-center">
            <CustomDialog
              title="Login"
              description={<LoginForm />}
              action="Login"
              onAction={() => onSubmit}
            >
              <Button className="bg-[#C9DFF2] rounded-full w-[533px] h-[50px] text-[#1E1E1E] font-semibold text-base hover:text-white">
                Login
              </Button>
            </CustomDialog>

            <Separator className="my-8 w-11/12" />
            <p className="bg-white w-[59px] text-[#1E1E1E] rounded-full font-medium text-xs text-center flex items-center justify-center -mt-10">
              or
            </p>

            <CustomDialog
              title="Register"
              description={<RegisterForm />}
              action="Register"
              onAction={() => onSubmit}
            >
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
            <Button className="bg-white h-[33px] rounded-full font-semibold text-[12px] text-[#1E1E1E] hover:text-white">
              Try it view
            </Button>
          </div>
        </div>

        {/* Bagian kanan */}
        <div className="col-start-7 col-end-13 relative">
          <img
            src="src/assets/Home-page-human.png"
            alt="human"
            className="h-[560px] float-right absolute -bottom-1 right-0 hover:"
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

export default AuthLayout;
