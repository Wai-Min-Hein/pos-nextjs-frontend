import axiosInstance from "@/lib/axiosInstance";
import {
  menuCategoryInterface,
  fnbInterface,
  priceTableInterface,
  priceTableMenuInterface,
  posBillInterface,
  posBillReportInterface,
  permissionInterface,
  userRoleInterface,
  productInterface,
} from "@/types";
import { useQuery } from "@tanstack/react-query";


const baseApi = process.env.NEXT_PUBLIC_BASE_API;


async function getUserPermission(): Promise<userRoleInterface> {

  try {
    const res = await axiosInstance.get('/permissionsroles/user', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const result = res.data
    return result;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
}



export const useGetUserPermission = () => {
  return useQuery({
    queryKey: ["user_permission"],
    queryFn: () => getUserPermission(),
  });
};


async function getAllFnb(): Promise<fnbInterface[]> {
  try {
    const res = await axiosInstance.get('/fnb', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data.datas; // Assuming `datas` contains the desired array
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
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
    if(result.statusCode == 403){
      console.log(result.statusCode)
      window.location.href = '/invalid';
    }
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



async function getAllProduct(): Promise<productInterface[]> {
  try {
    const res = await axiosInstance.get('/product', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.data.datas; // Assuming `datas` contains the desired array
  } catch (error: any) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    throw new Error(message);
  }
}

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProduct(),
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
