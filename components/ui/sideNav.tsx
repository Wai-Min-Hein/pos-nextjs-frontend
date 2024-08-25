"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuList } from "@/constant/sideNav";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SideNav = () => {
  const router = useRouter();
  const pathName = usePathname();

  // Filter the menu list to find the item whose 'id' matches the current pathname
  const toOpenItem = menuList.filter((list) => pathName.includes(list.id));

  // Set the default open item based on the current route.
  // If the route matches a menu item's 'id', open that item by default.
  // Otherwise, open the first item in the menu list.
  const [openItem, setOpenItem] = useState(
    toOpenItem.length > 0 ? toOpenItem[0].id : menuList[0]?.id
  );


  return (
    <nav className="basis-1/5 flex items-between justify-start flex-col max-h-[90vh] overflow-y-auto overflow-x-hidden sideNav-scrollbar ">
      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
      >
        {menuList.map((menuList) => (
          <AccordionItem key={menuList.id} value={menuList.id}>
            <AccordionTrigger>{menuList.name}</AccordionTrigger>

            {menuList.lists.map((list) => (
              <AccordionContent
                onClick={() => router.push(list.href ? list.href : "/")}
                className=""
                key={list.name}
              >
                <div
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
                      sizes="24px" // Adjust based on your actual image container size
                      style={{ objectFit: "cover" }}
                      alt="Icon"
                    />
                  </div>
                  <h4 className="font-roboto">{list.name}</h4>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
};

export default SideNav;
