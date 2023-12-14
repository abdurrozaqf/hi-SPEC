import { FormEvent, useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { LoginAccount } from "@/utils/apis/auth/apis";

const LoginForm = () => {
    const { toast } = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function onSubmitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
            try {
                const body = {
                    email,
                    password,
                };

                const result = await LoginAccount(body)
                localStorage.setItem('token', result.payload.token);
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
        <form className="flex flex-col w-full mx-auto gap-3 mt-10" onSubmit={(e) => onSubmitLogin(e)}>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button type="submit">Login</Button>
        </form>
    </div>
  )
}

export default LoginForm;