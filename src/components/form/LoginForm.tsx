import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { LoginSchema, loginSchema, loginAccount } from "@/utils/apis/auth";
import { useToken } from "@/utils/contexts/token";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

const LoginForm = () => {
  const { toast } = useToast();

  const { changeToken } = useToken();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitLogin(data: LoginSchema) {
    try {
      const result = await loginAccount(data);
      toast({ description: result.message });
      changeToken(result.data.token);
    } catch (error: any) {
      toast({
        title: "Oops, something went wrong!",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="font-poppins">
      <h1>Login to your account using email</h1>
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-4 mt-10 text-start"
          onSubmit={form.handleSubmit(onSubmitLogin)}
        >
          <CustomFormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                placeholder="johndoe@mail.com"
                type="email"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="Password 8 character"
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <Button
            type="submit"
            className="hover:bg-[#1265AE] mt-8"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Please wait</p>
              </>
            ) : (
              <div className="flex cursor-pointer">
                <p className="font-medium tracking-wide text-white">Login</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
