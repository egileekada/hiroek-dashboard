import { Text } from "@radix-ui/themes";
import PageHeader from "../../components/shared/pageHeader";
import { BackWhiteIcon, CalendarIcon, EditIcon, LocationIcon, TrashIcon, TwoChatIcon } from "../../svg";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import { useEventDetail } from "../../global-state/useEventDetails";
import { dateFormat } from "../../utils/dateFormat";
import useEvent from "../../hooks/useEvent";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import { useMap } from "../../global-state/useMapStore";
import { useEffect } from "react";
import MapWithClickMarker from "../../components/shared/map_component/newMap";
import { textLimit } from "../../utils/textlimit";


export default function EventDetailPage() { 

    const router = useNavigate()

    const { loadingSingleEvent } = useEvent()

    const { event } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);

    useEffect(() => {
        updateMap(event?.address)
    }, [])

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full lg:flex hidden items-center justify-between " >
                <PageHeader back={true} header="Event Details" body="Effortless Event Creation and Community Engagement." />
                <div className=" gap-3 w-fit flex ">
                    <div className=" w-[160px] " >
                        <CustomButton onClick={() => router(`/dashboard/event/edit/${event?._id}`)} hasFrontIcon={true} icon={
                            <EditIcon />
                        } >
                            Edit Event
                        </CustomButton>
                    </div>
                    <div className=" w-[160px] " >
                        <CustomButton bgColor="#CE4646" onClick={() => router("/dashboard/report/post")} hasFrontIcon={true} icon={
                            <TrashIcon />
                        } >
                            Delete Event
                        </CustomButton>
                    </div>
                </div>
            </div>
            {/* <div className=" w-full lg:block hidden " >
                <PageHeader back={true} header="Event Details" body="Effortless Event Creation and Community Engagement." />
            </div> */}
            <LoadingAnimation loading={loadingSingleEvent} >
                <div className=" w-full flex lg:flex-row flex-col pb-4 gap-6 text-primary " >
                    <div className=" w-full h-fit flex flex-col rounded-[44px] lg:pb-8 pb-6 lg:p-8 " style={{ boxShadow: "0px 4px 30px 0px #0000000D" }} >
                        <div className=" w-full h-[316px] bg-green-700 rounded-b-3xl lg:rounded-3xl relative " >
                            <img src={event.photo} alt={event?.name} className=" w-full h-full rounded-b-3xl lg:rounded-3xl object-cover " />
                            <div role="button" onClick={() => router(-1)} className=" cursor-pointer lg:hidden w-11 h-11 absolute top-6 z-10 left-4 rounded-md bg-[#FFFFFF33] flex justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                <BackWhiteIcon />
                            </div>
                            <div role="button" onClick={() => router("/dashboard/event/support")} className=" cursor-pointer z-10 w-fit h-fit absolute top-6 right-4 " >
                                <div className=" w-11 h-11 rounded-md bg-[#FFFFFF33] relative flex justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                    <div className=' absolute -top-3 -left-3 w-6 h-6 text-primary bg-white rounded font-semibold text-[10px] tracking-[0.5%] flex justify-center items-center ' >
                                        6
                                    </div>
                                    <TwoChatIcon />
                                </div>
                            </div>
                        </div>
                        <div className=" w-full px-4 relative z-20 -mt-[25%]  " >
                            <div className=" p-5 text-primary w-full bg-white flex flex-col rounded-[14px] " style={{ boxShadow: "0px 3px 10px 0px #0000000D" }} >
                                <Text className=" font-bold " >{event?.name}</Text>
                                <div className=" flex items-center gap-2 mt-2 " >
                                    <div className=" w-fit text-primary text-opacity-50 " >
                                        <LocationIcon />
                                    </div>
                                    <Text className=" font-semibold text-sm " >{textLimit(event?.address, 40)}</Text>
                                </div>
                                <div className=" flex items-center gap-2 " >
                                    <div className=" w-fit text-primary text-opacity-50 " >
                                        <CalendarIcon />
                                    </div>
                                    <Text className=" font-semibold text-sm " >{dateFormat(event?.endTime)}</Text>
                                </div>
                                <div className='flex items-center mt-2 text-black ' >
                                    <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                                    <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                                    <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' />
                                    <Text className=' ml-2 font-semibold ' >50K+ Members</Text>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex flex-col lg:px-0 px-4 lg:pt-4 pt-8 " >
                            <Text className=" font-bold mt-5 text-lg " >Description</Text>
                            <Text className=" text-primary text-opacity-90 font-medium !leading-[18px] mt-2 " >{event?.description}</Text>
                            <Text className=" font-bold mt-5 text-lg " >Venue & Location</Text>
                            <div className=" w-full rounded-[12px] h-auto mt-2" >
                                <MapWithClickMarker />
                            </div>
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                        {/* <div style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }} className=" w-full h-[384px] rounded-[44px] p-6 " >

                        </div> */}
                        <div style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }} className=" w-full rounded-[44px] p-6 bg-white text-primary " >
                            <div className=" w-full flex items-center justify-between " >
                                <div className=" flex flex-col " >
                                    <Text className=" font-bold text-lg " >Donations</Text>
                                    <Text className=" font-medium text-sm text-[#858D9D] " >Recent Donations in This Month</Text>
                                </div>
                            </div>
                            <div className=" w-full pt-6 flex flex-col gap-4 " >
                                <LoadingAnimation loading={false} length={0} >
                                    <></>
                                    {/* {data?.map((item, index) => {
                                        return (
                                            <div key={index + item} className=" flex w-full items-center justify-between " >
                                                <div className=" flex gap-3 " >
                                                    <div className=" w-10 h-10 rounded-lg bg-[#E0E2E7] " />
                                                    <div className=" flex flex-col " >
                                                        <Text className=" text-sm font-bold tracking-[0.5%] " >Jack Crawford</Text>
                                                        <Text className=" text-sm font-semibold tracking-[0.5%] text-[#667085] " >Today</Text>
                                                    </div>
                                                </div>
                                                <Text className=" tracking-[0.5%] font-extrabold " >£1,240</Text>
                                            </div>
                                        )
                                    })} */}
                                </LoadingAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingAnimation>
            <div className=" gap-4 flex-col w-full flex lg:hidden p-6 px-4 ">
                <CustomButton onClick={() => router(`/dashboard/event/edit/${event?._id}`)} hasFrontIcon={true} icon={
                    <EditIcon />
                } >
                    Edit Event
                </CustomButton>
                <CustomButton bgColor="#CE4646" onClick={() => router("/dashboard/report/post")} hasFrontIcon={true} icon={
                    <TrashIcon />
                } >
                    Delete Event
                </CustomButton>
            </div>
        </div>
    )
}
