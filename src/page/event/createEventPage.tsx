import { useLocation } from "react-router-dom";
import EventForm from "../../components/event/eventForm"; 
import PageHeader from "../../components/shared/pageHeader";
import useEvent from "../../hooks/eventHooks/useEvent"; 
import { useEventDetail } from "../../global-state/useEventDetails";
import { useEffect } from "react";
import EditEventForm from "../../components/event/editEventForm";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import CreateEventBtn from "../../components/event/createEventBtn"; 
import useGetEventData from "../../hooks/eventHooks/useGetEventData"; 
import { useDatePicker } from "../../global-state/useDatePicker";

export default function CreateEventPage() {

    const { eventHookForm, isLoading, setValue, formState, values, loadingEditEvent, submitHandler, open, setOpen, isSuccess, control } = useEvent()
    const { data, isLoading: loadingEvent } = useGetEventData().getSingleEventData()
    const history = useLocation() 
    const { event, updateEvent } = useEventDetail((state) => state) 
    const { updateEndDate, updateStartDate } = useDatePicker((state) => state)
    
    useEffect(() => {
        if (!history?.pathname.includes("edit")) {
            updateEvent({} as any)
        }  
    }, [])  

    useEffect(()=> {
        if (history?.pathname.includes("edit")){
            updateStartDate(data?.endTime)
            updateEndDate(data?.eventEndDate)
        } else {
            updateStartDate("")
            updateEndDate("")
        }
    }, [data])
 
    return eventHookForm(
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header={history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"} body={history?.pathname?.includes("edit") ? "" : "Effortless Event Creation and Community Engagement."} />
                <div className=" w-[230px] lg:block hidden text-white ">
                    <CreateEventBtn isSuccess={isSuccess} submit={submitHandler} open={open} setOpen={setOpen} loading={isLoading || loadingEditEvent} />
                </div>
            </div>
            {!history?.pathname.includes("edit") && (
                <EventForm control={control} open={open} setOpen={setOpen} submit={submitHandler} setValue={setValue} values={values} formState={formState} isLoading={isLoading} isSuccess={isSuccess} />
            )}
            {(history?.pathname.includes("edit") && event?.endTime) && (
                <LoadingAnimation loading={loadingEvent} >
                    <EditEventForm isSuccess={isSuccess} submit={submitHandler} open={open} setOpen={setOpen} defaultdata={data} setValue={setValue} values={values} formState={formState} isLoading={isLoading || loadingEditEvent} />
                </LoadingAnimation>
            )}
        </div>
    )
} 
