
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";

export interface ICategories {
    "subcategories": Array<{
        "_id": string,
        "name": string,
        "image":string,
        "createdAt": string,
        "updatedAt": string,
        "__v": number
    }>,
    "_id": string,
    "name": string,
    "image": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

const useCategory = () => {

    // const router = useNavigate();  

    const [data, setData] = useState<Array<ICategories>>([])

    // react query
    const { isLoading } = useQuery(
        ["categories"],
        () => httpService.get(`/core/categories`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.categories?.data)  
            },
        },
    );


    return {
        isLoading,
        data
    };
}

export default useCategory