import { Text } from '@radix-ui/themes'
import { textLimit } from '../util/textlimit'
import { useNavigate } from 'react-router-dom';

interface IProps {
    title?: string;
    notitle?: boolean
}

export default function CommunityCardList({ title, notitle }: IProps) {

    const router = useNavigate()

    const array = ["November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024", "November 15 2024"]

    const text = "Hope Harvesters is A Community dedicated to uplifting underprivileged communities through sustainable development programs, educational initiatives, and health services. Our mission is to harvest hope and create opportunities for a brighter future."

    return (
        <div className=' w-full flex pb-6 flex-col gap-2 ' >
            {!notitle && (
                <Text className=' text-xl text-primary font-black ' >{title ?? "Communities"}</Text>
            )}
            <div className=' w-full flex overflow-x-auto  ' >
                <div className=' w-fit flex gap-4 ' >
                    {array?.map((item) => {
                        return (
                            <div role='button' onClick={()=> router("/dashboard/community/details")} key={item} className=' w-[346px] h-[186px] rounded-2xl bg-blue-500 relative flex justify-center items-center ' >
                                <div style={{ boxShadow: "0px 3px 3px 0px #00000038" }} className=' gap-1 w-[300px] h-[138px] text-primary flex items-center flex-col rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                    <Text className=' text-xl tracking-[0.5%] text-center font-black ' >Hope Harvesters</Text>
                                    <Text className=' text-xs text-center font-semibold ' >{textLimit(text, 80)}</Text>
                                    <div className=' mt-auto w-fit ' >
                                        <div className='flex items-center ' >
                                            <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                                            <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                                            <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' />
                                            <Text className=' ml-4 text-opacity-90 text-xs font-semibold ' >50K+ Members</Text>
                                        </div>
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
