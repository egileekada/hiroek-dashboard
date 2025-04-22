
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import Cookies from "js-cookie"
import httpService from "../utils/httpService";

const useGetGraphData = () => {

    const userId = Cookies.get("user-index")
    // Get Event list
    const getDonationData = () => {

        const [data, setData] = useState<Array<{ month: string, amount: number, count: number }>>()

        // react query
        const { isLoading, isRefetching } = useQuery(
            ["graphdonation"],
            () => httpService.get(`/organizations/donation-monthly-stats/${userId}`),
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
            isRefetching,
            data
        };
    }
    
    // Get Event list
    const getTicketData = () => {

        const [data, setData] = useState<Array<{ month: string, amount: number, count: number }>>() 

        // react query
        const { isLoading, isRefetching } = useQuery(
            ["graphticket"],
            () => httpService.get(`/organizations/ticket-sales-monthly-stats/${userId}`),
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
            isRefetching,
            data
        };
    }


    return {
        getDonationData,
        getTicketData
    };

}

export default useGetGraphData