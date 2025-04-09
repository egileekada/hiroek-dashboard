import { Text } from '@radix-ui/themes'
import { textLimit } from '../../utils/textlimit'
import { useNavigate } from 'react-router-dom';
import useGetCommunity from '../../hooks/communityHooks/useGetCommunity';
import LoadingAnimation from './loadingAnimation';
import { formatNumberWithK } from '../../utils/formatNumberWithK';

interface IProps {
    title?: string;
    notitle?: boolean;
    mobile?: boolean
}

export default function CommunityCardList({ title, notitle, mobile }: IProps) {

    const router = useNavigate()
    const { data, isLoading } = useGetCommunity() 


    return (
        <div className=' w-full flex pb-6 flex-col gap-2 ' >
            {!notitle && (
                <Text className=' text-xl text-primary font-black ' >{title ?? "Communities"}</Text>
            )}
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=' w-full h-full flex overflow-x-auto  ' >
                    <div className={` ${mobile ? " w-full flex-col " : " w-fit "} flex gap-4 `} >
                        {data?.map((item, index) => {
                            if (!mobile) {
                                return (
                                    <div role='button' onClick={() => router(`/dashboard/community/details/${item?._id}`)} key={index} className=' w-[346px] h-[186px] rounded-2xl relative flex justify-center items-center ' >
                                        <div style={{ boxShadow: "0px 3px 3px 0px #00000038" }} className=' gap-1 w-[300px] relative z-20 h-[138px] text-primary flex items-center flex-col rounded-[10px] bg-[#FFFFFFBF] py-[8px] px-3 ' >
                                            <Text className=' text-xl tracking-[0.5%] text-center font-black ' >{item?.name}</Text>
                                            <Text className=' text-xs text-center font-semibold ' >{textLimit(item?.description, 80)}</Text>

                                            <div className=' mt-auto w-fit ' >
                                                <div className='flex items-center ' >
                                                    {item?.members?.map((item: {
                                                        photo: string
                                                    }, index: number) => {
                                                        if (index === 0) {
                                                            return (
                                                                <img key={index} alt={item?.photo} src={item?.photo} className=' w-7 h-7 rounded-full object-cover ' />
                                                            )
                                                        } else {
                                                            return (
                                                                <img key={index} alt={item?.photo} src={item?.photo} className=' w-7 h-7 -ml-2 rounded-full object-cover ' />
                                                            )
                                                        }
                                                    })}
                                                    {/* <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                                                    <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                                                    <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' /> */}
                                                    {item?.members?.length > 0 && (
                                                        <Text className=' ml-4 text-opacity-90 text-xs font-semibold ' >{formatNumberWithK(item?.members?.length)} Members</Text>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <img src={item?.photo} alt={item?.photo} className=' object-cover h-[186px] w-full absolute inset-0 rounded-2xl ' />
                                        <div className=' absolute z-10 bg-black rounded-2xl inset-0 bg-opacity-20 ' />
                                    </div>
                                )
                            } else {
                                return (
                                    <div role='button' onClick={() => router(`/dashboard/community/details/${item?._id}`)} key={index} style={{ boxShadow: "0px 3px 6px 0px #00000026" }} className=' text-white lg:max-w-[361px] w-full flex p-[10px] rounded-[12px] gap-4 bg-[#37137FCC] ' >
                                        <div className=' w-fit ' >
                                            <div className=' w-[75px] h-[75px] rounded-lg ' >
                                                <img src={item?.photo} alt={item?.photo} className=' object-cover h-full w-full rounded-lg ' />
                                            </div>
                                        </div>
                                        <div className=' flex flex-col ' >
                                            <div className=' flex-col flex text-left ' >
                                                <Text className=' text-sm font-extrabold ' >{textLimit(item?.name, 30)}</Text>
                                                <Text className=' text-xs font-semibold ' >{textLimit(item?.description, 30)}</Text>
                                            </div>
                                            {item?.members?.length > 0 && (
                                                <div className=' bg-[#B00062] w-fit px-2 mt-1 h-[28px] rounded-[44px] flex items-center justify-center ' >
                                                    {item?.members?.map((item: {
                                                        photo: string
                                                    }, index: number) => {
                                                        if (index === 0) {
                                                            return (
                                                                <img key={index} alt={item?.photo} src={item?.photo} className=' w-4 h-4 rounded-full ' />
                                                            )
                                                        } else {
                                                            return (
                                                                <img key={index} alt={item?.photo} src={item?.photo} className=' w-4 h-4 -ml-2 rounded-full ' />
                                                            )
                                                        }
                                                    })}
                                                    {item?.members?.length > 0 && (
                                                        <Text className=' ml-2 text-white text-[9px] font-bold ' >{formatNumberWithK(item?.members?.length)} Members</Text>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </LoadingAnimation>
        </div>
    )
}
