
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import { useDetails } from "../global-state/useUserDetails";

const useDonation = () => {

    const directData = () => {
        const [data, setData] = useState<Array<any>>()

        const { userId } = useDetails((state) => state);

        // react query
        const { isLoading } = useQuery(
            ["Direct-Donation"],
            () => httpService.get(`/organizations/direct-donation-history/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    console.log(error);
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.donations?.data)
                }
            },
        );

        return {
            isLoading,
            data
        }
    }


    const inDirectData = () => {
        const [data, setData] = useState<Array<any>>()

        const { userId } = useDetails((state) => state);

        // react query
        const { isLoading } = useQuery(
            ["inDirect-Donation"],
            () => httpService.get(`/organizations/indirect-donation-history/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    console.log(error);
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.donations?.data)
                }
            },
        );

        return {
            isLoading,
            data
        }
    }

    return {
        inDirectData,
        directData
    };
}

export default useDonation