
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react"; 
import Cookies from "js-cookie"
import { IStats } from "../model/stats";

const useGetStats = () => {

    const [data, setData] = useState({} as IStats) 
    let id = Cookies.get("user-index")

    // react query
    const { isLoading } = useQuery(
        ["Stat"],
        () => httpService.get(`/organizations/stats/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data) 
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.stats)
            }
        },
    );

    return {
        isLoading,
        data
    };
}

export default useGetStats