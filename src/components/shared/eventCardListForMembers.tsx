import { Text } from '@radix-ui/themes'
import { CalendarIcon, LocationIcon } from '../../svg'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePagintion } from '../../global-state/usePagination';
import { dateFormat } from '../../utils/dateFormat';
import { textLimit } from '../../utils/textlimit';
import { formatNumber } from '../../utils/numberFormat';
import LoadingAnimation from './loadingAnimation';
import { useEventDetail } from '../../global-state/useEventDetails'; 
import { IEvent } from '../../model/event';
import { useMap } from '../../global-state/useMapStore';
import { CiSearch } from "react-icons/ci";
import useGetEventData from '../../hooks/eventHooks/useGetEventData';

interface IProps {
    title?: string;
    filter?: boolean;
    mobile?: boolean;
    details?: string;
}

export default function EventCardMembersList({ title, filter, mobile }: IProps) {

    const router = useNavigate()

    const [searchText, setSearchText] = useState("")

    const { data, isLoading } = useGetEventData().getEventMemberData()

    const { eventFilter, updateFilter } = usePagintion((state) => state)
    const { updateEvent } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);

    const clickHandler = (item: IEvent) => {
        updateEvent(item)
        updateMap(item?.address)
        router(`/dashboard/event/details/bymembers/${item?._id}`)
    }

    return (
        <div className=' w-full flex flex-col gap-2 ' >
            <div className={` w-full flex justify-between gap-3 flex-col `} >
                {filter && (
                    <div className=" w-full lg:hidden relative  " >
                        <div className=' w-9 h-full absolute top-0 flex text-[#37137F80] items-center justify-center '>
                            <CiSearch size={"20px"} />
                        </div>
                        <input type={"search"} placeholder={"Search"} value={searchText} onChange={(e) => setSearchText(e.target.value)} className=" h-[48px] pl-8 px-3 border-[#37137F80] border-[2px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] outline-none rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
                    </div>
                )}
                {filter && (
                    <div className=' lg:w-auto w-full flex gap-3 ' >
                        <button onClick={() => updateFilter("past")} className={` bg-primary ${eventFilter === "past" ? " text-white " : " text-primary bg-opacity-5 text-opacity-75 "} h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm  `} >Past</button>
                        <button onClick={() => updateFilter("present")} className={` bg-primary ${eventFilter === "present" ? " text-white " : " text-primary bg-opacity-5 text-opacity-75 "}  h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm  `} >Ongoing</button>
                        <button onClick={() => updateFilter("future")} className={` bg-primary ${eventFilter === "future" ? " text-white " : " text-primary bg-opacity-5 text-opacity-75 "}  h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm  `} >Upcoming</button>
                    </div>
                )}
                <div className=' w-full flex justify-between gap-3 items-center ' >
                    <div className=' w-full flex flex-col ' >
                        <Text className=' lg:text-xl text-primary font-black ' >{title ?? "Events"}</Text>
                        {/* <Text className=' lg:text-xs text-primary font-medium ' >{details ?? ""}</Text> */}
                    </div>
                    <Text role='button' className=' w-[60px] lg:text-sm text-xs text-primary text-opacity-50 font-normal lg:hidden cursor-pointer ' >See all</Text>
                </div>
            </div>
            {(!mobile) && (
                <div className={` w-full overflow-x-auto flex `} >
                    <LoadingAnimation loading={isLoading} length={data?.length} >
                        <div className={` w-fit flex gap-4 `} >
                            {data?.map((item, index) => {
                                return (
                                    <div onClick={() => clickHandler(item)} role='button' key={index} className=' w-[300px] h-[186px] rounded-2xl bg-white shadow-sm relative ' >
                                        <img src={item?.photo} alt={item?.name} className=' w-full h-full object-cover absolute inset-0 rounded-2xl ' />
                                        <div style={{ backdropFilter: "blur(30px)" }} className=' absolute bottom-2 inset-x-2 text-white flex items-center justify-between rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                            <div className=' flex-col flex gap-1 ' >
                                                <Text className=' text-xs font-semibold ' >{textLimit(item?.name, 20)}</Text>
                                                <div className=' flex gap-2 items-center ' >
                                                    <LocationIcon />
                                                    <Text className=' text-xs font-medium ' >{textLimit(item?.address, 20)}</Text>
                                                </div>
                                                <div className=' flex gap-2 items-center ' >
                                                    <CalendarIcon />
                                                    <Text className=' text-xs font-medium ' >{dateFormat(item.endTime)}</Text>
                                                </div>
                                            </div>
                                            {(Number(item?.eventTicket?.ticketPrice) <= 0 || !item?.eventTicket?.ticketPrice) ?
                                                <div className=' bg-[#FFFFFF80] text-white text-xs flex justify-center items-center font-medium h-[24px] px-2 rounded-[4px] ' >
                                                    Free Event
                                                </div> :
                                                <div className=' flex flex-col ' >
                                                    <Text className=' text-[10px] font-medium ' >Tickets</Text>
                                                    <Text className=' inter-all ' >{formatNumber(item?.eventTicket?.ticketPrice/100)}</Text>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                </div>
            )}
            {(mobile) && (
                <LoadingAnimation loading={isLoading} length={data?.length} >
                    <div className={` w-full grid grid-cols-2 gap-4 pb-6 `} >
                        {data?.map((item, index) => {
                            return (
                                <div onClick={() => clickHandler(item)} role='button' key={index} className=' w-full rounded-2xl relative p-2 ' style={{ boxShadow: "0px 2px 10px 0px #00000014" }} >
                                    <div className=' w-full md:h-[200px] h-[102px] bg-red-500 rounded-lg ' >
                                        <img src={item?.photo} alt={item?.name} className=' w-full h-full object-cover rounded-lg ' />
                                    </div>
                                    <div className=' flex mt-3 flex-col gap-1 ' >
                                        <Text className=' text-[10px] font-semibold ' >{textLimit(item?.name, 20)}</Text>
                                        <div className=' mt-1 flex gap-2 items-center ' >
                                            <LocationIcon />
                                            <Text className=' text-[10px] font-medium ' >{textLimit(item?.address, 18)}</Text>
                                        </div>
                                        <div className=' flex gap-2 items-center ' >
                                            <CalendarIcon />
                                            <Text className=' text-[10px] font-medium ' >{dateFormat(item.endTime)}</Text>
                                        </div>
                                    </div>
                                    <div className=' w-full h-2 ' />
                                </div>
                            )
                        })}
                    </div>
                </LoadingAnimation>
            )}
        </div>
    )
}
