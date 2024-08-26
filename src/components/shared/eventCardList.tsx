import { Text } from '@radix-ui/themes'
import { CalendarIcon, LocationIcon } from '../../svg' 

interface IProps {
    title?: string;
    filter?: boolean
}

export default function EventCardList({ title, filter }: IProps) {

    const array = ["November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024"]

    return (
        <div className=' w-full flex flex-col gap-2 ' >
            <div className=' w-full flex justify-between gap-1 ' >
                <Text className=' text-xl text-primary font-black ' >{title ?? "Events"}</Text>
                {filter && (
                    <div className=' flex gap-3 ' >
                        <button className=' bg-primary bg-opacity-15 h-30px rounded-[22px] px-6 text-sm font-medium text-primary text-opacity-75 ' >Past</button>
                        <button className=' bg-primary bg-opacity-30 h-30px rounded-[22px] px-6 text-sm font-medium text-primary text-opacity-75 ' >Ongoing</button>
                        <button className=' bg-primary bg-opacity-30 h-30px rounded-[22px] px-6 text-sm font-medium text-primary text-opacity-75 ' >Upcoming</button>
                    </div>
                )}
            </div>
            <div className=' w-full flex overflow-x-auto  ' >
                <div className=' w-fit flex gap-4 ' >
                    {array?.map((item) => {
                        return (
                            <div key={item} className=' w-[346px] h-[186px] rounded-2xl bg-green-500 relative ' >
                                <div className=' absolute bottom-2 inset-x-2 text-white flex items-center justify-between rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                    <div className=' flex-col flex gap-1 ' >
                                        <Text className=' text-xs font-semibold ' >Coldplay : Music of the Spheres</Text>
                                        <div className=' flex gap-2 items-center ' >
                                            <LocationIcon />
                                            <Text className=' text-xs font-medium ' >Gelora Bung Karno Stadium</Text>
                                        </div>
                                        <div className=' flex gap-2 items-center ' >
                                            <CalendarIcon />
                                            <Text className=' text-xs font-medium ' >November 15 2024</Text>
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
        </div>
    )
}
