
import { useMutation } from "react-query";
// import { useNavigate } from "react-router-dom";
import { EditEventValidation, EventValidation } from "../../services/validation";
import { useForm } from "../useForm";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { useState } from "react";
import { useImage } from "../../global-state/useImageData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie" 
import { useEventDetail } from "../../global-state/useEventDetails"; 

const useEvent = () => { 
    const { eventImage } = useImage((state) => state) 
    const { event, updateCreateEvent } = useEventDetail((state) => state) 
    const [open, setOpen] = useState(false)

    const router = useNavigate();
    const userId = Cookies.get("user-index")
    const history = useLocation()

    const { id } = useParams();  

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
            updateCreateEvent(data?.data?.event)
            // router("/dashboard/event")
        },
    });

    const { mutate: editMutate, isLoading: loadingEditEvent } = useMutation({
        mutationFn: (data: any) => httpService.patch(`/organizations/update-event/${event?._id}`, data, {
            headers: { 'Content-Type': eventImage ? eventImage.type : "" }
        }),
        onError: (error: any) => { 
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
                "totalTicket": "0",
                "ticketPrice": "0"
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
        submit: () => {
 
            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else { 

                if (history?.pathname?.includes("edit")) { 
                    setOpen(true) 
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
            
            formData.append("name", values?.name ? values?.name : event?.name)
            formData.append("description", values?.description ? values?.description : event?.description)

            formData.append("category", values?.category ? values?.category : event?.category)
            formData.append("privacy", values?.privacy ? values?.privacy : event?.privacy)
            if(values?.signUpLimit){
                formData.append("signUpLimit", values?.signUpLimit ? values?.signUpLimit : event?.signUpLimit)
            }
            formData.append("eventEndDate", new Date(values?.eventEndDate ? values?.eventEndDate : event?.endTime)?.toISOString())
            formData.append("endTime", new Date(values?.endTime ? values?.endTime : event?.endTime)?.toISOString())
            formData.append("address", values?.address ? values?.address : event?.address)

            if (!history?.pathname?.includes("edit")) {
                if (values?.fundRaiser?.fundRaisingGoal) {
                    values.fundRaiser?.organizations?.map((item: string) => {
                        formData.append("fundRaiser[organizations][]", item);
                    })
                }
            }

            if (values?.fundRaiser?.fundRaisingGoal) {
                formData.append("fundRaiser[fundRaisingGoal]",  Number(values.fundRaiser.fundRaisingGoal * 100)+"");
            } else if (event?.fundRaiser?.fundRaisingGoal) {
                formData.append("fundRaiser[fundRaisingGoal]",  Number(event?.fundRaiser?.fundRaisingGoal * 100)+"");
            }

            if (!history?.pathname?.includes("edit")) {
                if (values.eventTicket.totalTicket) {
                    formData.append("eventTicket[totalTicket]", values.eventTicket.totalTicket);
                } else if (event?.eventTicket?.totalTicket) {
                    formData.append("eventTicket[totalTicket]", event.eventTicket.totalTicket + "");
                }

                if (values?.eventTicket?.totalTicket) {
                    formData.append("eventTicket[ticketPrice]", Number(values.eventTicket.ticketPrice * 100)+"");
                } else if (event?.eventTicket?.ticketPrice) {
                    formData.append("eventTicket[ticketPrice]",  Number(event.eventTicket.ticketPrice * 100)+"");
                }
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
        formState,
        reset,  
        loadingEditEvent, 
        open,
        setOpen, 
    };
}

export default useEvent