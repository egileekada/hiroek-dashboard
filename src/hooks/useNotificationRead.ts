import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import httpService from "../utils/httpService"; 

const useNotification = () => {
 
    const query = useQueryClient()


    const readNotification = useMutation({
        mutationFn: (data: {
            postId: string,
            content: string
        }) => httpService.post(`/posts/comments/${data?.postId}/reply`, {
            content: data?.content
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            query?.invalidateQueries("Notification")  
            
        },
    });

    return {
        readNotification
    };
}

export default useNotification
