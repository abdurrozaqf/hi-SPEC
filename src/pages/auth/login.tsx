import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";

import RegisterForm from "@/components/form/RegisterForm";
import LoginForm from "@/components/form/LoginForm";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/Dialog";

import LinesSponsor from "/images/lines-sponsor.png";
import HumanLogin from "/images/home-page-human.png";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen font-poppins background-login flex flex-col justify-between">
      <div className="flex justify-center h-full">
        <div className="flex flex-col justify-center gap-20 px-6 md:px-20">
          <p className="text-2xl md:text-4xl lg:text-4xl xl:text-6xl font-bold text-white">
            Smart solution <br /> for your brand are here
          </p>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xl xl:text-4xl font-semibold text-white">
              Join us now
            </p>
            <CustomDialog title="Login Account" description={<LoginForm />}>
              <Button className="w-full h-fit py-3 text-lg rounded-full bg-[#C9DFF2] hover:bg-[#b0c8dc] text-black font-semibold tracking-wide">
                Login
              </Button>
            </CustomDialog>
            <div className="mx-auto px-2 my-2 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-white after:ml-4 after:block after:h-px after:flex-grow after:bg-white">
              <p className=" bg-white rounded-full px-6 py-1 leading-none text-black">
                or
              </p>
            </div>
            <CustomDialog
              title="Register Account"
              description={<RegisterForm />}
            >
              <Button className="w-full h-fit py-3 text-lg rounded-full bg-[#48B774] hover:bg-[#3b9e62] text-white font-semibold tracking-wide">
                Register
              </Button>
            </CustomDialog>
            <div className="flex items-center justify-between">
              <p className="text-xs md:text-base font-medium pr-3 md:pr-10 xl:w-[500px] text-white">
                Enjoy exploring our products! Use the guest account to view the
                latest items
              </p>
              <Button
                onClick={() => navigate("/")}
                className="rounded-full h-fit bg-white text-black"
              >
                try it view
              </Button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-end -mb-4">
          <img src={HumanLogin} alt="human" className="object-cover" />
        </div>
      </div>

      <footer className="bg-[#E4ECF1] hidden lg:flex items-center justify-center h-20">
        <Marquee pauseOnHover direction="right">
          <img src={LinesSponsor} alt="sponsors" className="flex mr-20" />
        </Marquee>
      </footer>
    </div>
  );
};

export default Login;
