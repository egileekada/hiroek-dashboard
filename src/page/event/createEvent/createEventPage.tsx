import { useLocation, useNavigate, useParams } from "react-router-dom";
import useGetEventData from "../../../hooks/eventHooks/useGetEventData";
import { useEffect, useState } from "react";
import { useMap } from "../../../global-state/useMapStore";
import InformationForm from "../../../components/newEventForm/informationForm";
import PageHeader from "../../../components/shared/pageHeader";
import useEvent from "../../../hooks/eventHooks/useNewEvent";
import { useQuery } from "../../../utils/useQuery";
import EventRecurrence from "../../../components/newEventForm/eventRecurrence";
import { FormikProvider } from "formik";
import EventTicket from "../../../components/newEventForm/eventTicket";
import EventTicketDetails from "../../../components/newEventForm/eventTicketDetails";
import EventFundraising from "../../../components/newEventForm/fundraisingDetail";
import EditEventTicket from "../../../components/newEventForm/editEventTicket";
import ModalLayout from "../../../components/shared/modalLayout";
import { CustomButton, Text } from "../../../components/shared";
import EventDetailPreview from "../../../components/newEventForm/eventDetailPreview";
import LoadingAnimation from "../../../components/shared/loadingAnimation";


export default function CreateEventPage() {


    const { data, isLoading: loadingEvent } = useGetEventData().getSingleEventData()
    const history = useLocation()

    const navigate = useNavigate()
    const { updateMarker } = useMap((state) => state)

    // const { updateEndDate, updateStartDate } = useDatePicker((state) => state)

    // useEffect(() => {
    //     if (history?.pathname.includes("edit")) {
    //         updateStartDate(data?.endTime)
    //         updateEndDate(data?.eventEndDate)
    //     } else {
    //         updateStartDate("")
    //         updateEndDate("")
    //         updateMap("")
    //     }
    // }, [data])

    const { formik, loadingEditEvent, isLoading } = useEvent()

    const [isOpen, setIsOpen] = useState(false)

    const [tab, setTab] = useState(0)

    const query = useQuery();
    const type = query.get('type');
    // const ticketId = query.get('ticketId');
    const { id } = useParams();

    useEffect(() => {
        if (!formik?.values?.name && data?.name) {
            formik?.setFieldValue("address", data?.address)
            formik?.setFieldValue("name", data?.name)
            formik?.setFieldValue("description", data?.description)
            // formik?.setFieldValue("signUpLimit", data?.signUpLimit ? data?.signUpLimit : 0)   
            formik?.setFieldValue("fundRaiser.fundRaisingGoal", data?.fundRaiser.fundRaisingGoal)
            {
                data?.fundRaiser.organizations.map((item, index) => {
                    formik?.setFieldValue(`fundRaiser.organizations[${index}]`, item._id)
                })
            }
            formik?.setFieldValue("ticketing", data?.ticketing)
            formik?.setFieldValue("ticketing", data?.ticketing)
            {
                data?.recurrence.daysOfWeek.map((item, index) => {
                    formik?.setFieldValue(`recurrence[daysOfWeek][${index}]`, item)
                })
            }
            formik?.setFieldValue("recurrence.endType", data?.recurrence.endType)
            formik?.setFieldValue("recurrence.frequency", data?.recurrence.frequency)
            formik?.setFieldValue("recurrence.totalOccurrences", data?.recurrence.totalOccurrences)
            formik?.setFieldValue("recurrence.interval", data?.recurrence.interval)

            formik?.setFieldValue("category", data?.category?._id)
            formik?.setFieldValue("privacy", data?.privacy)
            formik?.setFieldValue("address", data?.address)
            formik?.setFieldValue("photo", data?.photo)
            formik?.setFieldValue("eventEndDate", data?.eventEndDate)
            formik?.setFieldValue("endTime", data?.endTime)
            updateMarker({
                lat: data.loc.coordinates[1],
                lng: data.loc.coordinates[0]
            })
        }
    }, [formik?.values, data])


    const clickHandler = () => {
        if (tab === 1) {
            if (id) {
                navigate(`/dashboard/event/edit/${id}?type=ticket&index=0`)
            } else {
                navigate("/dashboard/event/create?type=ticket&index=0")
            }
        } else if (tab === 2) {
            if (id) {
                navigate(`/dashboard/event/edit/${id}?type=recurrence`)
            } else {
                navigate("/dashboard/event/create?type=recurrence")
            }
        } else if (tab === 3) {
            if (id) {
                navigate(`/dashboard/event/edit/${id}?type=fundraising`)
            } else {
                navigate("/dashboard/event/create?type=fundraising")
            }
        } else if (tab === 4) {
            if (id) {
                navigate(`/dashboard/event/edit/${id}?type=fundraising`)
            } else {
                navigate("/dashboard/event/create?type=fundraising")
            }
        }
        setIsOpen(false)
    }

    const closeHandler = () => {
        if (tab === 0) {
            setTab(4)
        } else {
            navigate("/dashboard/event/create?type=fundraising")
        }
    }

    return (
        <LoadingAnimation loading={loadingEvent} >
            <FormikProvider value={formik}>
                <div className=" w-full flex flex-col gap-4 " >
                    <div className=" w-full flex items-center justify-between " >
                        <PageHeader back={true} header={history?.pathname?.includes("edit") ? "Edit Event" : type === "editticket" ? "Edit Ticket Type" : type === "fundraising" ? "Fundraising Details" : type === "ticketdetails" ? "Ticket Details" : type === "ticket" ? "Add Ticket" : type === "recurrence" ? "Event Recurrence" : "Create New Event"} body={type === "editticket" ? "" : type === "fundraising" ? "Enter the required Fundraising information below." : (type === "ticket" || type === "ticketdetails") ? "Enter the required Ticket information below." : "Enter the required information below."} />
                    </div>
                    {!type && (
                        <InformationForm setOpen={setIsOpen} formik={formik} data={data} setTab={setTab} />
                    )}
                    {type === "recurrence" && (
                        <EventRecurrence setOpen={setIsOpen} formik={formik} data={data} setTab={setTab} />
                    )}
                    {type === "ticket" && (
                        <EventTicket formik={formik} data={data} setTab={setTab} />
                    )}
                    {type === "editticket" && (
                        <EditEventTicket formik={formik} setTab={setTab} />
                    )}
                    {type === "ticketdetails" && (
                        <EventTicketDetails setOpen={setIsOpen} formik={formik} data={data} setTab={setTab} />
                    )}
                    {type === "fundraising" && (
                        <EventFundraising formik={formik} data={data} setTab={setTab} />
                    )}
                    {type === "details" && (
                        <EventDetailPreview isLoading={loadingEditEvent || isLoading} formik={formik} data={data} />
                    )}
                </div>

                <ModalLayout width="max-w-[400px]" open={isOpen} setOpen={() => setIsOpen(false)} >
                    <div className=" w-full flex flex-col gap-2 items-center text-center py-4 " >
                        <Text className=" font-bold  text-primary " >{tab === 1 ? "Is This A Paid Ticketed event?" : tab === 2 ? "Is This A Recurring event?" : tab === 3 ? "Delete Ticket Type?" : tab === 4 ? "Do You want To Use This Event For A fundraiser?" : ""}</Text>
                        {tab === 3 && (
                            <Text className=" text-primary  text-opacity-50 text-xs mb-4 " >{`Are you sure you want to delete this ticket type? This action cannot be undone.`}</Text>
                        )}
                        <div className=" w-full flex gap-4 pt-3 justify-center " >

                            <CustomButton onClick={clickHandler} type="button" width="150px" height="40px" rounded="999px" >Yes</CustomButton>
                            <CustomButton onClick={closeHandler} type="button" color="#CC1B1B" width="150px" height="40px" bgColor="white" rounded="999px" >Cancel</CustomButton>
                        </div>
                    </div>
                </ModalLayout>
            </FormikProvider>
        </LoadingAnimation>
    )
}

