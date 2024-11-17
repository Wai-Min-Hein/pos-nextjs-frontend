import { toast } from "@/hooks/use-toast";
import { menuInterface } from "@/types";
import { useGetAllFnb, useGetAllPriceTable } from "@/utils/TanStackHooks/useSystem";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Save } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";

interface props {
    detailInfo: boolean,
    priceTableMenus: menuInterface[],
    setPriceTableMenus: React.Dispatch<React.SetStateAction<menuInterface[]>>;
}
const ProductDetailInfo = ({detailInfo,priceTableMenus,setPriceTableMenus}:props) => {
 
  const {
    data: fnbDatas,
    isLoading: isFnbLoading,
    isError: isFnbError,
  } = useGetAllFnb();

  
  const { data: priceTableDatas, isLoading, isError } = useGetAllPriceTable();

  const [currentMenu, setCurrentMenu] = useState<menuInterface>({
    menu: "",
    price: 0,
    vat: 0,
    disPercent: 0,
    disAmount: 0,
    adjust: false,
  });

  // On row save
  const onMenuSave = (currentMenu: menuInterface) => {
    // Validate price and menu selection
    if (currentMenu.price <= 0) {
      toast({
        description: "Price must be greater than 0",
      });
      return; // Exit early if validation fails
    }

    if (!currentMenu.menu) {
      toast({
        description: "Menu must be chosen",
      });
      return; // Exit early if menuId is not selected
    }

    // Check if the menu already exists
    const menuIndex = priceTableMenus.findIndex(
      (menu) => menu.menu === currentMenu.menu
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
      setPriceTableMenus((prevMenus) => [currentMenu,...prevMenus]);
    }

    // Reset the current menu
    setCurrentMenu({
      menu: "",
      price: 0,
      vat: 0,
      disPercent: 0,
      disAmount: 0,
      adjust: false,
    });
  };

  const onMenuDelete = (currentMenu: menuInterface) => {
    setCurrentMenu({
      menu: "",
      price: 0,
      vat: 0,
      disPercent: 0,
      disAmount: 0,
      adjust: false,
    });

    const filterUndeletedMenus = priceTableMenus.filter(tableMenu => tableMenu.menu != currentMenu.menu)

    setPriceTableMenus(filterUndeletedMenus);
  };
  return <div
  id="detailInfo"
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
              value={currentMenu.menu || ""}
              onValueChange={(e) =>
                setCurrentMenu({ ...currentMenu, menu: e })
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
                      value={fnb?._id || ''}
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
                onClick={() => onMenuDelete(currentMenu)}
                className="w-8 h-8 grid place-items-center rounded border-2 border-gray cursor-pointer"
              >
                <MdDeleteOutline size={20} />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody className="mt-8">
        {priceTableMenus?.map((menu) => {
          const currentMenu = fnbDatas?.find(
            (fnb) => fnb._id == menu.menu
          );
          return (
            <TableRow key={menu.menu}>
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
};

export default ProductDetailInfo;
