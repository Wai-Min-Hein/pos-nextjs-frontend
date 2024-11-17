"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { fnbSchema } from "@/schema";
import React, { useState } from "react";

import { CiImport } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { fnb } from "@/constant/image";
import { useGetAllMenuCategory } from "@/utils/TanStackHooks/useSystem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fnbInterface, menuCategoryInterface } from "@/types";
import { useRouter } from "next/navigation";

const FnbDetail = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  const router = useRouter()

  const {data: menuCategories} = useGetAllMenuCategory()
  const [menuImage, setMenuImage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: fnbInterface) => {
      try {
        const res = await axios.post(`${baseApi}/fnb`, data)
        router.push("/system/fnb")
      } catch (error) {
        console.log(error);
        
      }
    }
  })
  const form = useForm<z.infer<typeof fnbSchema>>({
    resolver: zodResolver(fnbSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      // createdByImage: "",
      // createdByName: "",
      category: "",
      sku: "",
      unit: "",
    },
  });

  function onSubmit(formData: z.infer<typeof fnbSchema>) {
    mutation.mutate(formData)
  }

  //make image url according user img input with filereader

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMenuImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  
  return (
    <main className="w-full">
      <header className="flex mx-2 justify-between items-center">
        <div className="">
          <h1>Add new menu</h1>
          <p>Manage Menus</p>
        </div>

        <div className="flex justify-start items-center gap-4">
          <Button onClick={form.handleSubmit(onSubmit)} variant={"primary"}>
            <IoMdAddCircleOutline size={18} />
            <span>Save</span>
          </Button>
          <Button variant={"secondary"}>
            <CiImport size={18} />
            <span>Create new menu category</span>
          </Button>
        </div>
      </header>
      <section>
        <Form {...form}>
          <form className="space-y-8">
            <div className="">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <h6>Choose menu image</h6>
                    <FormLabel htmlFor="thumbnail">
                      {menuImage ? (
                        <div className="cursor-pointer w-28 h-28 relative rounded-full overflow-hidden">
                          <Image
                            src={menuImage}
                            sizes="7rem"
                            alt="Menu Image"
                            fill
                            objectFit="cover"
                          />
                        </div>
                      ) : (
                        <div className="cursor-pointer w-28 h-28 relative rounded-full overflow-hidden">
                          <Image
                            src={fnb}
                            alt="Menu Image"
                            fill
                            sizes="7rem"
                            objectFit="cover"
                          />
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        accept="image/*"
                        className="hidden"
                        id="thumbnail"
                        placeholder="Choose Image"
                        type="file"
                        {...field}
                        onChange={onImageChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    menuCategories?.map(menu => (
                      <SelectItem key={menu?._id} value={menu?._id || ''}>{menu?.name}</SelectItem>
                    ))
                  }
                 
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />

            <div className="flex items-center justify-start gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </section>
    </main>
  );
};

export default FnbDetail;
