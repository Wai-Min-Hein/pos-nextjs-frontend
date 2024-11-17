"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import PosCategoryCardComponent from "@/components/PosCategoryCardComponent";
import PosMenuCardComponent from "@/components/PosMenuCardComponent";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useGetAllCategory } from "@/utils/TanStackHooks/usePos";
import { fnbInterface, priceTableMenuInterface } from "@/types";

import { useParams, usePathname } from "next/navigation";
import { useGetPriceTableByAreaName } from "@/utils/TanStackHooks/usePos";

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

const ChooseProduct = () => {
  const tableArea = useParams().category as string;
  const { data: priceTable } = useGetPriceTableByAreaName(tableArea);

  const menus = priceTable?.menus;

  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const { data: allCategories, isLoading: isCategoryLoading } =
    useGetAllCategory();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const [orderedMenus, setOrderedMenus] = useState<priceTableMenuInterface[]>([])
  const handleOrderedMenuClick = (menu:priceTableMenuInterface ) => {
    const isExisted = orderedMenus.includes(menu)
    if(!isExisted){
      setOrderedMenus(prev => [menu,...prev]);
    }
  }

  const allProductAmount = orderedMenus.reduce((pv, cv) => pv+cv.price , 0)

  return (
    <div className="flex items-start justify-start gap-6 ">
      {/* left side */}
      <div className="basis-2/3 bg-slate-100 p-6 rounded-md">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="mb-6">
              <h1>Categories</h1>
              <p>Select from below categories</p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Button
                className="rounded-full p-0 w-6 h-6"
                onClick={() => api?.scrollTo(current + 1)}
              >
                <MdOutlineKeyboardArrowLeft size={24} />
              </Button>
              <Button
                className="rounded-full p-0 w-6 h-6"
                onClick={() => api?.scrollTo(current - 1)}
              >
                <MdOutlineKeyboardArrowRight size={24} />
              </Button>
            </div>
          </div>
        </div>

        {isCategoryLoading ? (
          <div className="">
            <h6>Loading..........</h6>
          </div>
        ) : (
          <div className="">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
              setApi={setApi}
            >
              <CarouselContent>
                <CarouselItem
                  onClick={() => setCurrentCategory("All")}
                  className="basis-1/5 w-full"
                >
                  <PosCategoryCardComponent
                    code={"All"}
                    name={"All"}
                    count={menus ? menus.length : 0}
                    isActive={currentCategory == "All"}
                  />
                </CarouselItem>
                {allCategories?.map((category) => {
                  return (
                    <CarouselItem
                      onClick={() => setCurrentCategory(category._id)}
                      key={category?._id}
                      className="basis-1/5 w-full"
                    >
                      {category?.status && (
                        <PosCategoryCardComponent
                          code={category?.code}
                          name={category?.name}
                          count={allCategories.length}
                          isActive={currentCategory == category._id}
                        />
                      )}
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        )}

        <div className="mt-6">
          <h1 className="mb-6">Menus</h1>

          <div className="flex items-center justify-start gap-8 flex-wrap">
            {menus?.map((menu) => (
              <PosMenuCardComponent handleOrderedMenuClick={handleOrderedMenuClick} key={menu?.menu?._id} menu={menu} />
            ))}
          </div>
        </div>
      </div>
      {/* left side */}

      {/* right side */}

      <div className="basis-1/3 flex flex-col gap-6 p-6">
        <div id="order_info" className="">
          <h6>Order List</h6>
          <h6>Order Id : 1</h6>
        </div>

        <div id="cus_info" className="">
          <h6 className="py-4">Customer Information</h6>
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
            <h6>Added Menus</h6>
            <span className="bg-btn w-5 h-5 rounded-full grid place-items-center text-white text-sm">
              {orderedMenus.length}
            </span>
          </div>

          <ScrollArea className="flex flex-col gap-5 h-44  overflow-y-auto">

            {
              orderedMenus?.map(menu => (

                <PosAddedProductComponent key={menu?.menu._id} menu={menu} />
              ))
            }
            <ScrollBar className="" />
          </ScrollArea>
        </div>

        <div
          id="tax_discount"
          className="flex items-center justify-between gap-4"
        >
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
              <strong className="">{allProductAmount} ks</strong>
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
      {/* right side */}
    </div>
  );
};

export default ChooseProduct;
