import { Text } from "@radix-ui/themes";
import { BackWhiteIcon, EditIcon } from "../../svg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ICommunity } from "../../model/community";
import { formatNumberWithK } from "../../utils/formatNumberWithK";
// import useGetCommunityPost from "../../hooks/communityHooks/useGetCommunityPost";
import moment from "moment";
import LoadingAnimation from "../shared/loadingAnimation";
import MoreOptionBtn from "./moreOptionBtn";
import useGetCommunityPostBoardCast from "../../hooks/communityHooks/useGetCommunityPostBoardCast";
import LikePostBtn from "./likePostBtn";
import useGetCommunityPostPin from "../../hooks/communityHooks/useGetCommunityPostPin";
import { MdOutlinePushPin } from "react-icons/md";
import ShareBtn from "../shared/shareBtn";


export default function CommunityDetail({ item }: { item: ICommunity }) {

    const router = useNavigate()

    // const { data: post, isLoading } = useGetCommunityPost()

    const { data: pinnedData, isLoading: loadingPin } = useGetCommunityPostPin()
    const { data, isLoading: loading } = useGetCommunityPostBoardCast()

    const [searchParams] = useSearchParams();
    const index = searchParams.get("tab");
    const { id } = useParams();

    return (
        <div className=" w-full relative h-full " >
            <div className=" w-full flex h-full lg:flex-row flex-col gap-4 overflow-y-auto lg:overflow-y-hidden lg:gap-6 text-primary pb-6 lg:px-0 " >
                <div className=" w-full h-fit flex flex-col rounded-b-[44px] lg:rounded-[44px] lg:p-8 pb-2 " >
                    <div className=" w-full h-[240px] bg-green-700 relative rounded-b-[44px] lg:rounded-[44px] " >
                        <div role="button" onClick={() => router("/dashboard/community")} className=" cursor-pointer lg:hidden w-11 h-11 absolute top-6 z-10 left-4 rounded-md bg-[#FFFFFF26] lg:bg-[#FFFFFF33] flex justify-center items-center " >
                            <BackWhiteIcon color="white" />
                        </div>
                        <img alt="image" src={item?.photo} className=" w-full h-full object-cover lg:rounded-[44px] " />
                        <div className=" absolute inset-0 bg-black bg-opacity-40 z-[5] lg:rounded-[44px]  " />
                        <div className=" flex items-center gap-2 lg:hidden absolute top-6 z-10 right-4 " >
                            <div role="button" onClick={() => router(`/dashboard/community/edit/${id}`)} className=" text-white cursor-pointer text-xs lg:hidden w-fit px-3 h-11 rounded-[44px] bg-[#FFFFFF26] lg:bg-[#FFFFFF33] flex gap-2 justify-center items-center " >
                                <EditIcon color="" />
                                Edit Channel 
                            </div> 
                            <div className=" w-fit " >
                                <ShareBtn id={item?._id} type="CHANNEL" />
                            </div>
                        </div>
                    </div>
                    <div className=" w-full px-4 pb-6 lg:px-6 overflow-y-auto z-20 -mt-20 lg:-mt-[18%]  " >
                        <div className=" p-5 text-primary w-full gap-2 bg-white flex flex-col rounded-[34px] items-center " style={{ boxShadow: "0px 3px 3px 0px #00000038" }} >
                            <Text className=" font-black text-2xl " >{item?.name}</Text>
                            <Text className=" text-xs text-primary text-opacity-75 font-semibold text-center " >{item?.description}</Text>

                            {item?.members?.length > 0 && (
                                <div role="button" onClick={() => router(`/dashboard/community/member/${id}`)} className='flex items-center mt-2 bg-[#37137F4D] px-3 rounded-full w-fit h-[40px] mx-auto text-black ' >
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
                <div className=" w-full flex flex-col gap-6 lg:overflow-y-auto " >
                    <div className=" w-full flex flex-col h-auto " >
                        <div className=" w-full flex gap-2 px-2 justify-center " >
                            {/* <button onClick={() => router(`/dashboard/community/details/${id}`)} className={` ${!index ? " text-white " : " text-primary bg-opacity-10 "} bg-primary text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit `} >Recent Posts</button> */}
                            <button onClick={() => router(`/dashboard/community/details/${id}?tab=true`)} disabled className={` ${!index ? " text-white " : " text-primary bg-opacity-10 "}  text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary `} >Announcements</button>
                        </div>
                        <LoadingAnimation loading={loading || loadingPin} length={data?.length} >
                            <div className=" w-full rounded-[44px] p-4 lg:p-6 flex flex-col gap-6 lg:pb-0 pb-24 " >
                                {pinnedData?.map((item, index) => {
                                    return (
                                        <div key={index} className=" w-full flex flex-col gap-3 " >
                                            <div className=" flex items-center w-full justify-between " >
                                                <div className=" flex items-center gap-2 " >
                                                    <div className=" w-10 h-10 rounded-full border border-primary border-opacity-50 " >
                                                        <img className=" w-full h-full object-cover rounded-full " src={item?.user?.logo} alt={item?.user?.logo} />
                                                    </div>
                                                    <div className=" flex flex-col " >
                                                        <Text className=" text-xs font-bold " >{item?.user?.name}</Text>
                                                        <Text className=" text-[10px] italic font-bold text-primary text-opacity-50 " >{moment(item?.createdAt)?.fromNow()}</Text>

                                                    </div>
                                                </div>
                                                <div className=" flex gap-3 items-center " >
                                                    {/* <div role="button" className=" cursor-pointer w-fit " >
                                                            <SendTopIcon />
                                                        </div> */}
                                                    <MoreOptionBtn pinned={true} post={true} item={item} />
                                                    <MdOutlinePushPin size={"25px"} />
                                                </div>
                                            </div>
                                            <div className=" w-full flex flex-col px-3 gap-3 " >
                                                <Text className=" text-xs font-medium " >{item?.content}</Text>
                                                {item?.attachments?.length > 0 && (
                                                    <div className=" w-full h-[200px] flex justify-center bg-gray-500 items-center p-1 rounded-2xl " >
                                                        <img className=" w-f h-full rounded-2xl object-cover " src={item?.attachments[0]?.image} alt={item?.attachments[0]?.image} />
                                                    </div>
                                                )}
                                                <div className=" flex items-center gap-4 " >
                                                    <LikePostBtn item={item} />
                                                    {/* <div onClick={() => router(`/dashboard/community/post-comment/${item?._id}`)} role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                                                            <ChatIcon />
                                                            <Text className=" font-black text-xs " >{item?.comments?.length}</Text>
                                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {data?.map((item, index) => {
                                    return (
                                        <div key={index} className=" w-full flex flex-col gap-3 " >
                                            <div className=" flex items-center w-full justify-between " >
                                                <div className=" flex items-center gap-2 " >
                                                    <div className=" w-10 h-10 rounded-full border border-primary border-opacity-50 " >
                                                        <img className=" w-full h-full object-cover rounded-full " src={item?.user?.logo} alt={item?.attachments[0]} />
                                                    </div>
                                                    <div className=" flex flex-col " >
                                                        <Text className=" text-xs font-bold " >{item?.user?.name}</Text>
                                                        <Text className=" text-[10px] italic font-bold text-primary text-opacity-50 " >{moment(item?.createdAt)?.fromNow()}</Text>
                                                    </div>
                                                </div>
                                                <div className=" flex gap-3 items-center " >
                                                    {/* <div role="button" className=" cursor-pointer w-fit " >
                                                            <SendTopIcon />
                                                        </div> */}
                                                    <MoreOptionBtn item={item} />
                                                </div>
                                            </div>
                                            <div className=" w-full flex flex-col px-3 gap-3 " >
                                                <Text className=" text-xs font-medium " >{item?.content}</Text>
                                                {item?.attachments?.length > 0 && (
                                                    <div className=" w-full h-[200px] flex justify-center bg-gray-500 items-center p-1 rounded-2xl " >
                                                        <img className=" w-f h-full rounded-2xl object-cover " src={item?.attachments[0]?.image} alt={item?.attachments[0]?.image} />
                                                    </div>
                                                )}
                                                <div className=" flex items-center gap-4 " >
                                                    <LikePostBtn item={item} />
                                                    {/* <div onClick={() => router(`/dashboard/community/post-comment/${item?._id}`)} role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                                                            <ChatIcon />
                                                            <Text className=" font-black text-xs " >{item?.comments?.length}</Text>
                                                        </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </LoadingAnimation>
                        {/* )} */}
                        <div className=" w-[200px] h-[50px] " />
                    </div>
                </div>
            </div >
        </div>
    )
}