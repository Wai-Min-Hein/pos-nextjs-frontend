"use client";
import React from "react";
import { HiOutlinePrinter } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye, LuMoveLeft, LuSave } from "react-icons/lu";
import { details } from "@/constant/icon";
import { excel } from "@/constant/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import {
  useGetAllFnb,
  useGetAllPriceTable,
} from "@/utils/TanStackHooks/useSystem";
import Image from "next/image";
import { CiImport } from "react-icons/ci";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { priceTableMenuInterface } from "@/types";

import { toast, useToast } from "@/hooks/use-toast";

const PriceTableDetails = () => {
  const { toast } = useToast();

  const [date, setDate] = React.useState<Date>();
  const [date2, setDate2] = React.useState<Date>();
  const [applyPolicy, setApplyPolicy] = useState(true);
  const [detailInfo, setDetailInfo] = useState(false);

  const {
    data: fnbDatas,
    isLoading: isFnbLoading,
    isError: isFnbError,
  } = useGetAllFnb();
  const { data: priceTableDatas, isLoading, isError } = useGetAllPriceTable();

  const [currentMenu, setCurrentMenu] = useState<priceTableMenuInterface>({
    menuId: "",
    price: 0,
    vat: 0,
    disPercent: 0,
    disAmount: 0,
    adjust: false,
  });

  const [priceTableMenus, setPriceTableMenus] = useState<
    priceTableMenuInterface[]
  >([]);

  const onMenuSave = (currentMenu: priceTableMenuInterface) => {
    // Validate price and menu selection
    if (currentMenu.price <= 0) {
      toast({
        description: "Price must be greater than 0",
      });
      return; // Exit early if validation fails
    }

    if (!currentMenu.menuId) {
      toast({
        description: "Menu must be chosen",
      });
      return; // Exit early if menuId is not selected
    }

    // Check if the menu already exists
    const menuIndex = priceTableMenus.findIndex(
      (menu) => menu.menuId === currentMenu.menuId
    );

    if (menuIndex !== -1) {
      // Show a toast if the menu already exists and update it
      toast({
        description:
          "Menu already exists and has been replaced with the new one.",
      });

      // Update the existing menu
      setPriceTableMenus((prevMenus) => {
        const updatedMenus = [...prevMenus];
        updatedMenus[menuIndex] = currentMenu; // Replace the old menu with the new one
        return updatedMenus;
      });
    } else {
      // Add the new menu to the list
      setPriceTableMenus((prevMenus) => [...prevMenus, currentMenu]);
    }

    // Reset the current menu
    setCurrentMenu({
      menuId: "",
      price: 0,
      vat: 0,
      disPercent: 0,
      disAmount: 0,
      adjust: false,
    });
  };

  const onMenuDelete = () => {
    setCurrentMenu({
      menuId: "",
      price: 0,
      vat: 0,
      disPercent: 0,
      disAmount: 0,
      adjust: false,
    });
  };

  return (
    <div className="w-full px-8">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-start gap-2">
          <div className="relative w-8 h-8">
            <Image alt="info ong" objectFit="cover" fill src={details} />
          </div>
          <h6>Details Informations</h6>
        </div>

        <div className="flex items-center justify-start gap-2">
          <div className="relative cursor-pointer w-6 h-6">
            <Image
              src={excel}
              alt="Excel icon"
              fill
              sizes="24px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <HiOutlinePrinter className="cursor-pointer" size={24} />
          <Button variant={"primary"}>
            <IoMdAddCircleOutline size={18} />
            <span>Add New</span>
          </Button>
          <Button variant={"secondary"}>
            <CiImport size={18} />
            <span>Import Product</span>
          </Button>
        </div>
      </div>

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

      <div
        id="policy"
        className={`bg-gray mt-8 rounded-md py-2 px-6 ${
          applyPolicy ? "block" : "hidden"
        }`}
      >
        <div className="">
          <h6 className="mb-6">Price Table Informations</h6>
          <div className="flex items-center justify-start gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Price table code</Label>
              <Input
                className="border-b border-b-btnDark"
                id="code"
                type="text"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Price table Name</Label>
              <Input
                className="border-b border-b-btnDark"
                id="code"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h6 className="mb-6">Apply at</h6>
          <div className="flex items-center justify-start gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Price table code</Label>
              <Select value={currentMenu.menuId}>
                <SelectTrigger className="bg-transparent border-b border-b-btnDark rounded-none">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Price table Name</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-b border-b-btnDark rounded-none">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h6 className="mb-6">Time of Application</h6>
          <div className="flex items-center justify-start gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Effective time from</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"underLine"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="code">Effective time to</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"underLine"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date2 && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date2 ? format(date2, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date2}
                    onSelect={setDate2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div
        id="policy"
        className={`bg-gray mt-8 rounded-md py-2 px-6 ${
          detailInfo ? "block" : "hidden"
        }`}
      >
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>VAT</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Discount Amount</TableHead>
                <TableHead className="">Allow to adjust</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium p-0">
                  <Select
                    value={currentMenu.menuId || ""}
                    onValueChange={(e) =>
                      setCurrentMenu({ ...currentMenu, menuId: e })
                    }
                  >
                    <SelectTrigger className="bg-transparent  rounded-none">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Name</SelectLabel>
                        {fnbDatas?.map((fnb) => (
                          <SelectItem
                            key={fnb?._id}
                            value={fnb?._id}
                          >{`${fnb?.sku} - ${fnb?.name}`}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="font-medium p-0">
                  <Input
                    value={currentMenu.price === 0 ? "" : currentMenu.price}
                    onChange={(e) =>
                      setCurrentMenu({
                        ...currentMenu,
                        price: Number(e.target.value),
                      })
                    }
                    type="number"
                    placeholder="Price"
                  />
                </TableCell>
                <TableCell className="font-medium p-0">
                  <Input
                    value={currentMenu.vat === 0 ? "" : currentMenu.vat}
                    onChange={(e) =>
                      setCurrentMenu({
                        ...currentMenu,
                        vat: Number(e.target.value),
                      })
                    }
                    type="number"
                    placeholder="VAT"
                  />
                </TableCell>
                <TableCell className="font-medium p-0">
                  <Input
                    value={
                      currentMenu.disPercent === 0 ? "" : currentMenu.disPercent
                    }
                    onChange={(e) =>
                      setCurrentMenu({
                        ...currentMenu,
                        disPercent: Number(e.target.value),
                      })
                    }
                    type="number"
                    placeholder="Discount %"
                  />
                </TableCell>
                <TableCell className="font-medium p-0">
                  <Input
                    value={
                      currentMenu.disAmount === 0 ? "" : currentMenu.disAmount
                    }
                    onChange={(e) =>
                      setCurrentMenu({
                        ...currentMenu,
                        disAmount: Number(e.target.value),
                      })
                    }
                    type="number"
                    placeholder="Discount Amount"
                  />
                </TableCell>
                <TableCell className="font-medium p-0 min-w-40">
                  <Switch
                    checked={currentMenu.adjust}
                    onCheckedChange={(e) =>
                      setCurrentMenu({ ...currentMenu, adjust: e })
                    }
                    className="bg-white border-gray shadow-xl "
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center justify-center gap-x-2">
                    <div
                      onClick={() => onMenuSave(currentMenu)}
                      className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer"
                    >
                      <Save size={20} />
                    </div>

                    <div
                      onClick={onMenuDelete}
                      className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer"
                    >
                      <MdDeleteOutline size={20} />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>

            <TableBody className="mt-8">
              {priceTableMenus.map((menu) => {
                const currentMenu = fnbDatas?.find(
                  (fnb) => fnb._id == menu.menuId
                );
                return (
                  <TableRow key={menu.menuId}>
                    <TableCell
                      onClick={() => setCurrentMenu(menu)}
                      className="font-medium px-3 py-2 cursor-pointer"
                    >{`${currentMenu?.sku} - ${currentMenu?.name}`}</TableCell>
                    <TableCell className="font-medium px-3 py-2">
                      {menu.price}
                    </TableCell>
                    <TableCell className="font-medium px-3 py-2">
                      {menu.vat}
                    </TableCell>
                    <TableCell className="font-medium px-3 py-2">
                      {menu.disPercent}
                    </TableCell>
                    <TableCell className="font-medium px-3 py-2">
                      {menu.disAmount}
                    </TableCell>
                    <TableCell className="font-medium px-0 py-2 min-w-40">
                      <Switch
                        checked={menu.adjust}
                        className="bg-white border-gray shadow-xl "
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PriceTableDetails;
