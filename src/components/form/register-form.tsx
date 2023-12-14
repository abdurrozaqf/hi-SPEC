import { FormEvent, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { RegisterAccount } from "@/utils/apis/auth";

const RegisterForm = () => {
    const { toast } = useToast();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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

                const result = await RegisterAccount(body)
                    toast({
                        description: result.message,
            })
            } catch (error: any) {
            toast({
                title: 'Oops, something went wrong!',
                description: error.toString(),
                variant: "destructive",
            })
        }
    }
    
  return (
    <div>
        <form className="flex flex-col w-full mx-auto gap-3 mt-10" onSubmit={(e) => onSubmitRegister(e)}>
            <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <Input placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <Button type="submit">Register</Button>
        </form>
    </div>
  )
}

export default RegisterForm;