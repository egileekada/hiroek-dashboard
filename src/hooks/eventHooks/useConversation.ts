import { useMutation, useQueryClient } from "react-query";
import httpService from "../../utils/httpService";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";  


const useConversation = () => {


    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const id = searchParams.get("id");
    const history = useLocation()
    const { id: eventId } = useParams();
    const [inputMessage, setInputMessage] = useState("");

    const query = useQueryClient()

    const message = searchParams.get("message");


    const { mutate: createConversation, isLoading: loadingConversation } = useMutation({
        mutationFn: (data: {
            userTwo: string,
            ownEvent: string,
            userType: 'User' | 'Organization' | 'EventPartner'
        }) => httpService.post(`/conversations`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {

            if (message) {
                navigate(`/dashboard/event/support/${eventId}?id=${data?.data?.conversation?._id}&message=true`)
            } else {
                navigate(`/dashboard/event/support/${eventId}?id=${data?.data?.conversation?._id}&`)
            }

        },
    });


    const { mutate: joinEvent, isLoading: loadingJoinEvent } = useMutation({
        mutationFn: (data: string) => httpService.post(`/events/${data}/join-events`),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            query?.invalidateQueries("Event")
        },
    });

    const { mutate: verifyTicket, isLoading: verifing } = useMutation({
        mutationFn: (data: string) => httpService.get(`/events/user-event-ticket-verification/${data}`),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => { 
            if (data?.data?.isTicketValid && history?.pathname?.includes("/dashboard/event/scanner")) {
                toast.success("ticket is valid")
                navigate(`/dashboard/event/scan/history/${eventId}`)
            }

        },
    });

    const { mutate: createChat, isLoading: loadingChat } = useMutation({
        mutationFn: (data: {
            message: string,
            replying?: string
        }) => httpService.post(`/conversations/${id}/messages`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            setInputMessage("")
            // setConversationId(data?.data?.conversation?._id) 
        },
    });


    return {
        createConversation,
        loadingConversation,
        createChat,
        loadingChat,
        searchParams,
        setInputMessage,
        inputMessage,
        verifyTicket,
        verifing,
        joinEvent,
        loadingJoinEvent
    };

}

export default useConversation