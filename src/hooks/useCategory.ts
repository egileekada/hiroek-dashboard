
import {  useQuery } from "react-query"; 
import toast from "react-hot-toast"; 
import httpService from "../utils/httpService"; 
import { useState } from "react"; 

const useCategory = () => {

    // const router = useNavigate();  

    const [data, setData] = useState<Array<string>>([]) 

    // react query
    const { isLoading } = useQuery(
        ["categories"],
        () => httpService.get(`/events/categories`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {  
                setData(data?.data?.categories)  
            }, 
        },
    );
    

    return { 
        isLoading,
        data
    };
}

export default useCategory