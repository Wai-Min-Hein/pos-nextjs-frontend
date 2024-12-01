import { category } from "@/constant/image";
import Image from "next/image";
import React from "react";

interface props{
  code: string, name:string, count?:number, isActive: boolean
}
const PosCategoryCardComponent: React.FC<props> = ({code,name, isActive,count}) => {
  return (
    <div className={`flex items-center justify-start flex-col select-none cursor-pointer shadow-lg px-2 py-5 rounded-md ${isActive? 'bg-[#22d1ee]':'bg-white'}`}>
      <div className="relative w-12 h-12">
        <Image src={category} alt="Category" fill objectFit="cover" />
      </div>
      <h6 className="py-1">{name}</h6>
      {
        count && <p>Items : {count }</p>
      }
      
    </div>
  );
};

export default PosCategoryCardComponent;
