"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { excel } from "@/constant/image";
import {
  customerServiceAreaInterface,
  fnbInterface,
  menuCategoryInterface,
} from "@/types";
import { LuEye } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import ActionHeader from "@/components/ActionHeader";
import { useGetAllMenuCategory } from "@/utils/TanStackHooks/useSystem";
import { useRouter } from "next/navigation";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { csaSchema } from "@/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useToast } from "@/hooks/use-toast";
import { useGetAllCsa } from "@/utils/TanStackHooks/usePos";

const CustomerServiceArea = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: csa, isLoading, isError } = useGetAllCsa();
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  const { toast } = useToast();

  const queryClient = useQueryClient();
  const singleDeleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete(`${baseApi}/csa/${id}`);
      } catch (error) {}
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["csa"] });
    },
  });

  const form = useForm<z.infer<typeof csaSchema>>({
    resolver: zodResolver(csaSchema),
    defaultValues: {
      name: "",
      code: "",
    },
  });
  const postMutation = useMutation({
    mutationFn: async (data: customerServiceAreaInterface) => {
      try {
        const res = await axios.post(`${baseApi}/csa`, data);
        setOpenDialog((prev) => !prev);
        form.reset();
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          toast({
            title: error.response.data.message,
          });
        } else {
          console.log("An unknown error occurred");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["csa"] });
    },
  });

  function onSubmit(formData: z.infer<typeof csaSchema>) {
    postMutation.mutate(formData);
  }

  const handleAddClick = (): void => {
    setOpenDialog((prev) => !prev);
  };

  const handleImportClick = (): void => {
    console.log("Clicked Import");
  };

  const handleSingleDelete = (id: string): void => {
    singleDeleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex-1 p-4 ">
        <ActionHeader
          title="Customer Service Area List"
          description="Manage Customer Service Area"
          excelIcon={excel}
          handleAddClick={handleAddClick}
          handleImportClick={handleImportClick}
        />
        <div className="">Loading.....</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 ">
      <ActionHeader
        title="Customer Service Area List"
        description="Manage Customer Service Area"
        excelIcon={excel}
        handleAddClick={handleAddClick}
        handleImportClick={handleImportClick}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {csa?.map((fnb) => (
            <TableRow key={fnb._id}>
              <TableCell className="font-medium">{fnb.name}</TableCell>
              <TableCell className="font-medium">{fnb.code}</TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center justify-center gap-x-2">
                  <div className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer">
                    <TbEdit />
                  </div>

                  <div
                    onClick={() => handleSingleDelete(fnb?._id as string)}
                    className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Customer Service Area</DialogTitle>
          </DialogHeader>
          <div className="">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerServiceArea;
