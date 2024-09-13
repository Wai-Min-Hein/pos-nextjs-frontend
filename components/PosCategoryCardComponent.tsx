import { category } from "@/constant/image";
import Image from "next/image";
import React from "react";

const PosCategoryCardComponent = ({code,name, count, isActive}: {code: string, name:string, count:number, isActive: boolean}) => {
  return (
    <div className={`flex items-center justify-start flex-col select-none cursor-pointer shadow-lg px-2 py-5 rounded-md ${isActive? 'bg-red':'bg-white'}`}>
      <div className="relative w-12 h-12">
        <Image src={category} alt="Category" fill objectFit="cover" />
      </div>
      <h6 className="py-1">{name}</h6>
      <p>Items : {count}</p>
    </div>
  );
};

export default PosCategoryCardComponent;
