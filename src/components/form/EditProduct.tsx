import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import {
  EditProductSchema,
  Product,
  editProduct,
  editProductSchema,
  getDetailProduct,
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

interface Props {
  product_id: number;
}

const EditProduct = (props: Props) => {
  const { product_id } = props;

  const [datas, setDatas] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      picture: datas?.picture ?? "",
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
      picture: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form.formState]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const result = await getDetailProduct(product_id);
      setDatas(result.data);
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

  const fileRef = form.register("picture", { required: true });
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
      formData.append("picture", data.picture[0]);

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

  return (
    <div className="pl-2 pr-6 h-[35rem] overflow-auto mt-6 font-poppins">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>Loading</p>
        </div>
      ) : (
        <>
          <Form {...form}>
            <form
              className="flex flex-col w-full mx-auto gap-6"
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
                    placeholder="e.g: ROG Zephyrus Duo 16 GX650PZ-R948M6T-O"
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
                    placeholder="e.g: Intel Core i7-10900H"
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
                    placeholder="e.g: 16GB DDR4 3200Mhz"
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
              <CustomFormField
                control={form.control}
                name="weight"
                label="Weight"
              >
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
                    placeholder="e.g: Rp 14.499.000,00"
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
              <CustomFormField
                control={form.control}
                name="picture"
                label="Image"
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
                      Edit Product
                    </p>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default EditProduct;
