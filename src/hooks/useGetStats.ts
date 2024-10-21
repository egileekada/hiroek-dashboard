
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import { useDetails } from "../global-state/useUserDetails";

const useGetStats = () => {
 
        const [data, setData] = useState<Array<any>>()

        const { userId } = useDetails((state) => state);

        // react query
        const { isLoading } = useQuery(
            ["Stat"],
            () => httpService.get(`/organizations/stats/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    // console.log(error);
                },
                onSuccess: (data: any) => {
                    console.log(data);
                    
                    setData([])
                }
            },
        ); 

    return {
        isLoading,
        data
    };
}

export default useGetStats