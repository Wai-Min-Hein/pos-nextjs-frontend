import { branch,jacket } from "@/constant/image";
import Image from "next/image";
import React from "react";
import { FiEdit, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Button } from "./ui/button";
import { MdDeleteSweep } from "react-icons/md";
import { priceTableMenuInterface } from "@/types";

interface props {
  menu: priceTableMenuInterface
}

const PosAddedProductComponent: React.FC<props> = ({menu}) => {
  return (
    <div className="flex items-center justify-between gap-6 my-4 select-none">
      <div className="flex items-center justify-start gap-6">
        <div className="bg-gray rounded-sm p-2">
          <div className="relative w-12 h-12">
            <Image src={jacket} alt="Category" fill objectFit="cover" />
          </div>
        </div>
        

        <div className="flex flex-col">
          <span>{menu?.menu.sku}</span>
          <strong>{menu?.menu.name}</strong>
          <span>{menu?.price} Ks</span>
        </div>
      </div>

      <div className="flex items-center justify-start gap-3">
        <FiMinusCircle className="cursor-pointer"/>
        <span className="">1</span>
        <FiPlusCircle className="cursor-pointer" />
      </div>
      <Button variant={"outline"}>
        <FiEdit />
      </Button>

      <Button variant={"outline"}>
        <MdDeleteSweep />
      </Button>
    </div>
  );
};

export default PosAddedProductComponent;
