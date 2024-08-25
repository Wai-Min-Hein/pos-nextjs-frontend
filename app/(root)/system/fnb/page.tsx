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

const FnB = () => {
  const [fnbDatas, setFnbDatas] = useState<fnbInterface[]>([]);
  const getDatas = async () => {
    const data = await fetch("https://pos-t6g7.onrender.com/fnb").then((res) =>
      res.json()
    );

    setFnbDatas(data.datas);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const handleAddClick = (): void => {
    console.log("Clicked Add");
  };

  const handleImportClick = (): void => {
    console.log("Clicked Import");
  };

  return (
    <div className="flex-1 p-4 ">
      <ActionHeader
        title="FnB Menus List"
        description="Manage FnB Menus"
        excelIcon={excel}
        handleAddClick={handleAddClick}
        handleImportClick={handleImportClick}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="">Sku</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fnbDatas.map((fnb) => (
            <TableRow key={fnb._id}>
              <TableCell className="font-medium">{fnb.name}</TableCell>
              <TableCell className="font-medium">{fnb.category}</TableCell>
              <TableCell className="font-medium">{fnb.sku}</TableCell>
              <TableCell className="font-medium">{fnb.unit}</TableCell>
              <TableCell className="font-medium">{fnb.price}</TableCell>
              <TableCell className="font-medium">{fnb.createdByName}</TableCell>
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
    </div>
  );
};

export default FnB;
