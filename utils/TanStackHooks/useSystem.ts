import {
  menuCategoryInterface,
  fnbInterface,
  priceTableInterface,
  priceTableMenuInterface,
  posBillInterface,
  posBillReportInterface,
} from "@/types";
import { useQuery } from "@tanstack/react-query";


const baseApi = process.env.NEXT_PUBLIC_BASE_API;


async function getAllFnb(): Promise<fnbInterface[]> {
  try {
    const res = await fetch(`${baseApi}/fnb`, {
      method: 'GET',
      credentials: 'include', // Include cookies in requests
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
    }

    
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

async function getAllMenuCategory(): Promise<menuCategoryInterface[]>{
  try {
    const res = await fetch(`${baseApi}/menucategory`)
    const result = await res.json()
    return result.datas
  } catch (error) {
    throw error
  }
}

export const useGetAllMenuCategory = () => {
  return useQuery({
    queryKey: ["menuCategory"],
    queryFn: () => getAllMenuCategory()
  })
}

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

async function getSinglePriceTable(id: string): Promise<priceTableInterface> {
  try {
    if (id != "new") {
      const res = await fetch(`${baseApi}/pricetable/${id}`);
      const result = await res.json();
      return result.datas;
    } else {
      const data = {
        _id: "",
        code: "",
        name: "",
        branch: {
          _id: "",
          code: "",
          name: "",
          phone: "",
          address: "",
        },
        area: {
          _id: "",
          code: "",
          name: "",
        },
        startDate: null,
        endDate: null,
        menus: [],
      };
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export const useGetSinglePriceTable = (id: string) => {
  return useQuery({
    queryKey: ["singlepricetable", id],
    queryFn: () => getSinglePriceTable(id),
  });
};

async function  getAllPosSaleReports(): Promise<posBillReportInterface[]> {
  try {
    const res = await fetch(`${baseApi}/posbill`)
    const result = await res.json()
    return result.datas
  } catch (error) {
    throw error
    
  }
}

export const useGetAllPosSaleReport = () => {
  return useQuery({
    queryKey: ["posbillreports"],
    queryFn: () => getAllPosSaleReports(),
  });
}
