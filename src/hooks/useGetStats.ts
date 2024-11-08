
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import { useDetails } from "../global-state/useUserDetails";
import Cookies from "js-cookie"
import { IStats } from "../model/stats";

const useGetStats = () => {

    const [data, setData] = useState({} as IStats)

    const { userId } = useDetails((state) => state);


    let id = Cookies.get("user-index")

    // react query
    const { isLoading } = useQuery(
        ["Stat"],
        () => httpService.get(`/organizations/stats/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => {
                console.log(data?.data?.stats);
                
                setData(data?.data?.stats)
            },
            enabled: userId ? false : true
        },
    );

    return {
        isLoading,
        data
    };
}

export default useGetStats