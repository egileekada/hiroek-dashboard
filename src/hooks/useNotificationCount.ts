import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../utils/httpService";
import { useState } from "react";


const useNotificationCount = () => {

    const [data, setData] = useState(null)

    // react query
    const { isLoading } = useQuery(
        ["Notification-counting"],
        () => httpService.get(`/notifications/unread-notifications-count`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {

                setData(data?.data?.count);
 
            }
        },
    );

    return {
        isLoading,
        data,
    };
}

export default useNotificationCount
