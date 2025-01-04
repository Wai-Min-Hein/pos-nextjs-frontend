"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import { BiLogOutCircle } from "react-icons/bi";

const TobBar = () => {
  return (
    <nav className="flex items-center justify-start py-2 gap-6 sticky top-0 bg-white z-[100]">
      <div className="basis-1/5 ">
        <Link href={"/system/fnb"}>
          <div className="relative w-24 h-12">
            <Image
              src={"/images/logo.png"}
              alt="Ali pos Logo"
              priority
              fill
              sizes="96px" // Adjust based on your actual image container size
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4">
        <Input type="text" placeholder="Search" className="w-1/3" />
      </div>
      <div className="">
        <Select>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center justify-start gap-2">

            <div className="relative w-8 h-8 rounded-full">
              <Image alt="Branch Image" src={'/images/branch-img.png'} fill sizes="32px" objectFit="cover" className="rounded-full"/>
            </div>
            <SelectValue placeholder="Select Branch" />
            </div>
          </SelectTrigger>
          <SelectContent className="cursor-pointer">
            <SelectItem className="cursor-pointer" value="light">Coffee</SelectItem>
            <SelectItem className="cursor-pointer" value="dark">Restaurant</SelectItem>
            <SelectItem className="cursor-pointer" value="system">Bar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <div className="flex items-center justify-start gap-2">
              <div className="relative w-8 h-8 rounded border border-tableBorder">
                <Image alt="Profie image" src={'/images/profile.png'} sizes="32px" className=" rounded" fill objectFit="cover"/>
              </div>

              <div className="">
                <h6 className="text-sm">Wai Min</h6>
                <span className="text-sm">Admin</span>
              </div>
              <ChevronDown className="h-4 w-4 " />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
            <div className="flex items-center justify-start gap-2">
              <div className="relative w-8 h-8 rounded border border-tableBorder">
                <Image alt="Profie image" src={'/images/profile.png'} sizes="32px" className=" rounded" fill objectFit="cover"/>
              </div>

              <div className="flex-1">
                <h6 className="text-sm">Wai Min</h6>
                <span className="text-sm">Admin</span>
              </div>
            </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center justify-start gap-2">
              <CgProfile size={24}/>

              <span>Profile</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center justify-start gap-2">
              <BiLogOutCircle size={18}/>

              <span>Logout</span>
              </div>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default TobBar;
