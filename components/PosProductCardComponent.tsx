import {  jacket } from "@/constant/image";
import Image from "next/image";
import React from "react";

const PosProductCardComponent = ({sku,name,unit, category}: {sku:string, name:string, unit:string, category:string}) => {
  return (
    <div className="basis-[22%] select-none cursor-pointer bg-white px-3 py-4 rounded shadow-md">
      <div className="group/img grid place-items-center p-6 bg-gray rounded-md">
        <div className="relative w-20 h-20 group-hover/img:scale-125 duration-300">
          <Image src={jacket} alt="Category" fill objectFit="cover" />
        </div>
      </div>
      
      <strong className="block text-paraText">{category}</strong>
      <strong  className="block text-headerText">{name}</strong>

      <div className="flex items-center justify-between">
        <span>30 {unit}</span>
        <span>$ 2000</span>
      </div>
    </div>
  );
};

export default PosProductCardComponent;
