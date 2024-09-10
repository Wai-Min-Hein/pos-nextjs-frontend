import { branch } from "@/constant/image";
import Image from "next/image";
import React from "react";

const PosCategoryCardComponent = () => {
  return (
    <div className="p-1 flex items-center justify-start flex-col select-none cursor-pointer">
      <div className="relative w-12 h-12">
        <Image src={branch} alt="Category" fill objectFit="cover" />
      </div>
      <p>All Category</p>
      <p>Items : 14</p>
    </div>
  );
};

export default PosCategoryCardComponent;
