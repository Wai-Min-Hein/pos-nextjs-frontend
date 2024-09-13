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
import {
  useGetAllCategory,
  useGetAllProducts,
  useGetProductsByCategory,
} from "@/utils/TanStackHooks/usePos";

const PosLeftSide = () => {
  const [currentCategory, setCurrentCategory] = useState<string>("All");

  const { data: categories, isLoading: isCategoryLoading } =
    useGetAllCategory();
  // Fetch products based on the currentCategory
  const { data: products, isLoading: isProductLoading } =useGetProductsByCategory( currentCategory );
  

  const allProductCount = categories?.reduce(
    (pv, cv) => cv?.productCount + pv,
    0
  );

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
                  count={allProductCount ? allProductCount : 0}
                  isActive = {currentCategory == 'All'}
                />
              </CarouselItem>
              {categories?.map((category) => (
                <CarouselItem
                  onClick={() => setCurrentCategory(category._id)}
                  key={category?._id}
                  className="basis-1/5 w-full"
                >
                  {category?.status && (
                    <PosCategoryCardComponent
                      code={category?.code}
                      name={category?.name}
                      count={category?.productCount}
                      isActive = {currentCategory == category._id}
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}

      <div className="mt-6">
        <h1 className="mb-6">Menus</h1>

        <div className="flex items-center justify-start gap-8 flex-wrap">
          {products?.map((product) => (
            <PosProductCardComponent
              key={product?._id}
              sku={product?.sku}
              name={product?.name}
              unit={product?.unit}
              category={product?.category.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PosLeftSide;
