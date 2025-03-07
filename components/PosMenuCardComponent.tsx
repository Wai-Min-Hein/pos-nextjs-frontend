import {  category } from "@/constant/image";
import { posMenuInterface } from "@/types";
import Image from "next/image";
import React from "react";


interface props{
  menu: posMenuInterface,
  handleOrderedMenuClick?: (menu:posMenuInterface) => void
}

const PosMenuCardComponent: React.FC<props> = ({menu,handleOrderedMenuClick}) => {
  return (
    <div onClick={() =>handleOrderedMenuClick&& handleOrderedMenuClick(menu)} className="flex flex-col justify-between basis-[22%] select-none cursor-pointer bg-white px-3 py-4 rounded shadow-lg min-h-60">
      <div className="group/img grid place-items-center p-6 bg-gray rounded-md">
        <div className="relative w-20 h-20 group-hover/img:scale-125 duration-300">
          <Image src={category} alt="Category" fill objectFit="cover" />
        </div>
      </div>
      
      <strong className="block text-paraText">{menu.menu?.category.name}</strong>
      <strong  className="block text-headerText">{menu.menu?.name}</strong>

      <div className="flex items-center justify-between">
        <span>1 {menu.menu?.unit}</span>
        <span>{menu.price} Ks</span>
      </div>
    </div>
  );
};

export default PosMenuCardComponent;
