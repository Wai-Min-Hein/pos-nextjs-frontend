import { customerServiceAreaInterface } from "@/types";
import { useQuery } from "@tanstack/react-query"

async function getAllCsa():Promise<customerServiceAreaInterface[]> {
    try {
        const res = await fetch("https://pos-t6g7.onrender.com/csa");
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