import { Text } from "@radix-ui/themes";
import PageHeader from "../../components/shared/pageHeader";
import { BackWhiteIcon, CalendarIcon2, ChatIcon, ClockIcon, LocationIcon, TicketIcon } from "../../svg";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import { useEventDetail } from "../../global-state/useEventDetails";
import { dateFormat, timeFormat } from "../../utils/dateFormat";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import ChartGraph from "../../components/shared/chartGraph";
import { formatNumberWithK } from "../../utils/formatNumberWithK";
import { formatNumber } from "../../utils/numberFormat";
import useGetEventData from "../../hooks/eventHooks/useGetEventData";
import { textLimit } from "../../utils/textlimit";
import CountdownTimer from "../../components/shared/CountDownTimer";
import { useState } from "react";
import ModalLayout from "../../components/shared/modalLayout";
import useConversation from "../../hooks/eventHooks/useConversation";
import { useConversationHook } from "../../global-state/useConversationHook";
// import { useDetails } from "../../global-state/useUserDetails";
// import toast from "react-hot-toast";
import ShareBtn from "../../components/shared/shareBtn";


export default function EventDetailByMemberPage() {

    const router = useNavigate()
    const { getSingleEventData } = useGetEventData()
    const { event } = useEventDetail((state) => state)

    // const { userId } = useDetails((state) => state);

    const [open, setOpen] = useState(false)
    const { createConversation, loadingConversation } = useConversation()
    const { updateConversation, data: condata } = useConversationHook((state) => state)

    const clickHandler = () => {
        createConversation({
            userTwo: event?.admin?._id,
            userType: event?.adminType+"",
            userTwoEvent: event?._id + ""
        })
        updateConversation({
            ...condata,
            name: event?.admin?.fullname,
            photo: event?.admin?.photo
        }) 
    } 
 
    return (
        <div className=" w-full relative" >
            <div className=' w-full flex flex-col gap-6 ' >
                <div className=" w-full lg:flex hidden items-center justify-between " >
                    <PageHeader path={"/dashboard/event"} back={true} header="Event Details" body="Effortless Event Creation and Community Engagement." />
                </div>
                <LoadingAnimation loading={getSingleEventData()?.isLoading} >
                    <div className=" w-full flex lg:flex-row flex-col pb-4 gap-6 text-primary " >
                        <div className=" w-full h-fit flex flex-col lg:rounded-[44px] lg:pb-8 pb-6 lg:p-8 " >
                            <div className=" w-full lg:h-[300px] h-[300px] relative " >
                                <img src={event?.photo} alt={event?.name} className=" w-full h-full lg:rounded-b-3xl lg:rounded-3xl object-cover " />
                                <div role="button" onClick={() => router("/dashboard/event")} className=" cursor-pointer lg:hidden w-11 h-11 absolute top-6 z-20 left-4 rounded-md bg-white lg:bg-[#FFFFFF33] flex justify-center items-center " style={{ boxShadow: "0px 4px 4px 0px #00000014" }} >
                                    <BackWhiteIcon color="black" />
                                </div>
                                <div className=" flex gap-3 absolute right-4 z-30 top-6 " >
                                    {/* <div className=" w-11 h-11 rounded-full flex justify-center items-center bg-white bg-opacity-30 " style={{ backdropFilter: "blur(12px)" }} >
                                    <HeartIcon2 />
                                </div> */}
                                    <ShareBtn id={event?._id} type="EVENT" />
                                </div>
                                <div className=" absolute z-10 inset-0 bg-black bg-opacity-50 " />
                                <div className=" w-full absolute !bottom-2 z-20 px-3  " >
                                    <div className=" w-full rounded-2xl flex flex-col gap-2 " >

                                        <div className=" w-full flex gap-4" >
                                            <div role="button" onClick={() => setOpen(true)} className=" w-full flex items-center justify-center gap-2 px-2 bg-white bg-opacity-30 rounded-[10px] h-[50px] " >
                                                {/* <di */}
                                                <div className=" w-8 h-8 rounded-full " >
                                                    <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo} alt="image" />
                                                </div>
                                                <div className=" flex flex-col items-center justify-center " >
                                                    <div className=" font-bold text-[10px] flex justify-center items-center text-white bg-[#37137FBF] rounded h-[18px] w-[75px] " >
                                                        Event Host:
                                                    </div>
                                                    <p className=" font-bold text-[12px] text-center text-white " >{textLimit(event?.admin?.fullname+" john dfbhd idfnkdk ", 14) ?? textLimit(event?.admin?.name+" john dfbhd idfnkdk ", 14)}</p>
                                                </div>
                                            </div>
                                            <div className=" w-full " > 
                                                {/* {!event?.members?.some(product => product?._id === userId) && (
                                                    <CustomButton onClick={()=> joinEvent(event?._id)} loading={loadingJoinEvent} bgColor="#ffffff" rounded="44px" width="100%" height="50px" color="#37137f"  >Join Event</CustomButton>
                                                )} */}
                                            </div>
                                        </div>
                                        <div className=" w-full p-4 flex flex-col gap-1 rounded-[10px] bg-white " >
                                            <p className=" font-bold text-xs text-primary " >Walk for Water: A Step Towards Clean Water</p>
                                            <div className=" w-full flex gap-3 items-center justify-between " >
                                                <div className=" flex gap-2 items-center " >
                                                    <div className=" w-fit text-primary text-opacity-50 mt-[2px] " >
                                                        <LocationIcon block={true} />
                                                    </div>
                                                    <Text className=" font-semibold text-xs " >{textLimit(event?.address, 40)}</Text>
                                                </div>
                                            </div>
                                            <div className=" flex items-center gap-2 " >
                                                <div className=" w-fit text-primary text-opacity-50 " >
                                                    <CalendarIcon2 />
                                                </div>
                                                <Text className=" font-semibold text-xs mr-2 " >{dateFormat(event?.endTime)}</Text>
                                                <div className=" w-fit text-primary text-opacity-50 " >
                                                    <ClockIcon />
                                                </div>
                                                <Text className=" font-semibold text-xs " >{timeFormat(event?.endTime)}</Text>
                                            </div> 
                                            <div className=" flex items-center gap-2 " >
                                                <div className=" w-fit text-primary text-opacity-50 " >
                                                    <TicketIcon />
                                                </div>
                                                {/* {event?.signUpLimit > 0 && ( */}
                                                    <Text className=" font-bold text-xs " >{event?.signUpLimit} Spot(s) Available</Text>
                                                {/* )}
                                                {event?.signUpLimit < 1 && (
                                                    <Text className=" font-bold text-xs " >Sold Out</Text>
                                                )} */}
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 " >
                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" font-bold text-xs " >Event Description</Text>
                                </div>
                                <Text className=" text-primary text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{event?.description}</Text>
                            </div>
                            <div className=" px-4 w-full mt-4 " >
                                <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:py-4 rounded-[10px] py-4 bg-[#37137FBF] text-white " >
                                    <div className=" w-fit bg-[#37137F] text-white rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                        <Text className=" font-bold text-xs " >Recipient Organisation:</Text>
                                    </div>
                                    <Text className=" text-xs font-bold mt-2 " >{event?.fundRaiser?.organizations[0]?.name}</Text>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex flex-col relative gap-6 lg:px-0 px-4 " >
                            {event?.fundRaiser?.fundRaisingGoal && (
                                <div className=" w-full rounded-[44px] flex flex-col lg:p-6 items-center " >
                                    <Text className="  text-primary " >Fundraising Goal</Text>
                                    <Text className=" text-[#858D9D] text-xs font-medium " >Funds needed to make a difference.</Text>
                                    <ChartGraph />
                                    <Text className=" text-[#667085] font-medium text-center text-sm " >This event received donations of <span style={{ color: "#37137F" }} >{formatNumber(event?.fundRaiser?.fundRaised)}</span> today.</Text>
                                    <div className=" w-full px-2 flex justify-between pt-2 " >
                                        <div className=" flex flex-col items-center" >
                                            <Text className=" font-medium text-[#667085] text-sm " >Target</Text>
                                            <Text className=" font-semibold text-xl text-[#1D1F2C] " >£{formatNumberWithK(event?.fundRaiser?.fundRaisingGoal / 100)}</Text>
                                        </div>
                                        <div className=" flex flex-col items-center" >
                                            <Text className=" font-medium text-[#667085] text-sm " >Donated</Text>
                                            <Text className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.fundRaiser?.fundRaised)}</Text>
                                        </div>
                                        {/* <div className=" flex flex-col items-center" >
                                            <Text className=" font-medium text-[#667085] text-sm " >Today</Text>
                                            <Text className=" font-semibold text-xl text-[#1D1F2C] " >£0k</Text>
                                        </div> */}
                                    </div>
                                </div>
                            )}
                            <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 " >
                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" font-extrabold text-xs " >Event Countdown</Text>
                                </div>
                                {/* <Text className=" text-primary text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{event?.description}</Text> */}
                                <CountdownTimer targetTime={event?.endTime} />
                            </div>
                        </div>
                    </div>
                </LoadingAnimation>
            </div>
            <ModalLayout onIcon={true} width=" max-w-[300px] " rounded="24px" open={open} setOpen={setOpen} >
                <div className=" pb-3 px-4 flex flex-col gap-4 " >
                    <div className=" w-full flex items-center justify-center gap-3 px-2 bg-[#37137F4D] bg-opacity-30 rounded-[10px] py-3 " >
                        {/* <di */}
                        <div className=" w-[44px] h-[44px] rounded-full " >
                            <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo} alt="image" />
                        </div>
                        <div className=" flex flex-col justify-center gap-1 " >
                            <div className=" font-bold text-[12px] flex justify-center items-center text-white bg-[#37137FBF] rounded h-[20px] w-[80px] " >
                                Event Host:
                            </div>
                            <p className=" font-bold text-[14px] text-center text-[#37137F] " >{event?.admin?.fullname ?? event?.admin?.name}</p>
                        </div>
                    </div>

                    <CustomButton height="44px" fontSize="11px" loading={loadingConversation} onClick={() => clickHandler()} hasFrontIcon={true} icon={
                        <ChatIcon color="#fff" size="18" />
                    } >
                        Message Event Host
                    </CustomButton>
                    <div onClick={()=> setOpen(false)} role="button" className=" w-full flex justify-center items-center text-[#CC1B1B] font-semibold text-sm " >
                        Close
                    </div>
                </div>
            </ModalLayout>
        </div>
    )
}
