import { branch } from "@/constant/image";
import Image from "next/image";
import React from "react";
import { FiEdit, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Button } from "./ui/button";
import { MdDeleteSweep } from "react-icons/md";

const PosAddedProductComponent = () => {
  return (
    <div className="flex items-center justify-between gap-6 my-4 select-none">
      <div className="flex items-center justify-start gap-6">
        <div className="relative w-12 h-12">
          <Image src={branch} alt="Category" fill objectFit="cover" />
        </div>

        <div className="flex flex-col">
          <span>001</span>
          <strong>Mac Book</strong>
          <span>$ 2000</span>
        </div>
      </div>

      <div className="flex items-center justify-start gap-3">
        <FiMinusCircle className="cursor-pointer"/>
        <span className="">4</span>
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
