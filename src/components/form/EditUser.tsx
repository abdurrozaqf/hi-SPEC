import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { getDetailUser, tokenUser, updateUser } from "@/utils/apis/users";

import { CustomFormField } from "@/components/CustomForm";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  user_id: number;
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const UpdateUserSchema = z.object({
  name: z.string().min(1, { message: "Full name is required" }).max(50),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password minimum 8 character" }),
  newpassword: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password minimum 8 character" }),
  address: z.string().min(1, { message: "Address is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  avatar: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, and .png files are accepted."
    )
    .optional()
    .or(z.literal("")),
});

const EditUser = (props: Props) => {
  const { user_id } = props;

  const [datas, setDatas] = useState<tokenUser>();
  const { toast } = useToast();
  console.log(datas);

  async function fetchData() {
    try {
      const result = await getDetailUser(user_id.toString());

      setDatas(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: datas?.user.name ?? "",
      email: datas?.user.email ?? "",
      address: "",
      phone_number: "",
      password: "",
      newpassword: "",
      avatar: datas?.user.avatar ?? "",
    },
    values: {
      name: datas?.user.name ?? "",
      email: datas?.user.email ?? "",
      address: "",
      phone_number: "",
      password: "",
      newpassword: "",
      avatar: "",
    },
  });

  const fileRef = form.register("avatar", { required: true });
  async function onSubmit(data: z.infer<typeof UpdateUserSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("password", data.password);
      formData.append("newpassword", data.newpassword);
      formData.append("avatar", data.avatar[0]);

      const result = await updateUser(user_id, formData as any);

      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-6 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CustomFormField control={form.control} name="name" label="Full Name">
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: John Doe"
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
                placeholder="e.g: johndoe@mail.com"
                type="text"
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
                placeholder="e.g: +6282-789-987-999"
                type="tel"
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
                placeholder="Old password"
                type="password"
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
                placeholder="New password"
                type="password"
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
                accept="image/jpg, image/jpeg, image/png, image/webp"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <p>Please wait</p>
              </>
            ) : (
              <div className="flex gap-3 items-center cursor-pointer ">
                <p>Edit</p>
              </div>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
