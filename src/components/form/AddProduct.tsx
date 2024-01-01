import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { CustomFormField } from "@/components/CustomForm";
import { Form, FormControl } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  addProduct,
  AddProductSchema,
  addProductSchema,
} from "@/utils/apis/products";

interface Props {
  refetchProduct: () => void;
}

const AddProduct = (props: Props) => {
  const { refetchProduct } = props;
  const { toast } = useToast();

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      laptop: "",
      category: "",
      picture: "",
    },
  });

  const fileRef = form.register("picture", { required: true });
  async function onSubmit(data: AddProductSchema) {
    try {
      const formData = new FormData();
      formData.append("laptop", data.laptop);
      formData.append("category", data.category);
      formData.append("picture", data.picture[0]);

      const result = await addProduct(formData as any);
      toast({ description: result.message });
      refetchProduct();
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full mx-auto gap-6 mt-10 font-poppins"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CustomFormField
          control={form.control}
          name="laptop"
          label="Name of Laptop"
        >
          {(field) => (
            <Input
              {...field}
              placeholder="e.g: Asus Vivobook 2023"
              type="text"
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            />
          )}
        </CustomFormField>
        <CustomFormField
          control={form.control}
          name="category"
          label="Category"
        >
          {(field) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Office">Office</SelectItem>
                <SelectItem value="Multimedia">Multimedia</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CustomFormField>
        <CustomFormField control={form.control} name="picture" label="Image">
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
                Add Product
              </p>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddProduct;
