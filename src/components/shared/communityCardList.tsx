import { Text } from '@radix-ui/themes'
import { textLimit } from '../../utils/textlimit'
import { useNavigate } from 'react-router-dom';
import useGetCommunity from '../../hooks/communityHooks/useGetCommunity';
import LoadingAnimation from './loadingAnimation';
import { formatNumberWithK } from '../../utils/formatNumberWithK';

interface IProps {
    title?: string;
    notitle?: boolean
}

export default function CommunityCardList({ title, notitle }: IProps) {

    const router = useNavigate()
    const { data, isLoading } = useGetCommunity()
    
    return (
        <div className=' w-full flex pb-6 flex-col gap-2 ' >
            {!notitle && (
                <Text className=' text-xl text-primary font-black ' >{title ?? "Communities"}</Text>
            )}
            <LoadingAnimation loading={isLoading} length={data?.length} > 
            <div className=' w-full flex overflow-x-auto  ' >
                <div className=' w-fit flex gap-4 ' >
                    {data?.map((item, index) => {  
                        return (
                            <div role='button' onClick={()=> router(`/dashboard/community/details/${item?._id}`)} key={index} className=' w-[346px] h-[186px] rounded-2xl relative flex justify-center items-center ' >
                                <div style={{ boxShadow: "0px 3px 3px 0px #00000038" }} className=' gap-1 w-[300px] relative z-20 h-[138px] text-white flex items-center flex-col rounded-[10px] bg-[#2D264B80] py-[8px] px-3 ' >
                                    <Text className=' text-xl tracking-[0.5%] text-center font-black ' >{item?.name}</Text>
                                    <Text className=' text-xs text-center font-semibold ' >{textLimit(item?.description, 80)}</Text>
                                    <div className=' mt-auto w-fit ' >
                                        <div className='flex items-center ' >
                                            <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                                            <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                                            <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' />
                                            <Text className=' ml-4 text-opacity-90 text-xs font-semibold ' >{formatNumberWithK(item?.members?.length)} Members</Text>
                                        </div>
                                    </div>
                                </div>
                                <img src={item?.photo} alt={item?.photo} className=' object-cover absolute inset-0 rounded-2xl ' />
                                <div className=' absolute z-10 bg-black rounded-2xl inset-0 bg-opacity-20 ' />
                            </div>
                        )
                    })}
                </div>
            </div>
            </LoadingAnimation>
        </div>
    )
}
