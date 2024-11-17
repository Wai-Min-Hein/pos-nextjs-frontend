import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
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
} from "./ui/carousel";
import {
  useGetAllCategory
} from "@/utils/TanStackHooks/usePos";
import { priceTableMenuInterface } from "@/types";

interface props{
  menus : priceTableMenuInterface[] | undefined
}
const PosLeftSide:React.FC<props> = ({menus}) => {
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const { data: allCategories, isLoading: isCategoryLoading } = useGetAllCategory();

 
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
                  isActive = {currentCategory == 'All'}
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
                          isActive = {currentCategory == category._id}
                        />
                      )}
                    </CarouselItem>
                  )
              }
              
              )}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      <div className="mt-6">
        <h1 className="mb-6">Menus</h1>

        <div className="flex items-center justify-start gap-8 flex-wrap">
          {menus?.map((menu) => (
            <PosMenuCardComponent
              key={menu?.menu?._id}
              menu={menu }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PosLeftSide;
