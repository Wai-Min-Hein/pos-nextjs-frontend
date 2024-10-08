import { customerServiceAreaInterface, productCategoryInterface, productInterface } from "@/types";
import { useQuery } from "@tanstack/react-query"

const baseApi = process.env.NEXT_PUBLIC_BASE_API


async function getAllCsa():Promise<customerServiceAreaInterface[]> {
    try {
        const res = await fetch( `${baseApi}/csa`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result =  await res.json(); // Return the fetched data
        return result.datas
    }catch (error) {
        throw error
        
    }
}

export const useGetAllCsa = () => {
    return useQuery({
        queryKey: ["csa"],
        queryFn: () => getAllCsa(),
        staleTime: 5 * 60 * 1000,
        
    })
}


async function getAllBranch():Promise<customerServiceAreaInterface[]> {
    try {
        const res = await fetch( `${baseApi}/branch`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result =  await res.json(); // Return the fetched data
        return result.datas
    }catch (error) {
        throw error
        
    }
}

export const useGetAllBranch = () => {
    return useQuery({
        queryKey: ["branch"],
        queryFn: () => getAllBranch(),
        staleTime: 5 * 60 * 1000,
        
    })
}


async function getAllCategory():Promise<productCategoryInterface[]> {
    try {
        const res = await fetch( `${baseApi}/productcategory`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result =  await res.json(); // Return the fetched data
        return result.datas
    }catch (error) {
        throw error
        
    }
}

export const useGetAllCategory = () => {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategory(),
        staleTime: 5 * 60 * 1000,
        
    })
}


async function getAllProducts():Promise<productInterface[]> {
    try {
        const res = await fetch( `${baseApi}/product`);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result =  await res.json(); // Return the fetched data
        return result.datas
    }catch (error) {
        throw error
        
    }
}

export const useGetAllProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: () => getAllProducts(),
        staleTime: 5 * 60 * 1000,
        
    })
}

async function getProductsByCategory(categoryId: string):Promise<productInterface[]> {
    const url = categoryId && categoryId !== 'All' 
                ? `${baseApi}/product/${categoryId}` 
                : `${baseApi}/product`;

    try {
        const res = await fetch( url);
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        const result =  await res.json(); // Return the fetched data
        return result.datas 
    }catch (error) {
        throw error
        
    }
}

export const useGetProductsByCategory = (categoryId:string) => {
    return useQuery({
        queryKey: ["products",categoryId],
        queryFn: () => getProductsByCategory(categoryId),
        staleTime: 5 * 60 * 1000,
        
    })
}

