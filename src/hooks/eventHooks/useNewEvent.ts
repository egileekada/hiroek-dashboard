
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
import { useMap } from '../../global-state/useMapStore';
import { ICreateEvent } from '../../model/event';


const useEvent = () => {

    const history = useLocation()
    const { eventImage } = useImage((state) => state)
    const [open, setOpen] = useState(false)
    const { event, updateCreateEvent } = useEventDetail((state) => state)
    const { id } = useParams();
    const router = useNavigate()
    const { endDate, startData } = useDatePicker((state) => state)
    const userId = Cookies.get("user-index") as string
    const { marker } = useMap((state) => state);

    const { mutate, isLoading, isSuccess } = useMutation({
        mutationFn: (data: any) => httpService.post(`/organizations/create-event`, data,
            eventImage ?
                {
                    headers: { 'Content-Type': eventImage ? eventImage.type : "" }
                } : {}),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => {
            toast.success("Created Event Successfully")
            updateCreateEvent(data?.data?.event)

            router("/dashboard/event/details/" + data?.data?.event?._id)
        },
    });

    const { mutate: editMutate, isLoading: loadingEditEvent } = useMutation({
        mutationFn: (data: any) => httpService.patch(
            `/organizations/update-event/${event?._id}`,
            data,
            eventImage ?
                {
                    headers: { 'Content-Type': eventImage ? eventImage.type : "" }
                } : {}
        ),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {
            toast.success("Updated Event Successfully")
            router("/dashboard/event/details/" + id)
        },
    });

    const { mutate: ticketMutate, isLoading: loadingticketEvent } = useMutation({
        mutationFn: (data: {
            payload: {
                "ticketType": string,
                "ticketPrice": number,
                "signUpLimit": number,
                "salesStartDate": string,
                "salesEndDate": string,
                "absorbFees": boolean
            },
            id: string
        }) => httpService.patch(`/organizations/update-event-ticket-type/${event?._id}/${data?.id}`, data.payload),
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
            "name": "",
            "description": "",
            "fundRaiser": {
                "fundRaisingGoal": "",
                "organizations": [userId]
            },
            "ticketing": [],
            "recurrence": {
                "interval": "",
                "frequency": "",
                "daysOfWeek": [],
                "endType": "",
                endDate: "",
                "occurrenceCount": ""
            },
            "category": "",
            "subcategory": "",
            "privacy": "public",
            "eventEndDate": "",
            "endTime": "",
            "address": "",
            "latitude": "",
            "longitude": "",
            "signUpLimit": "",
            "communityId": "",
            "photo": ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            category: Yup.string().required("Required"),
            privacy: Yup.string().oneOf(["public", "private"]).required("Required"),
            address: Yup.string().required("Required"),
        }),
        onSubmit: (data: ICreateEvent) => {
            // submitHandler()

            if (!eventImage && !history?.pathname?.includes("edit")) {
                toast.error("Add Image")
            } else {
                // setOpen(true)
                buildFormData(data)
            }
        },
    });

    console.log(marker);


    const buildFormData = (values: ICreateEvent) => {
        const formData = new FormData();

        // Add simple string/number fields
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("category", values.category);
        // formData.append("subcategory", values.category);
        formData.append("privacy", values.privacy);
        formData.append("eventEndDate", values.eventEndDate);
        formData.append("endTime", values.endTime);
        formData.append("address", values.address);
        formData.append("latitude", String(marker.lat));
        formData.append("longitude", String(marker.lng));
        // formData.append("signUpLimit", String(values.signUpLimit));
        // formData.append("communityId", values.communityId);

        // Fundraiser
        if (values.fundRaiser.fundRaisingGoal) {
            formData.append(
                "fundRaiser[fundRaisingGoal]",
                String(values.fundRaiser.fundRaisingGoal)
            );
            values.fundRaiser.organizations.forEach((org, i) => {
                formData.append(`fundRaiser[organizations][${i}]`, org);
            });
        }

        if (values.recurrence.interval) {
            formData.append("recurrence[interval]", String(values.recurrence.interval));
        }
        // Recurrence
        if (values.recurrence.frequency) {
            formData.append("recurrence[frequency]", values.recurrence.frequency);
        }

        if (values.recurrence.endType) {
            formData.append("recurrence[endType]", values.recurrence.endType);
        }

        if(values.recurrence.daysOfWeek.length > 0) {
            values.recurrence.daysOfWeek.forEach((day, i) => {
                formData.append(`recurrence[daysOfWeek][${i}]`, String(day));
            });
        } 


        if(values.recurrence.occurrenceCount) { 
                formData.append(`recurrence[totalOccurrences]`, values?.recurrence.occurrenceCount); 
        }  

        if (values.ticketing[0].ticketType) {
            values.ticketing.map((item, i) => {
                if(item?.salesEndDate) {
                    formData.append(`ticketing[${i}][salesEndDate]`, String(item?.salesEndDate));
                }
                if(item?.salesStartDate) {
                    formData.append(`ticketing[${i}][salesStartDate]`, String(item?.salesStartDate));
                }
                {
                    item?.signUpLimit && (
                        formData.append(`ticketing[${i}][signUpLimit]`, String(item?.signUpLimit))
                    )
                }
                formData.append(`ticketing[${i}][ticketPrice]`, String(item?.ticketPrice * 100));
                formData.append(`ticketing[${i}][ticketType]`, String(item?.ticketType));
            })
        } else { 
            formData.append(`ticketing[${0}][signUpLimit]`, String(0))
            formData.append(`ticketing[${0}][ticketPrice]`, String(0))
            formData.append(`ticketing[${0}][ticketType]`, String("Standard"))
            formData.append(`ticketing[${0}][salesStartDate]`, String(new Date().toISOString()));
            formData.append(`ticketing[${0}][salesEndDate]`, String(values?.eventEndDate));
        } 

        if (eventImage) {
            formData.append("photo", eventImage);
        }


        if (history?.pathname?.includes("edit")) {
            editMutate(formData)
        } else {
            mutate(formData)
        }
    };

    const submitHandler = () => {

        if (!eventImage && !history?.pathname?.includes("edit")) {
            toast.error("Add Image")
        } else if (!startData) {
            toast.error("Add a Start Date")
        } else if (!endDate) {
            toast.error("Add a End Date")
        } else {

            const formData = buildFormData(formik?.values);

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
        setOpen,
        ticketMutate,
        loadingticketEvent
    }

}


export default useEvent