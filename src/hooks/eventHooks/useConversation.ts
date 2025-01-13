import { useMutation } from "react-query";
import httpService from "../../utils/httpService";
import toast from "react-hot-toast"; 
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useConversationHook } from "../../global-state/useConversationHook";




const useConversation = () => {
 

    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const id = searchParams.get("id");  
    const { id: eventId } = useParams();
    const { data: condata } = useConversationHook((state) => state) 
 
    const { mutate: createConversation, isLoading: loadingConversation } = useMutation({
        mutationFn: (data: {
            userTwo: string,
            userType: 'User' | 'Organization' | 'EventPartner'
        }) => httpService.post(`/conversations`, data),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {  
            navigate(`/dashboard/event/support/${eventId}?id=${data?.data?.conversation?._id}&name=${condata?.name}&photo=${condata?.photo}`)
 
        },
    });
 
    const { mutate: createChat, isLoading: loadingChat } = useMutation({
        mutationFn: (data: {
            message: string,
            replying?: string  
        }) => httpService.post(`/conversations/${id}/messages`, data),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {

            console.log(data);
            
            // setConversationId(data?.data?.conversation?._id) 
        },
    });


    return {
        createConversation,
        loadingConversation, 
        createChat,
        loadingChat,
        searchParams
    };

}

export default useConversation