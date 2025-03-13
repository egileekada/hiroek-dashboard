import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../utils/httpService";
import { useState } from "react";


interface IProps {
    "recipientType": string,
    "isRead": boolean,
    "_id": string,
    "recipient": string,
    "message": string,
    "title": string,
    "type": string,
    "actionId": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}


const useNotificationCount = () => {

    const [data, setData] = useState<Array<IProps>>([])

    // react query
    const { isLoading } = useQuery(
        ["Notification"],
        () => httpService.get(`/notifications/unread-messages-count`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {

                console.log(data);

                setData([] as any)
            }
        },
    );

    return {
        isLoading,
        data,
    };
}

export default useNotificationCount
