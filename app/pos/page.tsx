"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/SliceHook";
import { resetCurrentOrderId } from "@/slice/OrderIdSlice";
import { useGetAllCsa } from "@/utils/TanStackHooks/usePos";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
const Pos = () => {
  const { isPending, isError, data: areas, error, isLoading } = useGetAllCsa();
  const {orderId,menus} = useAppSelector(state => state.order)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const [currentTable, setCurrentTable] = useState<string>();
  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    areas && setCurrentTable(areas[0]?.name);

  }, [areas]);

  useEffect(() => {
    dispatch(resetCurrentOrderId())
  },[]) // reset orderid to 1 if the day pass

  const handleAddNew = ():void => {
    currentTable && router.push(`pos/${currentTable}/${orderId? orderId:1}`)
  }

  const handleOrder =():void => {
    setOpenDialog(true)
  }

  if (isLoading) {
    return <div className="">Loading.....</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <Button onClick={handleOrder}>
          <MdOutlineShoppingCart size={24} />
          <span>View Orders</span>
        </Button>

        <Button variant={"secondary"}>
          <SlRefresh size={24} />

          <span>Transcations</span>
        </Button>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>View Orders</DialogTitle>
          </DialogHeader>
            {menus.map(menu => (
              <div key={menu.orderId} className="flex items-center justify-between">
                <h1>{menu.orderId}</h1>
                <Button onClick={() => router.push(`pos/${currentTable}/${menu.orderId}`)} variant={"secondary"}>
                  View Details
                </Button>
              </div>
            ))}
          </DialogContent>
      </Dialog>
      </div>

      <div className="">
        <div className="py-6">
          <h6>Choose Area</h6>
        </div>
        <div className="flex items-center justify-start gap-6">
          {areas?.map((area) => (
            <Button
              className={`${currentTable == area.name ? "" : "bg-btnDark"}`}
              onClick={() => setCurrentTable(area.name)}
              key={area?._id}
              variant={"category"}
            >
              {area.name}
            </Button>
          ))}
        </div>

        <Button
          className="mt-8"
          onClick={handleAddNew}
          variant={"addNew"}
        >
          Add New
        </Button>
      </div>
    </div>
  );
};

export default Pos;
