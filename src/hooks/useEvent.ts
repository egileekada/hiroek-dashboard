
import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router-dom";
import { EditEventValidation, EventValidation } from "../services/validation";
import { useForm } from "./useForm";
import toast from "react-hot-toast";
import httpService from "../utils/httpService";
import { useState } from "react";
import { useImage } from "../global-state/useImageData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"
import { useInterest } from "../global-state/useInterestData";
import { usePagintion } from "../global-state/usePagination";
import { IEvent } from "../model/event";
import { useEventDetail } from "../global-state/useEventDetails";

const useEvent = () => {

    const [data, setData] = useState<Array<IEvent>>([])
    const [singleData, setSingleData] = useState({} as IEvent)
    const [showEvent, setShowEvent] = useState(true)
    const { eventImage } = useImage((state) => state)
    const { interest: interestData } = useInterest((state) => state)
    const { page, pageSize, eventFilter } = usePagintion((state) => state)
    const { event, updateEvent } = useEventDetail((state) => state)

    const router = useNavigate();
    const userId = Cookies.get("user-index")
    const history = useLocation()

    const { id } = useParams();

    // event list
    const { isLoading: loadingEvent } = useQuery(
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
            enabled: showEvent
        },
    );

    // single event by id
    const { isLoading: loadingSingleEvent } = useQuery(
        ["Event", page, pageSize, eventFilter],
        () => httpService.get(`/events/${id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
            },
            onSuccess: (data: any) => {

                setSingleData(data?.data?.events?.data[0])
                updateEvent(data?.data?.events?.data[0])
            },
            enabled: (!id) ? false : true
        },
    );

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-event`, data, {
            headers: { 'Content-Type': eventImage.type ?? "" }
        }),
        onError: (error: any) => {
            console.log(error?.response?.data?.error?.details?.message);

            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Created Event Successfully")
            router("/dashboard/event")
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
            router("/dashboard/event")
        },
    });

    const { renderForm: eventHookForm, values, setValue, formState, reset } = useForm({
        defaultValues: {
            name: event?.name ?? "",
            description: event?.description ?? "",
            fundraisingGoal: event?.fundraisingGoal ?? "",
            organization: userId,
            category: event?.category ?? "",
            privacy: event?.privacy ?? "",
            eventEndDate: event?.eventEndDate ?? "",
            endTime: event?.endTime ?? "",
            address: event?.address ?? "",
            signUpLimit: event?.signUpLimit ?? "",
            // communityId: event?.name ?? "",
        },
        validationSchema: history?.pathname?.includes("edit") ? EditEventValidation : EventValidation,
        submit: (data: any) => { 
            
            const formData = new FormData()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else {
                formData.append("name", data?.name ? data?.name : event?.name)
                formData.append("description", data?.description ? data?.description : event?.description)
                formData.append("fundraisingGoal", data?.fundraisingGoal ? data?.fundraisingGoal : event?.fundraisingGoal)
                {
                    interestData?.map((item) => {
                        formData.append("interests[]", item?.value)
                    })
                }
                if (!history?.pathname?.includes("edit")) {
                    formData.append("organization", userId+"")
                }
                formData.append("category", data?.category ? data?.category : event?.category)
                formData.append("privacy", data?.privacy ? data?.privacy : event?.privacy)
                formData.append("signUpLimit", data?.signUpLimit ? data?.signUpLimit : event?.signUpLimit)
                formData.append("eventEndDate", new Date(data?.eventEndDate ? data?.eventEndDate : event?.endTime)?.toISOString())
                formData.append("endTime", new Date(data?.endTime ? data?.endTime : event?.endTime)?.toISOString())
                formData.append("address", data?.address ? data?.address : event?.address)
                // formData.append("communityId", data?.communityId)
                if (eventImage) {
                    console.log("test");

                    formData.append("photo", eventImage)
                }

                if (history?.pathname?.includes("edit")) {
                    editMutate(formData)
                } else {
                    mutate(formData)
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

    return {
        eventHookForm,
        setValue,
        supportHookForm,
        supportValue,
        isLoading,
        isSuccess,
        values,
        loadingEvent,
        setShowEvent,
        data,
        formState,
        reset,
        singleData,
        loadingSingleEvent,
        loadingEditEvent
    };
}

export default useEvent