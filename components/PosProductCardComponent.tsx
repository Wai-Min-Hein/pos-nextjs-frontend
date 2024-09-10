import { branch } from "@/constant/image";
import Image from "next/image";
import React from "react";

const PosProductCardComponent = () => {
  return (
    <div className="basis-[22%] select-none cursor-pointer">
      <div className="relative w-12 h-12">
        <Image src={branch} alt="Category" fill objectFit="cover" />
      </div>
      <strong className="block">Mobile</strong>
      <strong  className="block">Samsung S24 ultra</strong>

      <div className="flex items-center justify-between">
        <span>30 pcs</span>
        <span>$ 2000</span>
      </div>
    </div>
  );
};

export default PosProductCardComponent;
