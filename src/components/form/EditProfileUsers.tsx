import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

import {
  ResponseUsers,
  updateProfile,
  updateUsersAdminSchema,
  UpdateUsersAdminSchema,
} from "@/utils/apis/users";

interface Props {
  datas: ResponseUsers;
  refecthUsers: () => void;
}

const EditProfileUsers = (props: Props) => {
  const { datas, refecthUsers } = props;
  const { toast } = useToast();

  const form = useForm<UpdateUsersAdminSchema>({
    resolver: zodResolver(updateUsersAdminSchema),
    defaultValues: {
      name: datas.name ?? "",
      email: datas.email ?? "",
      address: datas.address ?? "",
      phone_number: datas.phone_number ?? "",
      newpassword: "",
      avatar: datas.avatar ?? "",
    },
    values: {
      name: datas.name,
      email: datas.email,
      address: datas.address,
      phone_number: datas.phone_number,
      newpassword: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  const fileRef = form.register("avatar", { required: false });
  async function onSubmit(data: UpdateUsersAdminSchema) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("newpassword", data.newpassword);
      formData.append("avatar", data.avatar[0]);

      const result = await updateProfile(
        datas.user_id as number,
        formData as any
      );
      toast({ description: result.message });
      refecthUsers();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  return (
    <div className="pl-2 pr-6 h-[35rem] overflow-auto mt-6 font-poppins">
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CustomFormField control={form.control} name="name" label="Full Name">
            {(field) => (
              <Input
                {...field}
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="email" label="Email">
            {(field) => (
              <Input
                {...field}
                type="email"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="avatar"
            label="Profile picture"
          >
            {() => (
              <Input
                {...fileRef}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                className="cursor-pointer"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="newpassword"
            label="New Password"
          >
            {(field) => (
              <Input
                {...field}
                type="password"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="address"
            label="Address"
          >
            {(field) => (
              <Input
                {...field}
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="phone_number"
            label="Phone Number"
          >
            {(field) => (
              <Input
                {...field}
                type="tel"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <Button
            type="submit"
            className="hover:bg-[#1265AE]"
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
                <p className="font-medium tracking-wide text-white">
                  Edit Profile Users
                </p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileUsers;
