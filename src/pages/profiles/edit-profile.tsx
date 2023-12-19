import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Loader2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  UpdateUserSchema,
  deleteUser,
  getDetailUser,
  User,
  updateUser,
  updateUserSchema,
} from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/AlertDialog";
import { Form } from "@/components/ui/form";
import Layout from "@/components/Layout";

const EditProfile = () => {
  const [profile, setProfile] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const { changeToken, user } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();
  const params = useParams();

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailUser(params.user_id!);
      setProfile(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: profile?.user.name ?? "",
      email: profile?.user.email ?? "",
      address: profile?.user.address ?? "",
      phone_number: profile?.user.phone_number ?? "",
      password: "",
      newpassword: "",
      avatar: profile?.user.avatar ?? "",
    },
    values: {
      name: profile?.user.name!,
      email: profile?.user.email!,
      address: profile?.user.address!,
      phone_number: profile?.user.phone_number!,
      password: "",
      newpassword: "",
      avatar: "",
    },
  });

  const fileRef = form.register("avatar", { required: true });

  async function onSubmit(data: UpdateUserSchema) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
      formData.append("newpassword", data.newpassword);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);

      const result = await updateUser(user.user?.user_id!, formData as any);
      toast({ description: result.message });
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  async function handleDeleteProfile() {
    try {
      const result = await deleteUser(+params.user_id!);
      toast({ description: result.message });
      changeToken();

      navigate("/");
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
  }, [form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl p-32 font-poppins dark:bg-transparent">
        <h1 className=" pb-16 font-bold text-4xl">Profile</h1>
        <Form {...form}>
          <form
            className=" flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center">
                <div className="relative">
                  <img
                    className="object-cover rounded-full w-36 h-36 relative"
                    src={
                      user.user?.avatar ||
                      "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
                    }
                    alt={user.user?.name || "Guest"}
                  />
                  <label
                    htmlFor="input-image"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <CameraIcon
                      size={45}
                      className="p-1 rounded-full bg-white dark:bg-black"
                    />
                  </label>
                </div>
                <p className=" pl-8 text-3xl font-bold">{user.user?.name}</p>
              </div>
              <Button
                type="button"
                className="w-fit h-fit"
                onClick={() => navigate(-1)}
              >
                <X />
              </Button>
            </div>
            <div className="invisible absolute">
              <CustomFormField control={form.control} name="avatar">
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
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
              className=" bg-[#1FBB5C] h-12"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <p className=" text-center">or</p>
            {/* <Button type="button" variant={"destructive"} className="h-12">
              Delete Account
            </Button> */}
            <Button
              className=" text-black border h-fit hover:bg-gray-200 hover:text-black shadow-md"
              type="button"
              variant={"destructive"}
            >
              <Alert
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                onAction={handleDeleteProfile}
              >
                <p>Delete Account</p>
              </Alert>
            </Button>
          </form>
        </Form>
      </div>
    </Layout>
  );
};

export default EditProfile;
