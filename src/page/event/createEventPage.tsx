import { useLocation } from "react-router-dom";
import EventForm from "../../components/event/eventForm";
import { CustomButton } from "../../components/shared";
import PageHeader from "../../components/shared/pageHeader";
import useEvent from "../../hooks/eventHooks/useEvent";
import { EventIcon } from "../../svg";
import { useEventDetail } from "../../global-state/useEventDetails";
import { useEffect } from "react";
import EditEventForm from "../../components/event/editEventForm";
import LoadingAnimation from "../../components/shared/loadingAnimation";
// import { useInterest } from "../../global-state/useInterestData"; 


export default function CreateEventPage() {

    const { eventHookForm, isLoading, setValue, formState, values, loadingSingleEvent, loadingEditEvent } = useEvent()
    const history = useLocation() 
    const { event, updateEvent } = useEventDetail((state) => state)

    useEffect(() => {
        if (!history?.pathname.includes("edit")) {
            updateEvent({} as any)
        }  
    }, []) 

    return eventHookForm(
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header={history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"} body="Effortless Event Creation and Community Engagement." />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton loading={isLoading || loadingEditEvent} className=" px-3 " width="200px" type="submit" hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        {history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"}
                    </CustomButton>
                </div>
            </div>
            {!history?.pathname.includes("edit") && (
                <EventForm setValue={setValue} values={values} formState={formState} isLoading={isLoading} />
            )}
            {(history?.pathname.includes("edit") && event?.endTime) && (
                <LoadingAnimation loading={loadingSingleEvent} >
                    <EditEventForm interest={event?.interests} defaultdata={event} setValue={setValue} values={values} formState={formState} isLoading={isLoading || loadingEditEvent} />
                </LoadingAnimation>
            )}
        </div>
    )
}