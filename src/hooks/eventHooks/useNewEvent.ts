
import { useFormik } from 'formik';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useImage } from '../../global-state/useImageData';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import httpService from '../../utils/httpService';
import { useEventDetail } from '../../global-state/useEventDetails';
import { useDatePicker } from '../../global-state/useDatePicker';
import { useState } from 'react';
import Cookies from "js-cookie"


const useEvent = () => {

    const history = useLocation()
    const { eventImage } = useImage((state) => state)
    const [open, setOpen] = useState(false)
    const { event, updateCreateEvent } = useEventDetail((state) => state)
    const { id } = useParams();
    const router = useNavigate()
    const { endDate, startData } = useDatePicker((state) => state)
    const userId = Cookies.get("user-index")

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

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            fundRaiser: {
                fundRaisingGoal: "",
                organizations: [
                    userId
                ], // You can dynamically insert userId later
            },
            eventTicket: {
                totalTicket: "",
                ticketPrice: "",
            },
            category: "",
            privacy: "public",
            address: "",
            signUpLimit: 0,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            privacy: Yup.string().oneOf(["public", "private"]).required("Required"),
            address: Yup.string().required("Required"),
        }),
        onSubmit: () => {
            // submitHandler()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else if (!startData) {
                toast.error("Add a Start Date")
            } else if (!endDate) {
                toast.error("Add a End Date")
            } else {
                setOpen(true)
            }
        },
    });

    const submitHandler = () => {

        const formData = new FormData()

        if (!eventImage && !history?.pathname?.includes("edit")) {
            toast.error("Add Image")
        } else if (!startData) {
            toast.error("Add a Start Date")
        } else if (!endDate) {
            toast.error("Add a End Date")
        } else {

            formData.append("name", formik?.values?.name ? formik?.values?.name : event?.name)
            formData.append("description", formik?.values?.description ? formik?.values?.description : event?.description)

            formData.append("category", formik?.values?.category ? formik?.values?.category : event?.category)
            formData.append("privacy", formik?.values?.privacy ? formik?.values?.privacy : event?.privacy)
            if (formik?.values?.eventTicket.totalTicket) {
                formData.append("signUpLimit", formik?.values?.eventTicket.totalTicket)
            }
            formData.append("eventEndDate", new Date(endDate)?.toISOString())
            formData.append("endTime", new Date(startData)?.toISOString())
            formData.append("address", formik?.values?.address ? formik?.values?.address : event?.address)

            if (!history?.pathname?.includes("edit")) {
                if (formik?.values?.fundRaiser?.fundRaisingGoal) {
                    formik?.values?.fundRaiser?.organizations?.map((item: any) => {
                        formData.append("fundRaiser[organizations][]", item);
                    })
                }
            }

            if (!history?.pathname?.includes("edit")) {
                if (formik?.values?.fundRaiser?.fundRaisingGoal) {
                    formData.append("fundRaiser[fundRaisingGoal]", Number(formik.values.fundRaiser.fundRaisingGoal) * 100 + "");
                }
            }

            if (!history?.pathname?.includes("edit")) {
                formData.append("eventTicket[ticketPrice]", formik.values.eventTicket.ticketPrice ? Number(formik.values.eventTicket.ticketPrice) * 100 + "" : 0 + "");
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
        formik,
        isLoading,
        isSuccess,
        loadingEditEvent,
        submitHandler,
        open,
        setOpen
    }

}


export default useEvent