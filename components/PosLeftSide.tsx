import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import PosCategoryCardComponent from "@/components/PosCategoryCardComponent";
import PosProductCardComponent from "@/components/PosProductCardComponent";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

const PosLeftSide = () => {
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
  return (
    <div className="basis-2/3">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="my-6">
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
      <div className="">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          setApi={setApi}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/5 w-full">
                <PosCategoryCardComponent />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-6">
        <h1 className="mb-6">Menus</h1>

        <div className="flex items-center justify-start gap-8 flex-wrap">
          <PosProductCardComponent />
          <PosProductCardComponent />
          <PosProductCardComponent />
          <PosProductCardComponent />
          <PosProductCardComponent />
          <PosProductCardComponent />
        </div>
      </div>
    </div>
  );
};

export default PosLeftSide;
