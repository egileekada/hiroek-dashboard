
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react"; 
import Cookies from "js-cookie" 
import { ICommunity } from "../model/community";

const useGetCommunity = () => {
 
        const [data, setData] = useState<Array<ICommunity>>() 
        const userId = Cookies.get("user-index")

        // react query
        const { isLoading, isRefetching } = useQuery(
            ["hosted-communities"],
            () => httpService.get(`/communities/all-communities?userId=${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    // console.log(error);
                },
                onSuccess: (data: any) => {
                    console.log(data?.data?.communities?.data);
                    setData(data?.data?.communities?.data) 
                }
            },
        ); 

    return {
        isLoading,
        isRefetching,
        data
    };
}

export default useGetCommunity