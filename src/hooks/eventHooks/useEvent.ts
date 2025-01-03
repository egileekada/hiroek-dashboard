
import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { EditEventValidation, EventValidation } from "../../services/validation";
import { useForm } from "../useForm";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react";
import { useImage } from "../../global-state/useImageData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"
// import { useInterest } from "../../global-state/useInterestData";
import { usePagintion } from "../../global-state/usePagination";
import { IEvent } from "../../model/event";
import { useEventDetail } from "../../global-state/useEventDetails";
import { useMap } from "../../global-state/useMapStore";

interface IEventDashboard { 
        "fundRaised": number;
        "todayDonations": number;
        "members": number;
        "tickets": number;
        "ticketValues": number;
        "pledges": number
}

const useEvent = () => {
    const [donationData, setDonationData] = useState<Array<any>>([])
    const [singleData, setSingleData] = useState({} as IEvent)
    const { eventImage } = useImage((state) => state)
    
    const { page, pageSize, eventFilter } = usePagintion((state) => state)
    const { event, updateEvent, updateCreateEvent } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);
    const [open, setOpen] = useState(false)

    const router = useNavigate();
    const userId = Cookies.get("user-index")
    const history = useLocation()

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
        const [data, setData] = useState<Array<IEvent>>([])
        const { isLoading } = useQuery(
            ["EventTicket", page, pageSize, eventFilter],
            () => httpService.get(`/api/events/${id}/tickets`, {
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

                    console.log(data);
                    
                    setData(data?.data?.stats)
                },
                // enabled: history?.pathname?.includes("dashboard/event") || history?.pathname === "/dashboard"
            },
        );

        return {
            data,
            isLoading
        } 
    }


    // single event by id
    const { isLoading: loadingSingleEvent } = useQuery(
        ["Event", page, pageSize, eventFilter, id],
        () => httpService.get(`/events/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {
                setSingleData(data?.data?.event)
                updateEvent(data?.data?.event)
                // updateInterest(data?.data?.event?.interests)
                updateMap(data?.data?.event?.address)
            },
            enabled: (!event?.name && !id) ? false : true
        },
    );

    // single event donation by id
    const { isLoading: loadingDonation } = useQuery(
        ["Event_Donation", page, pageSize, eventFilter],
        () => httpService.get(`/events/${id}/donations`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {
                setDonationData(data?.data?.event?.data)
            },
            enabled: (!id) ? false : true
        },
    );

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-event`, data, {
            headers: { 'Content-Type': eventImage ? eventImage.type : "" }
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {
            toast.success("Created Event Successfully")

            console.log(data);
            console.log(data?.data?.event);
            updateCreateEvent(data?.data?.event)
            // router("/dashboard/event")
        },
    });

    const { mutate: editMutate, isLoading: loadingEditEvent } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/update-event/${event?._id}`, data, {
            headers: { 'Content-Type': eventImage ? eventImage.type : "" }
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Updated Event Successfully")
            router("/dashboard/event/details/" + id)
        },
    });

    const { renderForm: eventHookForm, values, setValue, formState, reset } = useForm({
        defaultValues: {
            name: "",
            description: "",
            fundRaiser: {
                fundRaisingGoal: "",
                organizations: [
                    userId
                ]
            },
            eventTicket: {
                "totalTicket": "",
                "ticketPrice": ""
            },
            category: "",
            privacy: "public",
            eventEndDate: "",
            endTime: "",
            address: "",
            signUpLimit: "",
            // communityId: event?.name ?? "",
        },
        validationSchema: history?.pathname?.includes("edit") ? EditEventValidation : EventValidation,
        submit: (data: any) => {

            const formData = new FormData()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else if (!data.eventTicket.ticketPrice && data.eventTicket.totalTicket) {
                toast.error("Enter Ticket Information")
            } else {

                if (history?.pathname?.includes("edit")) {


                    formData.append("name", data?.name ? data?.name : event?.name)
                    formData.append("description", data?.description ? data?.description : event?.description)

                    formData.append("category", data?.category ? data?.category : event?.category)
                    formData.append("privacy", data?.privacy ? data?.privacy : event?.privacy)
                    formData.append("signUpLimit", data?.signUpLimit ? data?.signUpLimit : event?.signUpLimit)
                    formData.append("eventEndDate", new Date(data?.eventEndDate ? data?.eventEndDate : event?.endTime)?.toISOString())
                    formData.append("endTime", new Date(data?.endTime ? data?.endTime : event?.endTime)?.toISOString())
                    formData.append("address", data?.address ? data?.address : event?.address)

                    // if (!history?.pathname?.includes("edit")) {
                    //     if (data?.fundRaiser?.fundRaisingGoal) {
                    //         data.fundRaiser?.organizations?.map((item: string) => {
                    //             formData.append("fundRaiser[organizations][]", item);
                    //         })
                    //     }
                    // }

                    if (data?.fundRaiser?.fundRaisingGoal) {
                        formData.append("fundRaiser[fundRaisingGoal]", data.fundRaiser.fundRaisingGoal);
                    } else {
                        formData.append("fundRaiser[fundRaisingGoal]", event?.fundRaiser?.fundRaisingGoal + "");
                    }

                    if (data.eventTicket.totalTicket) {
                        formData.append("eventTicket[totalTicket]", data.eventTicket.totalTicket);
                    } else {
                        formData.append("eventTicket[totalTicket]", event.eventTicket.totalTicket + "");
                    }

                    if (data.eventTicket.totalTicket) {
                        formData.append("eventTicket[ticketPrice]", data.eventTicket.ticketPrice);
                    } else {
                        formData.append("eventTicket[ticketPrice]", event.eventTicket.ticketPrice + "");
                    }

                    if (eventImage) {
                        formData.append("photo", eventImage)
                    }

                    if (history?.pathname?.includes("edit")) {
                        editMutate(formData)
                    } else {
                        mutate(formData)
                    }
                } else {
                    setOpen(true)
                }
            }
        }
    });

    const { renderForm: supportHookForm, values: supportValue } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        validationSchema: EventValidation,
        submit: (data: any) => {
            mutate(data)
        }
    });

    const submitHandler = () => {

        const formData = new FormData()

        if (!eventImage && !history?.pathname?.includes("edit")) {
            toast.error("Add Image")
        } else {

            console.log(values);
            console.log("work");

            formData.append("name", values?.name ? values?.name : event?.name)
            formData.append("description", values?.description ? values?.description : event?.description)

            formData.append("category", values?.category ? values?.category : event?.category)
            formData.append("privacy", values?.privacy ? values?.privacy : event?.privacy)
            formData.append("signUpLimit", values?.signUpLimit ? values?.signUpLimit : event?.signUpLimit)
            formData.append("eventEndDate", new Date(values?.eventEndDate ? values?.eventEndDate : event?.endTime)?.toISOString())
            formData.append("endTime", new Date(values?.endTime ? values?.endTime : event?.endTime)?.toISOString())
            formData.append("address", values?.address ? values?.address : event?.address)
 
            if (!history?.pathname?.includes("edit")) {
                if(values?.fundRaiser?.fundRaisingGoal) { 
                    values.fundRaiser?.organizations?.map((item: string) => {
                        formData.append("fundRaiser[organizations][]", item);
                    })
                }
            }

            if (values?.fundRaiser?.fundRaisingGoal) {
                formData.append("fundRaiser[fundRaisingGoal]", values.fundRaiser.fundRaisingGoal);
            } else if(event?.fundRaiser?.fundRaisingGoal) {
                formData.append("fundRaiser[fundRaisingGoal]", event?.fundRaiser?.fundRaisingGoal + "");
            }

            if (values.eventTicket.totalTicket) {
                formData.append("eventTicket[totalTicket]", values.eventTicket.totalTicket);
            } else if (event?.eventTicket?.totalTicket){
                formData.append("eventTicket[totalTicket]", event.eventTicket.totalTicket + "");
            }

            if (values?.eventTicket?.totalTicket) {
                formData.append("eventTicket[ticketPrice]", values.eventTicket.ticketPrice);
            } else if (event?.eventTicket?.ticketPrice){
                formData.append("eventTicket[ticketPrice]", event.eventTicket.ticketPrice + "");
            }

            if (eventImage) {
                formData.append("photo", eventImage)
            }

            if (history?.pathname?.includes("edit")) {
                editMutate(formData)
            } else {
                mutate(formData)
            }
        }
    }

    return {
        eventHookForm,
        submitHandler,
        setValue,
        supportHookForm,
        supportValue,
        isLoading,
        isSuccess,
        values,
        getEventData,
        formState,
        reset,
        singleData,
        loadingSingleEvent,
        loadingEditEvent,
        loadingDonation,
        donationData,
        open, 
        setOpen,
        getEventDashboardData,
        getEventDashboardTicketData
    };
}

export default useEvent