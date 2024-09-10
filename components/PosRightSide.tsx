import React from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineUserAdd } from "react-icons/ai";
import PosAddedProductComponent from "@/components/PosAddedProductComponent";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
const PosRightSide = () => {
  return (
    <div className="basis-1/3 flex flex-col gap-6">

      <div id="order_info" className="">
        <h6>Order List</h6>
        <h6>Order Id : 1</h6>
      </div>

      <div id="cus_info" className="">
        <h6>Customer Information</h6>
        <div className="flex items-center justify-between gap-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Walkin">Walkin Customer</SelectItem>
                <SelectItem value="Wai">Wai Min</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant={"primary"}>
            <AiOutlineUserAdd />
          </Button>
        </div>
      </div>

      <div id="product_info" className="">
        <div className="flex items-center justify-start gap-2">
          <h6>Product Added</h6>
          <span className="bg-btn w-5 h-5 rounded-full grid place-items-center text-white text-sm">
            44
          </span>
        </div>

        <ScrollArea className="flex flex-col gap-5 h-44  overflow-y-auto">
          <PosAddedProductComponent />
          <PosAddedProductComponent />
          <PosAddedProductComponent />
          <PosAddedProductComponent />
          <ScrollBar className="" />
        </ScrollArea>
      </div>

      <div id="tax_discount" className="flex items-center justify-between gap-4">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Discount" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Walkin">0</SelectItem>
              <SelectItem value="Wai">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tax" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Walkin">0</SelectItem>
              <SelectItem value="Wai">5</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div id="product_detail_info" className="">
        <div className="flex items-start justify-start flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <h6>Product Amount :</h6>
            <strong className="">0 ks</strong>
          </div>

          <div className="flex items-center justify-between w-full">
            <h6>Total Quantity :</h6>
            <strong>0</strong>
          </div>

          <div className="flex items-center justify-between w-full">
            <h6>Tax :</h6>
            <strong>0</strong>
          </div>

          <div className="flex items-center justify-between w-full">
            <h6>Discount :</h6>
            <strong>0</strong>
          </div>

          <div className="flex items-center justify-between w-full mt-6">
            <h6>Total :</h6>
            <strong>0 ks</strong>
          </div>
        </div>
      </div>

      <div id="payment_info" className="">
          <h6>Payment Methods</h6>

          <div className="mt-4">
            <Button variant={"outline"}>Cash</Button>
          </div>
      </div>

      <div id="payment_btn" className="">
        <Button variant={"secondary"} className="mt-6 w-full">
            Grand Total: <span>1000 </span>ks{" "}
        </Button>

          <div className="mt-6 flex items-center justify-start gap-4">
            <Button variant={"primary"} className="basis-1/2">
              Comfirm Order
            </Button>
            <Button variant={"secondary"} className="basis-1/2">
              Payment
            </Button>
          </div>
      </div>

      


    </div>
  );
};

export default PosRightSide;
