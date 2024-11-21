import { branch,jacket } from "@/constant/image";
import Image from "next/image";
import React from "react";
import { FiEdit, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { Button } from "./ui/button";
import { MdDeleteSweep } from "react-icons/md";
import { posMenuInterface } from "@/types";

interface props {
  menu: posMenuInterface,
  orderedMenus: posMenuInterface[],
  setOrderedMenus: React.Dispatch<React.SetStateAction<posMenuInterface[]>>;
}

const PosAddedProductComponent: React.FC<props> = ({menu,orderedMenus,setOrderedMenus}) => {

  const handleDelete= () => {
  const notDeletedMenu = orderedMenus.filter(orderedMenu => orderedMenu.menu._id != menu.menu._id)
    setOrderedMenus(notDeletedMenu)
  }
  const handlePlusQty = (menu: posMenuInterface) => {
    // Find the current menu item in orderedMenus
    const currentMenuIndex = orderedMenus.findIndex(orderedMenu => orderedMenu.menu._id === menu.menu._id);

    if (currentMenuIndex !== -1) {
        // Create a new array with updated quantity
        const updatedMenus = [...orderedMenus];
        updatedMenus[currentMenuIndex] = {
            ...updatedMenus[currentMenuIndex],
            qty: updatedMenus[currentMenuIndex].qty + 1, // Increase quantity by 1
            totalMenuAmt: (updatedMenus[currentMenuIndex].qty + 1) * updatedMenus[currentMenuIndex].price, // Update total amount
            totalMenuDiscountedAmt: updatedMenus[currentMenuIndex].menuDiscountedAmt&& (updatedMenus[currentMenuIndex].qty + 1) * updatedMenus[currentMenuIndex].menuDiscountedAmt
        };

        // Update state with new array
        setOrderedMenus(updatedMenus);
    }
  };


  const handleMinusQty = (menu: posMenuInterface) => {
    // Find the current menu item in orderedMenus
    const currentMenuIndex = orderedMenus.findIndex(orderedMenu => orderedMenu.menu._id === menu.menu._id);

    if (currentMenuIndex !== -1 && menu.qty>1) {
        // Create a new array with updated quantity
        const updatedMenus = [...orderedMenus];
        updatedMenus[currentMenuIndex] = {
            ...updatedMenus[currentMenuIndex],
            qty: updatedMenus[currentMenuIndex].qty - 1, // Increase quantity by 1
            totalMenuAmt: (updatedMenus[currentMenuIndex].qty - 1) * updatedMenus[currentMenuIndex].price, // Update total amount
            totalMenuDiscountedAmt: updatedMenus[currentMenuIndex].menuDiscountedAmt&& (updatedMenus[currentMenuIndex].qty - 1) * updatedMenus[currentMenuIndex].menuDiscountedAmt

        };

        // Update state with new array
        setOrderedMenus(updatedMenus);
    }
  };

  return (
    <div className="flex items-center justify-between gap-6 my-4 select-none">
      <div className="flex items-center justify-start gap-6">
        <div className="bg-gray rounded-sm p-2">
          <div className="relative w-12 h-12">
            <Image src={jacket} alt="Category" fill objectFit="cover" />
          </div>
        </div>
        

        <div className="flex flex-col">
          <span>{menu?.menu.sku}</span>
          <strong>{menu?.menu.name}</strong>
          <span>{menu?.price} Ks</span>
        </div>
      </div>

      <div className="flex items-center justify-start gap-3">
        <FiMinusCircle onClick={() => handleMinusQty(menu)} className="cursor-pointer"/>
        <span className="">{menu.qty}</span>
        <FiPlusCircle onClick={() => handlePlusQty(menu)} className="cursor-pointer" />
      </div>

      <span className="">{menu.totalMenuAmt - (menu.totalMenuDiscountedAmt ? menu.totalMenuDiscountedAmt:0)} Ks
        {menu.menuDiscountedAmt && 
        
        (
          menu.disPercent?
          <span> (-{menu.disPercent}%)</span>:
          <span> (- {menu.qty *menu.disAmount} Ks)</span>
        )
        
        }
        
      </span>

      {/* <Button variant={"outline"}>
        <FiEdit />
      </Button> */}

      <Button onClick={handleDelete} variant={"outline"}>
        <MdDeleteSweep />
      </Button>
    </div>
  );
};

export default PosAddedProductComponent;
