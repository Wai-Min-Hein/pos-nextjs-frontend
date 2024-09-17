import { fnbInterface, priceTableInterface } from "@/types"
import { useQuery } from "@tanstack/react-query"

const baseApi = process.env.NEXT_PUBLIC_BASE_API


async function getAllFnb ():Promise<fnbInterface[]>{
    try {
        const res = await fetch(`${baseApi}/fnb`)
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

async function getAllPriceTable ():Promise<priceTableInterface[]>{
    try {
        const res = await fetch(`${baseApi}/pricetable`)
        const result = await res.json()
        return result.datas
    } catch (error) {
        throw error
        
    }
}

export const useGetAllPriceTable = () => {
    return useQuery({
        queryKey: ['fnb'],
        queryFn: () => getAllPriceTable()
    })
}