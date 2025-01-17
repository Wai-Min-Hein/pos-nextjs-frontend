"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuList } from "@/constant/sideNav";
import { useGetUserPermission } from "@/utils/TanStackHooks/useSystem";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";


// Define types for menu items
interface ListItem {
  name: string;
  href?: string;
  icon: string;
}

interface Menu {
  id: string;
  name: string;
  lists: ListItem[];
}

const SideNav = () => {
  const router = useRouter();
  const pathName = usePathname();

  const {data: permissions, error} = useGetUserPermission()


  const allowModules = permissions?.map(permission => permission?.module)





  // Set open item based on pathname
  const toOpenItem = menuList.filter((list) => pathName.includes(list.id));

  const [openItem, setOpenItem] = useState<string>(
    toOpenItem.length > 0 ? toOpenItem[0].id : menuList[0]?.id || ""
  );

  // Re-render when pathName changes
  useEffect(() => {
    if (toOpenItem.length > 0) {
      setOpenItem(toOpenItem[0].id);
    }
  }, [pathName]);

  return (
    <nav className="basis-1/5 flex items-between justify-start flex-col overflow-y-auto overflow-x-hidden sideNav-scrollbar sticky top-[64px]">
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
      >
        {menuList.map((menu) => (
          <AccordionItem key={menu.id} value={menu.id}>
            <AccordionTrigger>{menu.name}</AccordionTrigger>

            {menu.lists.map((list) =>{
              if( list?.module && allowModules?.includes(list?.module)){
                return (
                  <AccordionContent key={list.name}>
                <div
                  onClick={() => router.push(list.href || "/")}
                  className={`flex items-center justify-start gap-2 cursor-pointer py-3 ${
                    list.href && pathName.includes(list.href)
                      ? "bg-transparentBgGreen"
                      : ""
                  }`}
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={list.icon}
                      fill
                      sizes="24px" 
                      style={{ objectFit: "cover" }}
                      alt="Icon"
                    />
                  </div>
                  <h4 className="font-roboto select-none">{list.name}</h4>
                </div>
              </AccordionContent>
                )
              }
            }
              
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
};

export default SideNav;