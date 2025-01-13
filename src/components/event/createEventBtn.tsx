import { useEffect, useState } from "react";
import { CalendarIcon, LocationIcon, ShareIcon } from "../../svg";
import { CustomButton } from "../shared";
import ModalLayout from "../shared/modalLayout";
import { Text } from "@radix-ui/themes";
import { useLocation, useNavigate } from "react-router-dom";
import { textLimit } from "../../utils/textlimit";
import { dateFormat } from "../../utils/dateFormat";
import { formatNumber } from "../../utils/numberFormat";
import { useEventDetail } from "../../global-state/useEventDetails";


export default function CreateEventBtn({ loading, submit, open, setOpen, isSuccess }: { loading?: boolean, open: boolean, setOpen: any, submit: any, isSuccess: boolean }) {

    // const [open, setOpen] = useState(false)
    const history = useLocation()
    const [tab, setTab] = useState(0)
    const { createdEvent } = useEventDetail((state) => state)
    const navigate = useNavigate()

    useEffect(() => {
        if (isSuccess) {
            setTab(1)
        }
    }, [isSuccess])

    return (
        <div>
            <CustomButton className=" items-center " width="100%" type="submit" hasIcon={true} >
                {history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"}
            </CustomButton>
            <ModalLayout onIcon={true} width={tab === 0 ? " max-w-[361px] " : " max-w-[361px] max-w-[100%] "} height={tab === 1 ? "100%" : ""} rounded="44px" open={open} setOpen={setOpen} >
                {/* <div className=" w-full h-full flex bg-green-200 " > */}
                {tab === 0 && (
                    <div className=" w-full flex flex-col gap-2 items-center pb-4 " >
                        <Text className=" text-lg font-bold text-primary " >{history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"}</Text>
                        <Text className=" text-primary text-opacity-50 text-xs mb-4 " >{history?.pathname?.includes("edit") ? "Are you sure you want to edit this event?" : "Are you sure you want to create this new event?"}</Text>
                        <CustomButton type="button" onClick={submit} loading={loading} width="200px" rounded="999px" >Yes, Proceed</CustomButton>
                        <CustomButton onClick={() => setOpen(false)} color="#CC1B1B" width="200px" bgColor="white" rounded="999px" >Cancel</CustomButton>
                    </div>
                )}
                {tab === 1 && (
                    <div className=" w-full flex flex-col relative h-full gap-2 items-center lg:pt-0 pt-[20%] pb-4 text-primary  " >
                        <Text className=" text-2xl font-black" >🎉 Cheers! 🎉</Text>
                        <Text className=" text-sm font-semibold " >You have successfully created your event</Text>
                        <Text className=" text-lg font-bold text-center " >{createdEvent?.name}</Text>

                        <div role='button' className=' w-full h-[186px] rounded-2xl bg-blue-500 shadow-sm relative ' >
                            <img src={createdEvent?.photo} alt={createdEvent?.name} className=' w-full h-full object-cover absolute inset-0 rounded-2xl ' />
                            <div style={{ backdropFilter: "blur(30px)" }} className=' absolute bottom-2 inset-x-2 text-white flex items-center justify-between rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                <div className=' flex-col flex gap-1 ' >
                                    <Text className=' text-xs font-semibold ' >{textLimit(createdEvent?.name, 20)}</Text>
                                    <div className=' flex gap-2 items-center ' >
                                        <LocationIcon />
                                        <Text className=' text-xs font-medium ' >{textLimit(createdEvent?.address, 20)}</Text>
                                    </div>
                                    <div className=' flex gap-2 items-center ' >
                                        <CalendarIcon />
                                        <Text className=' text-xs font-medium ' >{dateFormat(createdEvent?.endTime)}</Text>
                                    </div>
                                </div>
                                <div className=' flex flex-col ' >
                                    <Text className=' text-[10px] font-medium ' >Tickets</Text>
                                    <Text className=' font-semibold ' >{formatNumber(createdEvent?.eventTicket?.ticketPrice)}</Text>
                                </div>
                            </div>
                        </div>
                        <div className=" absolute bottom-4 w-full flex flex-col gap-1 " >
                            <Text className=" font-semibold text-xs text-center " >Share the event and start gathering support and awareness</Text>


                            <CustomButton bgColor={"#B00062"} className=" px-3 " width="100%" type="button" hasIcon={true} icon={
                                <ShareIcon />
                            } >
                                Share
                            </CustomButton>
                            <CustomButton onClick={() => navigate("/dashboard/event")} className=" px-3 " width="100%" type="submit" >
                                Done
                            </CustomButton>
                        </div>
                    </div>
                )}
                {/* </div> */}
            </ModalLayout>
        </div>
    )
}
