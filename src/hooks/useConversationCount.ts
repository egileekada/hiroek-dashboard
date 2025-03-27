import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../utils/httpService";
import { useState } from "react";


const useConversationCount = () => {

    const [data, setData] = useState(null)

    // react query
    const { isLoading } = useQuery(
        ["Conversations"],
        () => httpService.get(`/conversations/unread-messages-count`),
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

export default useConversationCount
