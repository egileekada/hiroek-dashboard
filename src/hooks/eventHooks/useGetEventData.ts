import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useEventDetail } from "../../global-state/useEventDetails";
import { useMap } from "../../global-state/useMapStore";
import { usePagintion } from "../../global-state/usePagination";
import { IEvent, IEventDashboard } from "../../model/event";
import httpService from "../../utils/httpService";
import { IMessage } from "../../model/chat";

const useGetEventData = () => {

    const { page, pageSize, eventFilter } = usePagintion((state) => state)
    const { updateEvent } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);

    const [search, setSearch] = useState("")
    const [searchParams] = useSearchParams(); 
    const conversationId = searchParams.get("id");


    const { id } = useParams();

    // Get Event list
    const getEventData = () => {
        const [data, setData] = useState<Array<IEvent>>([])
        const { isLoading } = useQuery(
            ["Event", page, pageSize, eventFilter],
            () => httpService.get(`/organizations/events`, {
                params: {
                    page: page,
                    pageSize: pageSize,
                    eventFilter: eventFilter
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.events?.data)
                },
                // enabled: history?.pathname?.includes("dashboard/event") || history?.pathname === "/dashboard"
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getEventDashboardTicketData = () => {
        const [data, setData] = useState<Array<{
            tickets: Array<string>,
            createAt: string,
            _id: string,
            event: string,
            user: {
                _id: string,
                fullname: string,
                photo: string
            },
            totalTickets: number,
            createdAt: string,
            updatedAt: string,
            __v: number
        }>>([])
        const { isLoading } = useQuery(
            ["EventTicket", page, pageSize, eventFilter],
            () => httpService.get(`/events/${id}/tickets`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => { 

                    setData(data?.data?.tickets?.data)
                },
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getEventDashboardData = () => {
        const [data, setData] = useState<IEventDashboard>()
        const { isLoading } = useQuery(
            ["Event", page, pageSize, eventFilter],
            () => httpService.get(`/events/stats/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.stats)
                },
            },
        );

        return {
            data,
            isLoading
        }
    } 

    // Get Event list
    const getEventConversationData = () => {
        const [data, setData] = useState<any>()
        const { isLoading } = useQuery(
            ["conversations"],
            () => httpService.get(`/conversations`, {
                params: {
                    searchQuery: search
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.stats)
                },
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getSingleEventData = () => {
        const [data, setData] = useState<IEvent>()
        const { isLoading } = useQuery(
            ["Event", page, pageSize, eventFilter, id],
            () => httpService.get(`/events/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.event)
                    updateEvent(data?.data?.event)
                    // updateInterest(data?.data?.event?.interests)
                    updateMap(data?.data?.event?.address)
                }
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getConversationMessageData = () => {
        const [data, setData] = useState<Array<IMessage>>()
        const { isLoading, refetch } = useQuery(
            ["Conversation-Message", conversationId],
            () => httpService.get(`/conversations/${conversationId}/messages`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => { 
                    setData(data?.data?.messages?.data)
                },
                enabled: conversationId ? true : false
            },
        );

        return {
            data,
            isLoading,
            refetch
        }
    }

    return {
        getEventData,
        getEventDashboardData,
        getEventDashboardTicketData,
        getSingleEventData,
        setSearch,
        search,
        getEventConversationData,
        getConversationMessageData
    };
}

export default useGetEventData