import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { useEventDetail } from "../../global-state/useEventDetails";
import { useMap } from "../../global-state/useMapStore";
import { usePagintion } from "../../global-state/usePagination";
import { IConversationMember, IEvent, IEventDashboard, IScanEvent } from "../../model/event";
import httpService from "../../utils/httpService";
import { IMessage } from "../../model/chat";
import Cookies from "js-cookie"
import { IUser } from "../../model/user";
import { useSearchStore } from "../../global-state/useSearchText";

const useGetEventData = () => {

    const { page, pageSize, eventFilter } = usePagintion((state) => state)
    const { updateEvent } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);

    const userId = Cookies.get("user-index")
    const [searchParams] = useSearchParams();
    const conversationId = searchParams.get("id");

    const { search } = useSearchStore((state) => state)

    const { id } = useParams();

    // Get Event list
    const getEventData = (filter?: string) => {
        const [data, setData] = useState<Array<IEvent>>([])
        const { isLoading, isRefetching } = useQuery(
            ["Event", page, pageSize, eventFilter, search, filter],
            () => httpService.get(`/events/all-events`, {
                params: {
                    userId: userId,
                    page: page,
                    pageSize: pageSize,
                    timeFilter: filter ? filter : eventFilter,
                    searchQuery: search
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
            isLoading,
            isRefetching
        }
    }

    // Get Event list
    const getEventDataNoQuery = () => {
        const [data, setData] = useState<Array<IEvent>>([])
        const { isLoading } = useQuery(
            ["EventNoquery", page, pageSize, search],
            () => httpService.get(`/events/all-events`, {
                params: {
                    userId: userId,
                    page: page,
                    pageSize: pageSize,
                    searchQuery: search
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

    // Get Event list From Members
    const getEventMemberData = () => {
        const [data, setData] = useState<Array<IEvent>>([])
        const { isLoading, isRefetching } = useQuery(
            ["Event-member", page, pageSize, eventFilter],
            () => httpService.get(`/organizations/organization-indirect-events/${userId}`, {
                params: {
                    timeFilter : eventFilter
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => { 
                    setData(data?.data?.data)
                },
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }


    // Get Event list From Members
    const getEventConversionMemberData = (index: string) => {
        const [data, setData] = useState<Array<IConversationMember>>([])
        const [count, setCount] = useState(0)
        const { isLoading } = useQuery(
            ["conversations-member", index],
            () => httpService.get(`/conversations`, {
                params: {
                    event: index
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setCount(data?.data?.conversations?.data[0]?.unreadMessages)
                    setData(data?.data?.conversations?.data[0]?.participants)
                },
            },
        );

        return {
            data,
            count,
            isLoading
        }
    }

    //  Get Organization
    const getOrganization = () => {
        const [data, setData] = useState<Array<IUser>>([])
        const [search, setSearch] = useState("")
        const { isLoading } = useQuery(
            ["Organization", search],
            () => httpService.get(`/organizations`, {
                params: {
                    searchQuery: search,
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.data)
                },
                // enabled: history?.pathname?.includes("dashboard/event") || history?.pathname === "/dashboard"
            },
        );

        return {
            data,
            isLoading,
            setSearch,
            search
        }
    }

    //  Get Organization
    const getOrganizationById = (index: string) => {
        const [data, setData] = useState<IUser>({} as any)
        const [search, setSearch] = useState("")
        const { isLoading } = useQuery(
            ["Organization-by-id", index],
            () => httpService.get(`/organizations/${index}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.organization)
                },
            },
        );

        return {
            data,
            isLoading,
            setSearch,
            search
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
        const [data, setData] = useState<Array<{
            "_id": string,
            "participants": [
                {
                    "participantType": string,
                    "event": any,
                    "participant": {
                        "_id": string,
                        "name": string,
                        "logo": string,
                        "createdAt": string
                    },
                    "name": string
                },
                {
                    "participantType": string,
                    "event": {
                        "_id": string,
                        "name": string,
                        "photo": string
                    },
                    "participant": {
                        "_id": string,
                        "createdAt": string,
                        "fullname": string,
                        "photo": string
                    },
                    "name": string
                }
            ],
            "createdAt": string,
            "updatedAt": string,
            "__v": 0,
            "lastMessage": {
                "senderType": string,
                "recipientType": string,
                "status": string,
                "_id": string,
                "conversation": string,
                "message": string,
                "sender": string,
                "recipient": string,
                "createdAt": string,
                "updatedAt": string,
                "__v": number
            },
            "unreadMessages": number
        }>>()
        const { isLoading } = useQuery(
            ["conversations"],
            () => httpService.get(`/conversations`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.conversations?.data) 
                    
                },
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getEventConversationMember = (index?: string) => {
        const [data, setData] = useState<Array<{
            "_id": string,
            "participants": [
                {
                    "participantType": string,
                    "event": any,
                    "participant": {
                        "_id": string,
                        "name": string,
                        "logo": string,
                        "createdAt": string
                    },
                    "name": string
                },
                {
                    "participantType": string,
                    "event": {
                        "_id": string,
                        "name": string,
                        "photo": string
                    },
                    "participant": {
                        "_id": string,
                        "createdAt": string,
                        "fullname": string,
                        "photo": string
                    },
                    "name": string
                }
            ],
            "createdAt": string,
            "updatedAt": string,
            "__v": 0,
            "lastMessage": {
                "senderType": string,
                "recipientType": string,
                "status": string,
                "_id": string,
                "conversation": string,
                "message": string,
                "sender": string,
                "recipient": string,
                "createdAt": string,
                "updatedAt": string,
                "__v": number
            },
            "unreadMessages": number
        }>>()
        const { isLoading } = useQuery(
            ["conversations-member"],
            () => httpService.get(`/conversations`, {
                params: {
                    event: index
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.conversations?.data) 
                    
                },
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getScanEventTicket = () => {
        const [data, setData] = useState<Array<IScanEvent>>()
        const { isLoading } = useQuery(
            ["Event", page, pageSize, eventFilter, id],
            () => httpService.get(`/events/ticket-scan-logs`, {
                params: {
                    eventId: id
                }
            }),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.result?.data);
                }
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getSingleEventData = (index?: string) => {
        const [data, setData] = useState<IEvent | any>()

        const newIndex = index ? index : id
        const { isLoading } = useQuery(
            ["Event", page, pageSize, eventFilter, newIndex],
            () => httpService.get(`/events/${newIndex}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.event)
                    updateEvent(data?.data?.event)
                    updateMap(data?.data?.event?.address)
                },
                enabled: newIndex ? true : false
            },
        );

        return {
            data,
            isLoading
        }
    }

    // Get Event list
    const getConversationMessageData = () => {
        const [data, setData] = useState<Array<IMessage>>([])
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
        getEventConversationData,
        getConversationMessageData,
        getEventMemberData,
        getOrganization,
        getOrganizationById,
        getScanEventTicket,
        getEventConversionMemberData,
        getEventDataNoQuery,
        getEventConversationMember
    };
}

export default useGetEventData