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

  const { data, error } = useGetUserPermission();
  const permissions = data?.permissions;
  const roleName = data?.roleName;

  const allowModules = permissions?.map((permission) => permission.module);

  const filteredMenuList =
    roleName == "admin"
      ? menuList
      : menuList.filter((menu) =>
          menu.lists.some(
            (list) => list.module && allowModules?.includes(list.module)
          )
        );

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
        {filteredMenuList.map((menu) => (
          <AccordionItem key={menu.id} value={menu.id}>
            <AccordionTrigger>{menu.name}</AccordionTrigger>

            {menu.lists.map((list) => {
              const isAdmin = roleName === "admin";
              const isActive = list.href && pathName.includes(list.href);

              // Always render for admin, check permissions for others
              if (!isAdmin) {
                const hasModuleAccess =
                  list?.module && allowModules?.includes(list.module);
                if (!hasModuleAccess) return null;
              }

              return (
                <AccordionContent key={`${menu.id}-${list.name}`}>
                  <div
                    onClick={() => router.push(list.href || "/")}
                    role="button"
                    tabIndex={0}
                    className={`flex items-center justify-start gap-2 cursor-pointer py-3 ${
                      isActive ? "bg-transparentBgGreen" : ""
                    }`}
                  >
                    <div className="relative w-6 h-6">
                      <Image
                        src={list.icon}
                        fill
                        sizes="24px"
                        style={{ objectFit: "cover" }}
                        alt={`${list.name} icon`}
                        aria-hidden="true"
                      />
                    </div>
                    <h4 className="font-roboto select-none">{list.name}</h4>
                  </div>
                </AccordionContent>
              );
            })}
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
};

export default SideNav;
