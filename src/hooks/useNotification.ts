import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../utils/httpService";
import { useState } from "react";
import InfiniteScrollerComponent from "./infiniteScrollerComponent";


export interface IProps {
    "recipientType": string,
    "isRead": boolean,
    "_id": string,
    "recipient": string,
    "message":string,
    "title": string,
    "type": string,
    "actionId": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}


const useNotification = () => {

    const [data, setData] = useState<Array<IProps>>([]) 

    // react query
    const { isLoading } = useQuery(
        ["Notification-List"],
        () => httpService.get(`/notifications`, {
            params: {
                pageSize: 20
            }
        }),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.notifications?.data)
            }
        },
    ); 


    const { results, ref, isRefetching, isLoading: loading } = InfiniteScrollerComponent({ url: `/notifications`, limit: 10, filter: "_id", name: "getOrder" })

    return {
        isLoading,
        isRefetching,
        ref,
        results,
        loading,
        data 
    };
}

export default useNotification
