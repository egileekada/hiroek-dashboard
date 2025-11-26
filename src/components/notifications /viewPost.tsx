
import useGetMembers from '../../hooks/communityHooks/useGetMembers'
import LoadingAnimation from '../shared/loadingAnimation'
import { Text } from '@radix-ui/themes/components/callout'
import moment from 'moment'
import { SendTopIcon } from '../../svg'
import MoreOptionBtn from '../community/moreOptionBtn'
import LikePostBtn from '../community/likePostBtn'
import { useNavigate } from 'react-router-dom'

export default function ViewPost({ item }: { item: string }) {

    const { data, isLoading } = useGetMembers().getSinglePostData(item)
    const router = useNavigate()

    return (
        <LoadingAnimation loading={isLoading} >
            <>
                {data?._id && ( 
                    <div
                        role='button'
                        onClick={() => router(`/dashboard/community/details/${data?.community?._id}`)}
                        style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} className=" w-full sticky top-0 rounded-lg p-4 flex flex-col gap-3 " >
                        <div className=" flex items-center w-full justify-between " >
                            <div className=" flex items-center gap-2 " >
                                {/* <div className=" w-10 h-10 rounded-full border border-primary border-opacity-50 " >
                            <img className=" w-full h-full object-cover rounded-full " src={data?.user?.logo} alt={data?.user?.logo} />
                        </div> */}
                                <div className=" flex flex-col " >
                                    <Text className=" text-xs font-bold " >{data?.user?.name}</Text>
                                    <Text className=" text-[10px] italic font-bold text-primary text-opacity-50 " >{moment(data?.createdAt)?.fromNow()}</Text>
                                </div>
                            </div>
                            <div className=" flex gap-3 items-center " >
                                <div role="button" className=" cursor-pointer w-fit " >
                                    <SendTopIcon />
                                </div>
                                <MoreOptionBtn item={data} />
                            </div>
                        </div>
                        <div className=" w-full flex flex-col px-2 gap-3 " >
                            <Text className=" text-xs font-medium " >{data?.content}</Text>
                            {data?.attachments?.length > 0 && (
                                <div className=" w-full h-[200px] rounded-2xl bg-slate-300 " >
                                    <img className=" w-full h-full rounded-2xl object-contain " src={data?.attachments[0]?.image} alt={data?.attachments[0]?.image} />
                                </div>
                            )}
                            <div className=" flex items-center gap-4 " >
                                <LikePostBtn item={data} />
                                {/* <div role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                            <ChatIcon />
                            <Text className=" font-black text-xs " >{data?.comments?.length}</Text>
                        </div> */}
                            </div>
                        </div>
                    </div>
                )}
            </>
        </LoadingAnimation>
    )
}
