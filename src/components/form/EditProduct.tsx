import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  EditProductSchema,
  editProduct,
  editProductSchema,
} from "@/utils/apis/products";

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

import { Loader2 } from "lucide-react";
import axios from "axios";

interface Props {
  product_id: number;
}

type Product = {
  product_id: number;
  category: string;
  name: string;
  cpu: string;
  ram: string;
  display: string;
  storage: string;
  thickness: string;
  weight: string;
  bluetooth: string;
  hdmi: string;
  price: number;
  picture: string;
};

const EditProduct = (props: Props) => {
  const { product_id } = props;

  const [datas, setDatas] = useState<Product>();
  const { toast } = useToast();
  console.log(datas);

  async function fetchData() {
    try {
      const result = await axios.get(
        `http://3.104.106.44:8000/product/${product_id}`
      );

      setDatas(result.data.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.toString(),
        variant: "destructive",
      });
    }
  }

  const form = useForm<EditProductSchema>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      category: datas?.category ?? "",
      name: datas?.name ?? "",
      cpu: datas?.cpu ?? "",
      ram: datas?.ram ?? "",
      display: datas?.display ?? "",
      storage: datas?.storage ?? "",
      thickness: datas?.thickness ?? "",
      weight: datas?.weight ?? "",
      bluetooth: datas?.bluetooth ?? "",
      hdmi: datas?.hdmi ?? "",
      price: datas?.price.toString() ?? "",
      image: datas?.picture ?? "",
    },
    values: {
      category: datas?.category ?? "",
      name: datas?.name ?? "",
      cpu: datas?.cpu ?? "",
      ram: datas?.ram ?? "",
      display: datas?.display ?? "",
      storage: datas?.storage ?? "",
      thickness: datas?.thickness ?? "",
      weight: datas?.weight ?? "",
      bluetooth: datas?.bluetooth ?? "",
      hdmi: datas?.hdmi ?? "",
      price: datas?.price.toString() ?? "",
      image: "",
    },
  });

  const fileRef = form.register("image", { required: true });
  async function onSubmit(data: EditProductSchema) {
    try {
      const formData = new FormData();
      formData.append("category", data.category);
      formData.append("name", data.name);
      formData.append("cpu", data.cpu);
      formData.append("ram", data.ram);
      formData.append("display", data.display);
      formData.append("storage", data.storage);
      formData.append("thickness", data.thickness);
      formData.append("weight", data.weight);
      formData.append("bluetooth", data.bluetooth);
      formData.append("hdmi", data.hdmi);
      formData.append("price", data.price.toString());
      formData.append("image", data.image[0]);

      const result = await editProduct(product_id, formData as any);

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
    <div className="pr-6 h-[35rem] overflow-auto">
      <Form {...form}>
        <form
          className="flex flex-col w-full mx-auto gap-6 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <CustomFormField
            control={form.control}
            name="name"
            label="Name of Laptop"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: ROG Zephyrus Duo 16 (2023)GX650PZ-R948M6T-O"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="cpu" label="CPU">
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: Intel Core i9-11900H"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="ram" label="RAM">
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 32GB DDR4"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="display"
            label="Display"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 15.6-inch UHD 4K IPS"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="storage"
            label="Storage"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 1TB PCIe NVMe M.2 SSD"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="thickness"
            label="Thickness"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 1.5 cm"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="weight" label="Weight">
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 2.3 kg"
                type="text"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              />
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="bluetooth"
            label="Bluetooth"
          >
            {(field) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select yes or no" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CustomFormField>
          <CustomFormField control={form.control} name="hdmi" label="HDMI">
            {(field) => (
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select yes or no" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            )}
          </CustomFormField>
          <CustomFormField
            control={form.control}
            name="price"
            label="Price of Laptop"
          >
            {(field) => (
              <Input
                {...field}
                placeholder="e.g: 10000000"
                type="number"
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
          <CustomFormField control={form.control} name="image" label="Image">
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

export default EditProduct;
