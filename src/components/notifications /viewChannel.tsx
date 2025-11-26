
import { useNavigate } from "react-router-dom" 
import { Text } from "@radix-ui/themes" 
import LoadingAnimation from "../shared/loadingAnimation"
import useGetCommunityById from "../../hooks/communityHooks/useGetCommunityById"
import { formatNumberWithK } from "../../utils/formatNumberWithK"

export default function ViewChannels({ index }: { index: string }) {

    const router = useNavigate() 

    const { data: item, isLoading } = useGetCommunityById(index)

    const clickHandler = () => { 
        router(`/dashboard/community/details/${item?._id}`)
    }

    return (
        <LoadingAnimation loading={isLoading} >
            <div role="button" onClick={clickHandler} className=" w-full h-fit flex flex-col rounded-b-[44px] lg:rounded-[44px] lg:p-8 pb-2 " >
                <div className=" w-full h-[240px] bg-green-700 relative rounded-b-[44px] lg:rounded-[44px] " >
                    
                    <img alt="image" src={item?.photo} className=" w-full h-full object-cover lg:rounded-[44px] " />
                    <div className=" absolute inset-0 bg-black bg-opacity-40 z-[5] lg:rounded-[44px]  " />
                     
                </div>
                <div className=" w-full px-4 pb-6 lg:px-6 overflow-y-auto z-20 -mt-20 lg:-mt-[18%]  " >
                    <div className=" p-5 text-primary w-full gap-2 bg-white flex flex-col rounded-[34px] items-center " style={{ boxShadow: "0px 3px 3px 0px #00000038" }} >
                        <Text className=" font-black text-2xl " >{item?.name}</Text>
                        <Text className=" text-xs text-primary text-opacity-75 font-semibold text-center " >{item?.description}</Text>

                        {item?.members?.length > 0 && (
                            <div role="button" className='flex items-center mt-2 bg-[#37137F4D] px-3 rounded-full w-fit h-[40px] mx-auto text-black ' >
                                <div className=' w-7 h-7 rounded-full'>
                                    <img src={item?.members[0]?.photo} alt={item?.members[0]?._id} className=" w-full h-full object-cover rounded-full " />
                                </div>
                                {item?.members?.length > 1 && (
                                    <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                        <img src={item?.members[1]?.photo} alt={item?.members[1]?._id} className=" w-full h-full object-cover rounded-full " />
                                    </div>
                                )}
                                {item?.members?.length > 2 && (
                                    <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                        <img src={item?.members[2]?.photo} alt={item?.members[2]?._id} className=" w-full h-full object-cover rounded-full " />
                                    </div>
                                )}
                                <Text className=' ml-2 font-semibold text-xs text-[#37137F] ' >{formatNumberWithK(item?.members?.length)} Members</Text>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </LoadingAnimation>
        // <></>
    )
}
