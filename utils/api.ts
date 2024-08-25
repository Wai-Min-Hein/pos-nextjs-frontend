export const getAllFnbDatas = async () => {
    const response = await fetch('https://pos-t6g7.onrender.com/fnb');
    if(!response.ok){
        throw new Error('Cannot get fnb datas')
    }

    const result =await response.json()
    return result.datas
}