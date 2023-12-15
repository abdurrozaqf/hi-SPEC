import { CustomFormField } from "@/components/CustomForm";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateUserSchema, updateUserSchema } from "@/utils/apis/users";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { CameraIcon, UploadIcon } from "lucide-react";

const EditProfile = () => {
  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      image: "",
      address: "",
      phone_number: 0,
    },
  });

  const fileRef = form.register("image", { required: false });

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl overflow-auto p-32 font-poppins dark:bg-transparent">
        <h1 className=" pb-16 font-bold text-4xl">Profile</h1>
        <Form {...form}>
          <form action="" className=" flex flex-col gap-6">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className=" rounded-full w-36 h-36"
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </div>
                <p className=" pl-8 text-3xl font-bold">John Doe</p>
              </div>
              <Button className="w-40 h-14">
                <p className=" font-bold text-base">Edit Profile</p>
              </Button>
            </div>
            <div className=" invisible absolute">
              <CustomFormField
                control={form.control}
                name="image"
                label="Profile Picture"
              >
                {() => (
                  <Input
                    {...fileRef}
                    type="file"
                    id="input-image"
                    accept="image/jpg, image/jpeg, image/png"
                    className="cursor-pointer"
                    disabled={form.formState.isSubmitting}
                    aria-disabled={form.formState.isSubmitting}
                  />
                )}
              </CustomFormField>
            </div>
            <CustomFormField
              control={form.control}
              name="name"
              label="Full Name"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="John Doe"
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
                  placeholder="johndoe@gmail.com"
                  type="email"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="Old Password"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="******"
                  type="password"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <CustomFormField
              control={form.control}
              name="password"
              label="New Password"
            >
              {(field) => (
                <Input
                  {...field}
                  placeholder="********"
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
                  placeholder="e.g: Jl. Veteran, Kec. Lowokwaru, Kota Malang, Jawa Timur"
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
                  placeholder="0819362731919"
                  type="tel"
                  disabled={form.formState.isSubmitting}
                  aria-disabled={form.formState.isSubmitting}
                />
              )}
            </CustomFormField>
            <Button className=" bg-[#1FBB5C] h-12">Submit</Button>
            <p className=" text-center">or</p>
            <Button variant={"destructive"} className="h-12">
              Delete Account
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
