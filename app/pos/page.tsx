import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlRefresh } from "react-icons/sl";

const Pos = () => {
  return (
    <div>
      <div className="flex items-center justify-start gap-4">
        <Button>
          <MdOutlineShoppingCart size={24} />
          <span>View Orders</span>
        </Button>

        <Button variant={'secondary'}>
        <SlRefresh size={24} />

          <span>Transcations</span>
        </Button>
      </div>
    </div>
  );
};

export default Pos;
