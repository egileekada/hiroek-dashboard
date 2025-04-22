
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react"; 
import Cookies from "js-cookie" 
import { ICommunity } from "../../model/community";
import { useSearchStore } from "../../global-state/useSearchText";

const useGetCommunity = () => {
 
        const [data, setData] = useState<Array<ICommunity>>() 
        const userId = Cookies.get("user-index")

        const { search } = useSearchStore((state)=> state)

        // react query
        const { isLoading, isRefetching } = useQuery(
            ["hosted-communities", search],
            () => httpService.get(`/communities/all-communities?userId=${userId}`, {
                params: {
                    searchQuery: search
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    // console.log(error);
                },
                onSuccess: (data: any) => { 
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