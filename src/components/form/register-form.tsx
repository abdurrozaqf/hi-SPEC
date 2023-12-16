import { FormEvent, useState } from "react";

import { RegisterAccount } from "@/utils/apis/auth";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RegisterForm = () => {
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  async function onSubmitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const body = {
        full_name: fullName,
        email,
        password,
        address,
        phone_number: phoneNumber,
      };

      const result = await RegisterAccount(body);
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
      Register your account now to get full access
      <form
        className="flex flex-col w-full mx-auto gap-3 mt-10"
        onSubmit={(e) => onSubmitRegister(e)}
      >
        <p className="font-semibold">Full Name</p>
        <Input
          placeholder="Jhon Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

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

        <p className="font-semibold">Address</p>
        <Input
          placeholder="e.g: Jl. Veteran, Kec. Lowokwaru, Kota Malang, Jawa Timur"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <p className="font-semibold">Phone Number</p>
        <Input
          placeholder="e.g: +6281936273191"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {/* <Button type="submit">Register</Button> */}
      </form>
    </div>
  );
};

export default RegisterForm;
