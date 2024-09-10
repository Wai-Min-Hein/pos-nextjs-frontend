import { fnbInterface } from "@/types"
import { useQuery } from "@tanstack/react-query"

async function getAllFnb ():Promise<fnbInterface[]>{
    try {
        const res = await fetch("https://pos-t6g7.onrender.com/fnb")
        const result = await res.json()
        return result.datas
    } catch (error) {
        throw error
        
    }
}

export const useGetAllFnb = () => {
    return useQuery({
        queryKey: ['fnb'],
        queryFn: () => getAllFnb()
    })
}