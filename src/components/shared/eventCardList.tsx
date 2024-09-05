import { Text } from '@radix-ui/themes'
import { CalendarIcon, LocationIcon } from '../../svg'
import { useNavigate } from 'react-router-dom';

interface IProps {
    title?: string;
    filter?: boolean;
    mobile?: boolean
}

export default function EventCardList({ title, filter, mobile }: IProps) {

    const array = ["November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024"]

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-2 ' >
            <div className={` w-full flex justify-between gap-1 lg:flex-row flex-col-reverse `} >
                <div className=' w-full flex justify-between items-center ' >
                    <Text className=' lg:text-xl text-primary font-black ' >{title ?? "Events"}</Text>
                    <Text role='button' className=' text-xs text-primary text-opacity-50 font-medium lg:hidden cursor-pointer ' >See all</Text>
                </div>
                {filter && (
                    <div className=' lg:w-auto w-full flex gap-3 ' >
                        <button className=' bg-primary bg-opacity-15 h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm text-primary text-opacity-75 ' >Past</button>
                        <button className=' bg-primary bg-opacity-30 h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm text-primary text-opacity-75 ' >Ongoing</button>
                        <button className=' bg-primary bg-opacity-30 h-[30px] rounded-[22px] lg:w-fit font-bold w-full lg:px-6 text-sm text-primary text-opacity-75 ' >Upcoming</button>
                    </div>
                )}
            </div>
            {!mobile && (
                <div className={` w-full overflow-x-auto flex `} >
                    <div className={` w-fit flex gap-4 `} >
                        {array?.map((item, index) => {
                            return (
                                <div onClick={()=> router("/dashboard/event/details")} role='button' key={index} className=' w-[346px] h-[186px] rounded-2xl bg-green-500 relative ' >
                                    <div className=' absolute bottom-2 inset-x-2 text-white flex items-center justify-between rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                        <div className=' flex-col flex gap-1 ' >
                                            <Text className=' text-xs font-semibold ' >Coldplay : Music of the Spheres</Text>
                                            <div className=' flex gap-2 items-center ' >
                                                <LocationIcon />
                                                <Text className=' text-xs font-medium ' >Gelora Bung Karno Stadium</Text>
                                            </div>
                                            <div className=' flex gap-2 items-center ' >
                                                <CalendarIcon />
                                                <Text className=' text-xs font-medium ' >{item}</Text>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col ' >
                                            <Text className=' text-[10px] font-medium ' >Tickets</Text>
                                            <Text className=' font-semibold ' >£100.00</Text>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
            {mobile && (
                <div className={` w-full grid grid-cols-2 gap-4 pb-6 `} >
                    {array?.map((item, index) => {
                        return (
                            <div onClick={()=> router("/dashboard/event/details")} role='button' key={index} className=' w-full rounded-2xl relative p-2 ' style={{ boxShadow: "0px 2px 10px 0px #00000014" }} >
                                <div className=' w-full h-[102px] bg-red-500 rounded-lg ' >

                                </div>
                                <div className=' flex mt-3 flex-col gap-1 ' >
                                    <Text className=' text-[10px] font-semibold ' >TLC: London Marathon 24</Text>
                                    <div className=' mt-2 flex gap-2 items-center ' >
                                        <LocationIcon />
                                        <Text className=' text-[10px] font-medium ' >Gelora Bung Karno Stadium</Text>
                                    </div>
                                    <div className=' flex gap-2 items-center ' >
                                        <CalendarIcon />
                                        <Text className=' text-[10px] font-medium ' >{item}</Text>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
