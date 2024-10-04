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

const PriceTable = () => {
  const { data: priceTableDatas, isLoading, isError } = useGetAllPriceTable();
  const router = useRouter();

  const handleAddClick = (): void => {
    router.push("/system/pricetable/new");
  };

  const handleImportClick = (): void => {
    router.push("/system/pricetable/new");
  };

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
                  {priceData.branch}
                </TableCell>
                <TableCell className="font-medium">{priceData.area}</TableCell>
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
                    <div className="w-8 h-8 grid place-items-center rounded border-2  border-gray cursor-pointer">
                      <LuEye />
                    </div>
                    <div className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer">
                      <TbEdit />
                    </div>

                    <div className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer">
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
