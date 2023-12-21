import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { CustomFormField } from "@/components/CustomForm";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Alert from "@/components/AlertDialog";
import { Form } from "@/components/ui/form";
import Layout from "@/components/Layout";

import {
  deleteUser,
  getProfile,
  updateUser,
  UpdateUserSchema,
  updateUserSchema,
  User,
} from "@/utils/apis/users";
import { useToken } from "@/utils/contexts/token";

const EditProfile = () => {
  const [profile, setProfile] = useState<User>();
  const { changeToken } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    fetchData();
  }, [form.formState.isSubmitSuccessful]);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  async function fetchData() {
    try {
      const result = await getProfile();
      setProfile(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const fileRef = form.register("avatar", { required: false });
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

      const result = await updateUser(
        profile?.user.user_id as number,
        formData as any
      );
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
      const result = await deleteUser(profile?.user.user_id as number);
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

  return (
    <Layout>
      <div className="grow bg-white shadow-lg rounded-xl p-4 md:p-8 lg:p-24 font-poppins dark:bg-transparent overflow-auto">
        <h1 className=" mb-16 text-3xl lg:text-4xl font-bold">Edit Profile</h1>
        <Form {...form}>
          <form
            className=" flex flex-col gap-6 relative"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center mb-12">
              <div className="flex items-center">
                <div className="flex items-center relative md:mb-0">
                  <img
                    src={
                      profile?.user.avatar ||
                      "https://mlsn40jruh7z.i.optimole.com/w:auto/h:auto/q:mauto/f:best/https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png"
                    }
                    alt={profile?.user.name || "Guest"}
                    className="object-cover rounded-full w-14 lg:w-36 h-14 lg:h-36 relative"
                  />
                  <label
                    htmlFor="input-image"
                    className="absolute bottom-0 right-0 cursor-pointer"
                  >
                    <CameraIcon
                      size={40}
                      className="p-1 rounded-full bg-white dark:bg-black"
                    />
                  </label>
                </div>
                <p className="ml-4 md:ml-8 text-xl md:text-3xl font-bold truncate">
                  {profile?.user.name}
                </p>
              </div>
              <Button
                type="button"
                className="w-fit h-fit hover:bg-blue-800 mt-6 md:mt-0"
                onClick={() => navigate(-1)}
              >
                <X />
              </Button>
            </div>
            <div className="hidden absolute top-0">
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
                  placeholder={profile?.user.name}
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
                  placeholder={profile?.user.email}
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
              className=" bg-[#1FBB5C] shadow-md"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Submit"
              )}
            </Button>
            <p className="text-center">or</p>
            <Button
              type="button"
              variant={"destructive"}
              className="border hover:text-black shadow-md"
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
