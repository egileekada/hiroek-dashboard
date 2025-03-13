import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../../utils/httpService";  
import Cookies from "js-cookie"


const useGetRevenue = () => {

    const userId = Cookies.get("user-index")

    // const query = useQueryClient()  


    const getWithdrawalData = () => {
        const [data, setData] = useState<Array<any>>([])
        const { isLoading } = useQuery(
            ["withdrawal-logs"],
            () => httpService.get(`/organizations/withdrawal-logs/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.logs?.data); 
                },
            },
        );
        return {
            data,
            isLoading
        }
    }

    const getDonationData = () => {
        const [data, setData] = useState<Array<any>>([])
        const { isLoading } = useQuery(
            ["all-donation"],
            () => httpService.get(`/organizations/indirect-donation-history/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {  
                    setData(data?.data?.donations?.data); 
                },
            },
        );
        return {
            data,
            isLoading
        }
    }

    return {
        getWithdrawalData,
        getDonationData,  
    };
}

export default useGetRevenue