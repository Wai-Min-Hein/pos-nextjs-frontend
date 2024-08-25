'use client'
// components/ActionHeader.tsx
import Image, { StaticImageData } from "next/image";
import { HiOutlinePrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiImport } from "react-icons/ci";
import { Button } from "./ui/button";
import { ActionHeaderPropsInterface } from "@/types";

const ActionHeader: React.FC<ActionHeaderPropsInterface> = ({
  title,
  description,
  excelIcon,
  handleAddClick,
  handleImportClick,
}) => {
  return (
    <div className="flex mx-2 justify-between items-center">
      <div className="">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div className="flex justify-start items-center gap-4">
        {excelIcon && (
          <div className="relative cursor-pointer w-6 h-6">
            <Image
              src={excelIcon}
              alt="Excel icon"
              fill
              sizes="24px"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        <HiOutlinePrinter className="cursor-pointer" size={24} />
        <Button onClick={handleAddClick} variant={"primary"}>
            <IoMdAddCircleOutline size={18} />
            <span>Add New</span>
        </Button>
        <Button onClick={handleImportClick} variant={"secondary"}>
            <CiImport size={18} />
            <span>Import Product</span>
        </Button>
      </div>
    </div>
  );
};

export default ActionHeader;
