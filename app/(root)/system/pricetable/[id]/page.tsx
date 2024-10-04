"use client";
import React from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { details } from "@/constant/icon";
import { excel } from "@/constant/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { CiImport } from "react-icons/ci";
import { priceTableMenuInterface } from "@/types";

import { toast, useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import ProductDetailInfo from "@/components/priceTable/productDetailInfo";
import Applypolicy from "@/components/priceTable/applypolicy";
import ActionHeader from "@/components/ActionHeader";

const PriceTableDetails = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  const router = useRouter()

  const [applyPolicy, setApplyPolicy] = useState(true);
  const [detailInfo, setDetailInfo] = useState(false);

  const [priceTableMenus, setPriceTableMenus] = useState<
    priceTableMenuInterface[]
  >([]);

  const handleAddClick = () => router.push('/system/pricetable/new');

  return (
    <div className="w-full px-8">
      {/* <ActionHeader
        title={"Details Informations"}
        description={"Create new product table"}
        handleAddClick={handleAddClick}
      /> */}

      <div id="header" className="bg-gray mt-8 rounded-md py-2 px-6">
        <div className=" flex items-center gap-4 justify-start">
          <Button
            onClick={() => (
              setApplyPolicy((prev) => !prev), setDetailInfo((prev) => !prev)
            )}
            variant={"underLine"}
            className={`${applyPolicy ? "border-b-btn border-b-2 " : ""}`}
          >
            Apply Policy
          </Button>

          <Button
            onClick={() => (
              setApplyPolicy((prev) => !prev), setDetailInfo((prev) => !prev)
            )}
            variant={"underLine"}
            className={`${detailInfo ? "border-b-btn border-b-2 " : ""}`}
          >
            Products Details Information
          </Button>
        </div>
      </div>

      <Applypolicy
        applyPolicy={applyPolicy}
        priceTableMenus={priceTableMenus}
      />

      <ProductDetailInfo
        detailInfo={detailInfo}
        priceTableMenus={priceTableMenus}
        setPriceTableMenus={setPriceTableMenus}
      />
    </div>
  );
};

export default PriceTableDetails;
