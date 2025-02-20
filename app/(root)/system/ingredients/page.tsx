"use client";

import React, { use, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { excel, fnb, ingredients, product } from "@/constant/image";
import { fnbInterface, ingredientListInterface, ingredientProductInterface, productInterface } from "@/types";
import { LuEye } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import ActionHeader from "@/components/ActionHeader";
import { useGetAllFnb, useGetAllProduct } from "@/utils/TanStackHooks/useSystem";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
import { Button } from "@/components/ui/button";
import { CiImport } from "react-icons/ci";

const IngredientsList = () => {
  const { data: fnbDatas, isLoading, isError, error } = useGetAllFnb();
  const { data: productDatas } = useGetAllProduct();


  const [open, setOpen] = useState<string[]>([]);

  const onOpen = (id: string) => {
    if (open.includes(id)) {
      setOpen(open.filter((item) => item !== id));
    } else {
      setOpen([...open, id]);
    }
  };

  const [selectedProduct, setSelectedProduct]= useState<ingredientProductInterface| null>(null)


  const [ingredientsList, setIngredientsList] = useState<ingredientListInterface[]>([]);

  const handlefnbIngredientSave = (fnbId: string, product: ingredientProductInterface | null): void => {
    // Find if there's an existing entry with the same fnbId
      const fnbIndex = ingredientsList.findIndex((item) => item.fnb === fnbId);
      console.log("fnbIndex", fnbIndex);
      // If there is existed fnbId
      if(fnbIndex >= 0) {
        //  find if there's an existing ingredient with the same productId in the ingredients array
        const ingredientIndex = ingredientsList[fnbIndex].ingredients.findIndex((item) => item.ingredient === product?._id);
        // If there is existed ingredient
        if(ingredientIndex >= 0) {
          // Update the qty of the ingredient
          setIngredientsList(prev => {
            const newList = [...prev];
            newList[fnbIndex].ingredients[ingredientIndex].qty = product?.qty || 0;
            return newList;
          });
        } else {
          // Add the ingredient to the ingredients array
          setIngredientsList(prev => {
            const newList = [...prev];
            newList[fnbIndex].ingredients.push({ingredient: product?._id || '', qty: product?.qty || 0});
            return newList;
          });
        }
      } else {
        setIngredientsList(prev => [...prev, {fnb: fnbId, ingredients: [{ingredient: product?._id || '', qty: product?.qty || 0}]}]);
      }
    
  };
  

  const router = useRouter();

  const handleAddClick = (): void => {
    router.push("fnb/new");
  };

  const handleImportClick = (): void => {
    console.log("Clicked Import");
  };

  if (isError) {
    return (
      <div className="flex-1 p-4 ">
        <ActionHeader
          title="Ingredients List"
          description="Manage Ingredients List"
          excelIcon={excel}
          handleAddClick={handleAddClick}
          handleImportClick={handleImportClick}
        />
        <div className="">{error.message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-4 ">
        <ActionHeader
          title="Ingredients List"
          description="Manage Ingredients List"
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
        title="Ingredients List"
        description="Manage Ingredients List"
        excelIcon={excel}
        handleAddClick={handleAddClick}
        handleImportClick={handleImportClick}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Name</TableHead>
            <TableHead className="w-[20%]">Category</TableHead>
            <TableHead className="w-[15%]">Quantity</TableHead>
            <TableHead className="w-[15%] ">Unit</TableHead>
            <TableHead className="w-1/5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fnbDatas?.map((fnb, index) => {
            return (
              <>
                <TableRow
                  className={`cursor-pointer hover:bg-slate-300 duration-150 ${
                    fnb._id && open.includes(fnb._id) && "bg-slate-300"
                  }`}
                  onClick={() => onOpen(fnb._id ? fnb._id : "")}
                  key={index}
                >
                  <TableCell className="font-medium">{fnb.sku} - {fnb.name}</TableCell>
                  <TableCell className="font-medium">
                    {fnb.category.name}
                  </TableCell>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell className="font-medium">{fnb.unit}</TableCell>
                  <TableCell className="font-medium">Action</TableCell>
                </TableRow>

                <TableRow
                  className={`${
                    fnb._id && !open.includes(fnb._id) && "hidden"
                  } border border-red mt-4`}
                  key={fnb._id}
                >
                  <TableCell className="font-medium">
                    <Select onValueChange={(value) => setSelectedProduct(productDatas?.find((product) => product._id === value)|| null)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Products</SelectLabel>
                          {
                            productDatas?.map((product) => (
                              <SelectItem className="cursor-pointer" key={product._id} value={product._id?product._id:''}>{product.sku} - {product.name}</SelectItem>
                            ))
                          }
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-medium">{selectedProduct?.category.name}</TableCell>
                  <TableCell className="font-medium">
                    <Input className="" onChange={e => setSelectedProduct(prev => prev ? {...prev, qty: Number(e.target.value)} : null)}  type="number" placeholder="Qty" />
                  </TableCell>
                  <TableCell className="font-medium">{selectedProduct?.unit}</TableCell>
                  <TableCell className="font-medium">
                    <Button onClick={()=> handlefnbIngredientSave(fnb?._id || '', selectedProduct|| null)} variant={"secondary"}>
                        <span>Save</span>
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default IngredientsList;
