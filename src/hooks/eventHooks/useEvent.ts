
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
import { useDatePicker } from "../../global-state/useDatePicker";

const useEvent = () => { 
    const { eventImage } = useImage((state) => state) 
    const { event, updateCreateEvent } = useEventDetail((state) => state) 
    const [open, setOpen] = useState(false)
    const { endDate, startData } = useDatePicker((state) => state) 

    const router = useNavigate();
    const userId = Cookies.get("user-index")
    const history = useLocation()

    const { id } = useParams();  

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-event`, data, {
            headers: { 'Content-Type': eventImage ? eventImage.type : "" }
        }),
        onError: (error: any) => { 
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

    const { renderForm: eventHookForm, values, setValue, formState, reset, control } = useForm({
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
            address: "",
            signUpLimit: "",
            // communityId: event?.name ?? "",
        },
        validationSchema: history?.pathname?.includes("edit") ? EditEventValidation : EventValidation,
        submit: () => {
 
            console.log("values");

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else if(!startData) {
                toast.error("Add Start Date")
            }  else if(!endDate) {
                toast.error("Add End Date")
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
            if(values?.eventTicket.totalTicket){
                formData.append("signUpLimit", values?.eventTicket.totalTicket ? values?.eventTicket.totalTicket : event?.signUpLimit)
            }
            formData.append("eventEndDate", new Date(endDate)?.toISOString())
            formData.append("endTime", new Date(startData)?.toISOString())
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
                // if (values.eventTicket.totalTicket) {
                //     formData.append("eventTicket[totalTicket]", values.eventTicket.totalTicket);
                // } else if (event?.eventTicket?.totalTicket) {
                //     formData.append("eventTicket[totalTicket]", event.eventTicket.totalTicket + "");
                // }
                if (event?.eventTicket?.ticketPrice) {
                    formData.append("eventTicket[ticketPrice]", event.eventTicket.ticketPrice ? Number(event.eventTicket.ticketPrice * 100)+"" : 0+"" );
                } else {
                    formData.append("eventTicket[ticketPrice]", values.eventTicket.ticketPrice ? Number(values.eventTicket.ticketPrice * 100)+"" : 0+"" );
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
        control
    };
}

export default useEvent