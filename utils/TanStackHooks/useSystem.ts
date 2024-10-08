import { fnbInterface, priceTableInterface, priceTableMenuInterface } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

async function getAllFnb(): Promise<fnbInterface[]> {
  try {
    const res = await fetch(`${baseApi}/fnb`);
    const result = await res.json();
    return result.datas;
  } catch (error) {
    throw error;
  }
}

export const useGetAllFnb = () => {
  return useQuery({
    queryKey: ["fnb"],
    queryFn: () => getAllFnb(),
  });
};



async function getAllPriceTable(): Promise<priceTableInterface[]> {
  try {
    const res = await fetch(`${baseApi}/pricetable`);
    const result = await res.json();
    return result.datas;
  } catch (error) {
    throw error;
  }
}

export const useGetAllPriceTable = () => {
  
  return useQuery({
    queryKey: ["pricetable"],
    queryFn: () => getAllPriceTable(),
  });
};

async function getSinglePriceTable(id:string): Promise<priceTableInterface> {
  try {
    const res = await fetch(`${baseApi}/pricetable/${id}`);
    const result = await res.json();
    return result.datas;
  } catch (error) {
    throw error;
  }
}

export const useGetSinglePriceTable = (id:string) => {
  return useQuery({
    queryKey: ["singlepricetable", id],
    queryFn: () => getSinglePriceTable(id),
  });
};




