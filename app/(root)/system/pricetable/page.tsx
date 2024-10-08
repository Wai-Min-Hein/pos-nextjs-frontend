"use client";

import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { excel } from "@/constant/image";
import { fnbInterface } from "@/types";
import { LuEye } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import ActionHeader from "@/components/ActionHeader";
import {
  useGetAllFnb,
  useGetAllPriceTable,
} from "@/utils/TanStackHooks/useSystem";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const PriceTable = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;

  const { data: priceTableDatas, isLoading, isError } = useGetAllPriceTable();


  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await axios.delete(`${baseApi}/pricetable/${id}`);
        return res.data; // You may not need to return this, but it can be useful for logging
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate the price table query using the same key as in useGetAllPriceTable
      queryClient.invalidateQueries({queryKey: ['pricetable'],}); // Use an array to match the query key format
    },
  });
 
  const router = useRouter();

  const handleAddClick = (): void => {
    router.push("/system/pricetable/new");
  };

  const handleImportClick = (): void => {
    router.push("/system/pricetable/new");
  };

  const handleDelete = (id:string) : void=> {
    mutation.mutate(id)
  }

  const handleEdit = (id: string) : void=> {
    router.push(`/system/pricetable/${id}`);
  }

  return (
    <div className="flex-1 p-4 ">
      <ActionHeader
        title="Price Data List"
        description="Manage Price Data"
        excelIcon={excel}
        handleAddClick={handleAddClick}
        handleImportClick={handleImportClick}
      />
      {!isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="">Area</TableHead>
              <TableHead>DateFrom</TableHead>
              <TableHead>DateTo</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priceTableDatas?.map((priceData) => (
              <TableRow key={priceData._id}>
                <TableCell className="font-medium">{priceData.code}</TableCell>
                <TableCell className="font-medium">{priceData.name}</TableCell>
                <TableCell className="font-medium">
                  {priceData.branch.name}
                </TableCell>
                <TableCell className="font-medium">{priceData.area.name}</TableCell>
                <TableCell className="font-medium">
                  {priceData.startDate &&
                    new Date(priceData.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium">
                  {priceData.endDate &&
                    new Date(priceData.endDate).toLocaleDateString()}
                </TableCell>

                <TableCell className="font-medium">
                  <div className="flex items-center justify-center gap-x-2">
                    <div onClick={() => handleEdit(priceData._id)} className="w-8 h-8 grid place-items-center rounded border-2  border-gray cursor-pointer">
                      <LuEye />
                    </div>
                    

                    <div onClick={() => handleDelete(priceData._id)} className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer">
                      <MdDeleteOutline />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="">Loading .....</div>
      )}
    </div>
  );
};

export default PriceTable;
