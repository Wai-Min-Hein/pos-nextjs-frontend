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
import {
  fnbInterface,
  posBillInterface,
  posMenuInterface,
  priceTableMenuInterface,
} from "@/types";

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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { billSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/hooks/SliceHook";
import { addConfirmedOrder, addCurrentOrderId, deleteConfirmedOrder } from "@/slice/OrderIdSlice";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const ChooseProduct = () => {
  const baseApi = process.env.NEXT_PUBLIC_BASE_API;
  

  const router = useRouter()

  const params = useParams<{id: string}>()
  const orderId = parseInt(params.id, 10);

  const {menus: currentOrder} = useAppSelector(state => state.order)

  const currentOrderedMenu = currentOrder.filter(order => order.orderId == orderId)[0]

  const dispatch = useAppDispatch()
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

  const [orderedMenus, setOrderedMenus] = useState<posMenuInterface[]>(currentOrderedMenu? currentOrderedMenu.billMenus:[]);
  const handleOrderedMenuClick = (menu: posMenuInterface) => {
    const isExisted = orderedMenus.filter(
      (orderedMenu) => orderedMenu.menu._id == menu.menu._id
    )[0];
    if (!isExisted) {
      setOrderedMenus((prev) => [menu, ...prev]);
    }

  };

  
 

  const allProductAmount = currentOrderedMenu? currentOrderedMenu.productAmount:  orderedMenus.reduce((pv, cv) => pv + cv.price, 0);
  const totalDiscountedAmount = currentOrderedMenu?.totalDiscount ?? orderedMenus.reduce(
    (pv, cv) => pv + (cv.totalMenuDiscountedAmt ?? 0),
    0
  );
  const allTotalAmount =   orderedMenus.reduce(
    (pv, cv) => pv + cv.totalMenuAmt,
    0
  );

  const totalPaymentAmount =  currentOrderedMenu? currentOrderedMenu.totalPaymentAmount: ( allTotalAmount - totalDiscountedAmount)


  const totalQty = currentOrderedMenu? currentOrderedMenu.totalQty: ( orderedMenus.reduce((pv, cv) => pv + cv.qty, 0));

  const form = useForm<z.infer<typeof billSchema>>({
    resolver: zodResolver(billSchema),
    defaultValues: {
      orderId,
      customer: "",
      paymentMethod: "cash",
      productAmount:  allProductAmount,
      totalQty: totalQty,
      totalDiscount: totalDiscountedAmount,
      totalPaymentAmount: totalPaymentAmount,
      totalTax: 0,
      billDiscount: 0,
      billTax: 0,
      billMenus: [{menuId:'', price:0, qty:0, discountedAmount:0, totalDiscountedAmount:0}]
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: posBillInterface) => {
      try {
        const res = await axios.post(`${baseApi}/posbill`, data)
        router.push("/pos")
      } catch (error) {
        console.log(error);
        
      }
    }
  })

  function onSubmit(values: z.infer<typeof billSchema>) {
    dispatch(addCurrentOrderId())
    mutation.mutate(values)
    dispatch(deleteConfirmedOrder(orderId))

  }

  const handleConfirmedOrder = (): void=> {
    const formData = form.getValues()
    formData.billMenus = orderedMenus
    const newFormData = {...formData, billMenus:orderedMenus}
    dispatch(addConfirmedOrder(newFormData))
    router.push('/pos')
  }


  useEffect(() => {
    // form.setValue('orderId',1)
    // form.setValue('paymentMethod', 'cash')
    form.setValue('productAmount', allProductAmount)
    form.setValue('totalQty', totalQty)
    form.setValue('totalDiscount', totalDiscountedAmount)
    form.setValue('totalPaymentAmount', totalPaymentAmount)

    const billMenus  = orderedMenus.map(orderedMenu => ({menuId: orderedMenu.menu._id, price: orderedMenu.price, qty:orderedMenu.qty, discountedAmount: orderedMenu.menuDiscountedAmt, totalDiscountedAmount: orderedMenu.totalMenuDiscountedAmt }))

    form.setValue('billMenus', billMenus)



  },[allProductAmount,totalQty,totalDiscountedAmount,allTotalAmount,form,orderedMenus])


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
            {menus?.map((menu) => {
              const menuDiscountedAmt = menu.disAmount
                ? menu.disAmount
                : menu.disPercent
                ? menu.price * (menu.disPercent / 100)
                : 0;

              const totalMenuDiscountedAmt = menuDiscountedAmt;

              return (
                <PosMenuCardComponent
                  handleOrderedMenuClick={handleOrderedMenuClick}
                  key={menu?.menu?._id}
                  menu={{
                    ...menu,
                    qty: 1,
                    totalMenuAmt: 1 * menu.price,
                    menuDiscountedAmt: menuDiscountedAmt,
                    totalMenuDiscountedAmt: totalMenuDiscountedAmt,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* left side */}

      {/* right side */}

      <Form {...form}>
        <form className="space-y-8 basis-1/3">
          <div className=" flex flex-col gap-6 p-6">
            <div id="order_info" className="">
              <h6>Order List</h6>
              <h6>Order Id : 1</h6>
            </div>

            <div id="cus_info" className="">
              <h6 className="py-4">Customer Information</h6>
              <div className="flex items-center justify-between gap-4">
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Walkin">
                            Walkin Customer
                          </SelectItem>
                          <SelectItem value="Wai">Wai Min</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" variant={"primary"}>
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
                  orderedMenus?.map((menu) => (
                    <PosAddedProductComponent
                      key={menu?.menu._id}
                      menu={menu}
                      orderedMenus={orderedMenus}
                      setOrderedMenus={setOrderedMenus}
                    />
                  ))
                }
                
                <ScrollBar className="" />
              </ScrollArea>
            </div>

            <div
              id="tax_discount"
              className="flex items-center justify-between gap-4"
            >
              

              <FormField
                control={form.control}
                name="billDiscount"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value)=> field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'0'}>0</SelectItem>
                        <SelectItem value={'5'}>5</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billTax"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={(value)=> field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value={'0'}>0</SelectItem>
                      <SelectItem value={'5'}>5</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div id="product_detail_info" className="">
              <div className="flex items-start justify-start flex-col gap-4">
                <div className="flex items-center justify-between w-full">
                  <h6>Product Amount :</h6>
                  <strong className="">{allProductAmount} ks</strong>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h6>Total Quantity :</h6>
                  <strong>{totalQty}</strong>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h6>Tax :</h6>
                  <strong>0</strong>
                </div>

                <div className="flex items-center justify-between w-full">
                  <h6>Discount :</h6>
                  <strong>{totalDiscountedAmount}</strong>
                </div>

                <div className="flex items-center justify-between w-full mt-6">
                  <h6>Total :</h6>
                  <strong>{totalPaymentAmount} ks</strong>
                </div>
              </div>
            </div>

            <div id="payment_info" className="">
              <h6>Payment Methods</h6>

              <div className="mt-4">
                <Button type="button" variant={"outline"}>
                  Cash
                </Button>
              </div>
            </div>

            <div id="payment_btn" className="">
              <Button
                type="button"
                variant={"secondary"}
                className="mt-6 w-full"
              >
                Grand Total:{" "}
                <span>{allTotalAmount - totalDiscountedAmount} </span>ks{" "}
              </Button>

              <div className="mt-6 flex items-center justify-start gap-4">
                <Button
                onClick={() => handleConfirmedOrder()}
                 type="button" variant={"primary"} className="basis-1/2">
                  Comfirm Order
                </Button>
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  variant={"secondary"}
                  className="basis-1/2"
                >
                  Payment
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {/* right side */}
    </div>
  );
};

export default ChooseProduct;
