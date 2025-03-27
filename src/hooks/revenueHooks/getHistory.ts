import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../../utils/httpService";
import Cookies from "js-cookie"
import { ITicketHistory } from "../../model/event";


const useGetRevenue = () => {

    const userId = Cookies.get("user-index")

    // const query = useQueryClient()  


    const getWithdrawalData = () => {
        const [data, setData] = useState<Array<{
            "amount": number,
            "_id": string,
            "organization": string,
            "bankName": string,
            "bankAccountNumber": string,
            "bankAccountName": string,
            "sortCode": string,
            "createdAt": string,
            "updatedAt": string
        }>>([])
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



    const getTicketSalesData = () => {
        const [data, setData] = useState<Array<ITicketHistory>>([])
        const { isLoading } = useQuery(
            ["sales-logs"],
            () => httpService.get(`/events/admin-ticket-sales`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.result?.data);
                },
            },
        );
        return {
            data,
            isLoading
        }
    }



    const getDonationData = () => {
        const [data, setData] = useState<Array<{
            "status": string,
            "donationStatus": string,
            "interval": string,
            "recipients": Array<{
                    "fundRaised": number,
                    "totalDonations": number,
                    "_id": string,
                    "name": string,
                    "charityRegNumber": string,
                    "logo": string,
                    "createdAt": string
                }>,
            "active": boolean,
            "createAt": string,
            "_id": string,
            "user": {
                "_id": string,
                "fullname": string,
                "photo": string
            },
            "paymentIntentId": string,
            "amount": number,
            "event": {
                "_id": string,
                "name": string,
                "photo": string
            },
            "createdAt": string,
            "updatedAt": string,
            "__v": number,
            "share": number
        }>>([])
        const { isLoading } = useQuery(
            ["all-donation"],
            () => httpService.get(`/organizations/indirect-donation-history/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    console.log(data?.data?.donations?.data);

                    setData(data?.data?.donations?.data);
                },
            },
        );
        return {
            data,
            isLoading
        }
    }


    const getinDonationData = () => {
        const [data, setData] = useState<Array<any>>([])
        const { isLoading } = useQuery(
            ["all-indonation"],
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
        getTicketSalesData,
        getinDonationData
    };
}

export default useGetRevenue