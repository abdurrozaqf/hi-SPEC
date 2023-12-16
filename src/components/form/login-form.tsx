import { FormEvent, useState } from "react";

import { LoginAccount } from "@/utils/apis/auth/apis";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const body = {
        email,
        password,
      };

      const result = await LoginAccount(body);
      localStorage.setItem("token", result.data.token);
      toast({
        description: result.message,
      });
    } catch (error: any) {
      toast({
        title: "Oops, something went wrong!",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="text-[#1E1E1E] font-poppins">
      Login to your account using email
      <form
        className="flex flex-col w-full mx-auto gap-3 mt-10"
        onSubmit={(e) => onSubmitLogin(e)}
      >
        <p className="font-semibold">Email</p>
        <Input
          placeholder="jhondoe@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="font-semibold">Password</p>
        <Input
          placeholder="Minimum 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Button type="submit">Login</Button> */}
      </form>
    </div>
  );
};

export default LoginForm;
