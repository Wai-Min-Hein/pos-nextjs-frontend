"use client";

import { Button } from "@/components/ui/button";
import { useGetAllCsa } from "@/utils/TanStackHooks/usePos";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";

const Pos = () => {
  const { isPending, isError, data: areas, error, isLoading } = useGetAllCsa();

  const [currentTable, setCurrentTable] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    areas && setCurrentTable(areas[0]?.name);
  }, [areas]);

  if (isLoading) {
    return <div className="">Loading.....</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <Button>
          <MdOutlineShoppingCart size={24} />
          <span>View Orders</span>
        </Button>

        <Button variant={"secondary"}>
          <SlRefresh size={24} />

          <span>Transcations</span>
        </Button>
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
          onClick={() => currentTable && router.push(`pos/${currentTable}/1`)}
          variant={"addNew"}
        >
          Add New
        </Button>
      </div>
    </div>
  );
};

export default Pos;
