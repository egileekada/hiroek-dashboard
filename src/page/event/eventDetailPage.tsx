import { Text } from "@radix-ui/themes";
import PageHeader from "../../components/shared/pageHeader";
import { BackWhiteIcon, ClockIcon, DonateIcon, EditIcon, EventIcon, HistoryIcon, LocationIcon, QRIcon, TrashIcon, TwoChatIcon } from "../../svg";
import { useNavigate, useParams } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import { useEventDetail } from "../../global-state/useEventDetails";
import { dateFormat, timeFormat } from "../../utils/dateFormat";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import ChartGraph from "../../components/shared/chartGraph";
import { formatNumberWithK } from "../../utils/formatNumberWithK";
import { formatNumber } from "../../utils/numberFormat";
import useGetEventData from "../../hooks/eventHooks/useGetEventData";


export default function EventDetailPage() {

    const router = useNavigate()
    const { getSingleEventData } = useGetEventData()
    const { event } = useEventDetail((state) => state)
    const { id } = useParams();

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full lg:flex hidden items-center justify-between " >
                <PageHeader path={"/dashboard/event"} back={true} header="Event Details" body="Effortless Event Creation and Community Engagement." />
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
            <LoadingAnimation loading={getSingleEventData()?.isLoading} >
                <div className=" w-full flex lg:flex-row flex-col pb-4 gap-6 text-primary " >
                    <div className=" w-full h-fit flex flex-col rounded-[44px] lg:pb-8 pb-6 lg:p-8 " >
                        <div className=" w-full h-[240px] bg-green-700 rounded-b-3xl lg:rounded-3xl relative " >
                            <img src={event?.photo} alt={event?.name} className=" w-full h-full rounded-b-3xl lg:rounded-3xl object-cover " />
                            <div role="button" onClick={() => router("/dashboard/event")} className=" cursor-pointer lg:hidden w-11 h-11 absolute top-6 z-10 left-4 rounded-md bg-white lg:bg-[#FFFFFF33] flex justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                <BackWhiteIcon color="black" />
                            </div>
                            <div role="button" onClick={() => router(`/dashboard/event/scanner/${id}`)} className=" cursor-pointer text-xs lg:hidden w-fit px-3 h-11 absolute top-6 z-10 right-4 rounded-md bg-white lg:bg-[#FFFFFF33] flex gap-2 justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                Scan Tickets
                                <QRIcon />
                            </div>
                            <div role="button" onClick={() => router(`/dashboard/event/scan/history/${id}`)} className=" cursor-pointer text-xs lg:flex hidden w-fit px-3 h-11 absolute top-6 z-10 right-4 rounded-md bg-white gap-2 justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                <HistoryIcon />
                                Scan History
                            </div>
                        </div>
                        <div className=" w-full px-4 relative z-20 -mt-[80px]  " >
                            <div className=" py-5 px-4 gap-[6px] text-primary w-full bg-white flex flex-col rounded-[14px] " style={{ boxShadow: "0px 3px 10px 0px #0000000D" }} >
                                <Text className=" font-bold " >{event?.name}</Text>
                                <div className=" flex gap-2 mt-2 " >
                                    <div className=" w-fit text-primary text-opacity-50 mt-[2px] " >
                                        <LocationIcon block={true} />
                                    </div>
                                    <Text className=" font-semibold text-sm " >{event?.address}</Text>
                                </div>
                                <div className=" flex items-center gap-2 " >
                                    <div className=" w-fit text-primary text-opacity-50 " >
                                        <DonateIcon />
                                    </div>
                                    <Text className=" font-semibold text-sm mr-2 " >{dateFormat(event?.endTime)}</Text>
                                    <div className=" w-fit text-primary text-opacity-50 " >
                                        <ClockIcon />
                                    </div>
                                    <Text className=" font-semibold text-sm " >{timeFormat(event?.endTime)}</Text>
                                </div>
                                {event?.members?.length > 0 && (
                                    <div className='flex items-center mt-2 bg-[#37137F4D] px-3 rounded-full w-fit h-[40px] mx-auto text-black ' >
                                        <div className=' w-7 h-7 rounded-full'>
                                            <img src={event?.members[0]?.photo} alt={event?.members[0]?._id} className=" w-full h-full object-cover rounded-full " />
                                        </div>
                                        {event?.members?.length > 1 && (
                                            <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                                <img src={event?.members[1]?.photo} alt={event?.members[1]?._id} className=" w-full h-full object-cover rounded-full " />
                                            </div>
                                        )}
                                        {event?.members?.length > 2 && (
                                            <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                                <img src={event?.members[2]?.photo} alt={event?.members[2]?._id} className=" w-full h-full object-cover rounded-full " />
                                            </div>
                                        )}
                                        {/* <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' /> */}
                                        <Text className=' ml-2 font-semibold text-xs text-[#37137F] ' >{formatNumberWithK(event?.members?.length)} Attending</Text>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className=" w-full flex gap-3 px-4 pt-5 " >
                            <CustomButton height="44px" fontSize="11px" onClick={() => router(`/dashboard/event/dashboard/${event?._id}`)} hasFrontIcon={true} icon={
                                <EventIcon />
                            } >
                                Event Dashboard
                            </CustomButton>
                            <CustomButton height="44px" fontSize="11px" onClick={() => router(`/dashboard/event/support/${event?._id}`)} hasFrontIcon={true} icon={
                                <TwoChatIcon />
                            } >
                                Event Messages
                            </CustomButton>
                        </div>
                        <div className=" w-full flex flex-col lg:px-0 px-4 lg:pt-4 pt-4 " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <Text className=" font-extrabold text-xs " >About Event</Text>
                            </div>
                            <Text className=" text-primary text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{event?.description}</Text>

                        </div>
                    </div>
                    {event?.fundRaiser?.fundRaisingGoal && (
                        <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                            <div className=" w-full rounded-[44px] flex flex-col lg:p-6 " >
                                <Text className=" text-xl tracking-[1%] text-primary " >Fundraising Target</Text>
                                <Text className=" text-[#858D9D] " >This is the target for this event.</Text>
                                <ChartGraph />
                                <Text className=" text-[#667085] font-medium text-center text-sm " >You received donations of <span style={{ color: "#37137F" }} >{formatNumber(event?.fundRaiser?.fundRaised)}</span></Text>
                                <div className=" w-full px-2 flex justify-between pt-2 " >
                                    <div className=" flex flex-col items-center" >
                                        <Text className=" font-medium text-[#667085] text-sm " >Target</Text>
                                        <Text className=" font-semibold text-xl text-[#1D1F2C] " >£{formatNumberWithK(event?.fundRaiser?.fundRaisingGoal)}</Text>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <Text className=" font-medium text-[#667085] text-sm " >Donated</Text>
                                        <Text className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.fundRaiser?.fundRaised)}</Text>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <Text className=" font-medium text-[#667085] text-sm " >Today</Text>
                                        <Text className=" font-semibold text-xl text-[#1D1F2C] " >£0k</Text>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className=" gap-4 flex-col w-full flex lg:hidden p-6 px-4 ">
                    <CustomButton onClick={() => router(`/dashboard/event/edit/${event?._id}`)} hasFrontIcon={true} icon={
                        <EditIcon />
                    } >
                        Edit Event
                    </CustomButton>
                    {/* <CustomButton bgColor={"#B00062"} className=" px-3 " width="100%" type="button" hasFrontIcon={true} icon={
                        <ShareIcon />
                    } >
                        Share
                    </CustomButton> */}
                    <CustomButton bgColor="#CE4646" onClick={() => router("/dashboard/report/post")} hasFrontIcon={true} icon={
                        <TrashIcon />
                    } >
                        Delete Event
                    </CustomButton>
                </div>
            </LoadingAnimation>
        </div>
    )
}
