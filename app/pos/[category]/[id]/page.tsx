"use client";

import React from "react";

import PosLeftSide from "@/components/PosLeftSide";
import PosRightSide from "@/components/PosRightSide";

const ChooseProduct = () => {


  return (
    <div className="flex items-start justify-start gap-6 ">
     <PosLeftSide/>
      <PosRightSide/>
    </div>
  );
};

export default ChooseProduct;
