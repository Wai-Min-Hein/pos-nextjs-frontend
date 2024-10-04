"use client";
import React from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye, LuMoveLeft, LuSave } from "react-icons/lu";
import { details } from "@/constant/icon";
import { excel } from "@/constant/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import {
  useGetAllFnb,
  useGetAllPriceTable,
} from "@/utils/TanStackHooks/useSystem";
import Image from "next/image";
import { CiImport } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { priceTableMenuInterface } from "@/types";

import toast, { Toaster } from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";

import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { priceTableSchema } from "@/schema";
import { useMutation } from "@tanstack/react-query";

interface props {
  applyPolicy: boolean;
  priceTableMenus: priceTableMenuInterface[];
}

const Applypolicy = ({ applyPolicy, priceTableMenus }: props) => {
  const router = useRouter();

  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  const mutation = useMutation({
    mutationFn: (data: {
      code: string;
      name: string;
      branch: string;
      area: string;
      startDate: Date | undefined;
      endDate: Date | undefined;
      menus?: {
        menuId: string;
        price: number;
        vat: number;
        disPercent: number;
        disAmount: number;
        adjust: boolean;
      }[];
    }) => {
      try {
        const res = axios.post(`${baseApi}/pricetable`, data);
        router.push("/system/pricetable");
        toast('Price table data created successfully.')
        return res;
      } catch (error) {
        throw error;
      }
    },
  });

  const form = useForm<z.infer<typeof priceTableSchema>>({
    resolver: zodResolver(priceTableSchema),
    defaultValues: {
      code: "",
      name: "",
      branch: "",
      area: "",
      startDate: undefined,
      endDate: undefined,
      menus: [
        {
          menuId: "",
          price: 0,
          vat: 0,
          disPercent: 0,
          disAmount: 0,
          adjust: false,
        },
      ],
    },
  });

  async function onSubmit(formData: z.infer<typeof priceTableSchema>) {
    mutation.mutate(formData);
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.setValue("menus", priceTableMenus);

    form.handleSubmit(onSubmit)();
  };

  return (
    <div
      id="policy"
      className={`bg-gray mt-8 rounded-md py-2 px-6 ${
        applyPolicy ? "block" : "hidden"
      }`}
    >
      <Toaster/>
      
      {mutation.isError ? (
        toast(mutation.error.message)
      ) : null}
      
      <Form {...form}>
        <form className="w-2/3 space-y-6" method="POST">
          <div className="">
            <h6>Price Table Information</h6>
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Table Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Code" {...field} />
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
                    <FormLabel>Price Table Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <h6>Apply at</h6>
            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="a">a</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="a">a</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            form.getValues("startDate") &&
                            date < form.getValues("startDate")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            onClick={onFormSubmit}
            disabled={mutation.isPending}
            type="submit"
          >
            {mutation.isPending ? "Loading ... " : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Applypolicy;
