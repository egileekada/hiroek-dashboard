import { CalendarIcon } from "@mui/x-date-pickers"
import { useNavigate } from "react-router-dom"
import { useEventDetail } from "../../global-state/useEventDetails"
import { LocationIcon } from "../../svg"
import { dateFormat } from "../../utils/dateFormat"
import { textLimit } from "../../utils/textlimit"
import { Text } from "@radix-ui/themes"
import { formatNumber } from "../../utils/numberFormat"
import useGetEventData from "../../hooks/eventHooks/useGetEventData"
import LoadingAnimation from "../shared/loadingAnimation"

export default function ViewEvent({ index }: { index: string }) {

    const router = useNavigate()
    const { updateEvent } = useEventDetail((state) => state)
    const { data: item, isLoading } = useGetEventData()?.getSingleEventData(index)

    const clickHandler = () => {
        updateEvent({} as any)
        router(`/dashboard/event/details/${item?._id}`)
    }

    return (
        <LoadingAnimation loading={isLoading} >
            <div onClick={() => clickHandler()} role='button' className=' w-full h-[200px] rounded-2xl bg-white shadow-sm relative ' >
                <img src={item?.photo} alt={item?.name} className=' w-full h-full object-cover absolute inset-0 rounded-2xl ' />
                <div style={{ backdropFilter: "blur(30px)" }} className=' absolute bottom-2 inset-x-2 text-white flex items-center justify-between rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                    <div className=' flex-col flex gap-1 ' >
                        <Text className=' text-xs font-semibold ' >{textLimit(item?.name as string, 20)}</Text>
                        <div className=' flex gap-2 items-center ' >
                            <LocationIcon />
                            <Text className=' text-xs font-medium ' >{textLimit(item?.address as string, 20)}</Text>
                        </div>
                        <div className=' flex gap-2 items-center ' >
                            <CalendarIcon />
                            <Text className=' text-xs font-medium ' >{dateFormat(item?.endTime)}</Text>
                        </div>
                    </div>
                    {Number(item?.ticketing?.length) === 0 ?
                        <div className=' bg-[#FFFFFF80] text-white text-xs flex justify-center items-center font-medium h-[24px] px-2 rounded-[4px] ' >
                            Free Event
                        </div> :
                        <div className=' flex flex-col ' >
                            <Text className=' text-[10px] font-medium ' >Tickets</Text>
                            <Text className=' inter-all ' >{formatNumber(item?.ticketing[0].ticketPrice)}</Text>
                        </div>
                    }
                </div>
            </div>
        </LoadingAnimation>
        // <></>
    )
}
