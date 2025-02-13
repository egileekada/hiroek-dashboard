import { Spinner, Text } from "@radix-ui/themes";
import moment from "moment";
import { ChatIcon, SendIcon, SendTopIcon } from "../../svg";
import MoreOptionBtn from "../../components/community/moreOptionBtn";
import LikePostBtn from "../../components/community/likePostBtn";
import { useNavigate } from "react-router-dom";
import useGetMembers from "../../hooks/communityHooks/useGetMembers";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import LikeCommentBtn from "../../components/community/likeCommentBtn"; 
import useCommunity from "../../hooks/communityHooks/useCommunity";
import PageHeader from "../../components/shared/pageHeader";


export default function CommunitySinglePostPage() {

    const router = useNavigate()

    const { data: item, isLoading } = useGetMembers().getSinglePostData()
    const { data, isLoading: loading } = useGetMembers().getPostCommentsData()
    const { contentComment, setContentComment, createCommentPost } = useCommunity()

    return (
        <div className=' w-full flex flex-col h-full items-center gap-6 pt-3  ' >
            <div className=" w-full " > 
                <PageHeader back={true} header={""} body={""} />
            </div>
            <div className=" max-w-[500px] w-full flex flex-col h-full gap-3 px-3 pb-3 relative" >
                <LoadingAnimation loading={isLoading} >
                    <div style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} className=" w-full sticky top-0 rounded-lg p-4 flex flex-col gap-3 " >
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
                                <div role="button" className=" cursor-pointer w-fit " >
                                    <SendTopIcon />
                                </div>
                                <MoreOptionBtn item={item} />
                            </div>
                        </div>
                        <div className=" w-full flex flex-col px-2 gap-3 " >
                            <Text className=" text-xs font-medium " >{item?.content}</Text>
                            {item?.attachments?.length > 0 && (
                                <div className=" w-full h-[200px] rounded-2xl " >
                                    <img className=" w-full h-full rounded-2xl " src={item?.attachments[0]} alt={item?.attachments[0]} />
                                </div>
                            )}
                            <div className=" flex items-center gap-4 " >
                                <LikePostBtn item={item} />
                                <div onClick={() => router(`/dashboard/community/post-comment/${item?._id}`)} role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                                    <ChatIcon />
                                    <Text className=" font-black text-xs " >{item?.comments?.length}</Text>
                                </div>
                            </div>
                        </div>
                    </div>
                </LoadingAnimation>
                <div className=" w-full flex flex-col gap-3 " >
                    <Text className=" text-xs text-primary text-opacity-75 font-bold " >Comments</Text>
                    <LoadingAnimation loading={loading} length={data?.length} >
                        <div className=" w-full flex flex-col gap-2 " >
                            {data?.map((item, index) => {
                                return (
                                    <div key={index} style={{ boxShadow: "0px 4px 4px 0px #0000000D" }} className=" w-full rounded-lg p-4 flex flex-col gap-3 " >
                                        <div className=" flex items-center w-full justify-between " >
                                            <div className=" flex items-center gap-2 " >
                                                <div className=" w-10 h-10 rounded-full border border-primary border-opacity-50 " >
                                                    <img className=" w-full h-full object-cover rounded-full " src={item?.user?.photo} alt={item?.user?.phone} />
                                                </div>
                                                <div className=" flex flex-col " >
                                                    <Text className=" text-xs font-bold " >{item?.user?.fullname}</Text>
                                                    <Text className=" text-[10px] italic font-bold text-primary text-opacity-50 " >{moment(item?.createdAt)?.fromNow()}</Text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" w-full flex flex-col px-2 gap-3 " >
                                            <Text className=" text-xs font-medium " >{item?.content}</Text>
                                            <div className=" flex items-center gap-4 " >
                                                <LikeCommentBtn item={item} />
                                                <button className=" h-[20px] w-fit bg-primary30 rounded-full text-[10px] font-bold px-2 " >Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                    <div className=" w-full h-[60px] " />
                </div>
                <div className=" w-full sticky bg-white mt-auto bottom-0 inset-x-0 flex " > 
                    <div className=" w-full h-[54px] relative " >
                        <input
                            onChange={(e) => setContentComment(e.target?.value)}
                            type={"text"} style={{ borderRadius: "5px", color: "#37137f", borderColor: "#37137F80", borderWidth: "2px" }} placeholder={"Type your comment here"} value={contentComment} className={` pr-[40px] h-[54px] px-3 outline-none bg-transparent w-full text-sm font-medium `} />
                        
                        <div role="button" className=" absolute w-fit cursor-pointer right-0 top-0 pr-2 " >
                            <div className=" w-[30px] h-[54px] flex justify-center items-center " >
                                {createCommentPost?.isLoading ? <Spinner size={"2"} /> :
                                    <div onClick={() => createCommentPost?.mutate({
                                        postId: item?._id
                                    })} >
                                        <SendIcon color={contentComment ? "#37137FBF" : "#37137F80"} />
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
