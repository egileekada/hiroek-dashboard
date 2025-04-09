import { MoreIcon } from "../../svg";
import { FaEdit } from "react-icons/fa";
import ModalLayout from "../shared/modalLayout";
import { HiMiniSpeakerWave, HiMiniTrash } from "react-icons/hi2";
import { TbFlagFilled } from "react-icons/tb";
import { IPost } from "../../hooks/communityHooks/useGetCommunityPost";
import { Text, TextArea } from "@radix-ui/themes";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import LoadingAnimation from "../shared/loadingAnimation";
import Cookies from "js-cookie"


export default function MoreOptionBtn({ item, post, pinned }: { item: IPost, post?: boolean, pinned?: boolean }) {

    const { reportChannelPost, open, setOpen, openReport, setOpenReport, openDelete, setOpenDelete, openBroadcast, setOpenBroadcast, openPin, setOpenPin, reason, setReason, deleteChannelPost, createAnnocementPost, pinPost, loadingPinPost } = useCommunity(pinned)
    const userId = Cookies.get("user-index")

    const self = item?.user?._id === userId

    return (
        <div>
            <div onClick={() => setOpen(true)} role="button" className=" cursor-pointer w-fit " >
                <MoreIcon />
            </div>
            <ModalLayout width=" max-w-[390px] w-full " open={open} setOpen={setOpen} >
                <div className=" flex w-full flex-col pt-3 gap-4 " >
                    {self && (
                        <div role="button" className=" w-full pb-5 flex gap-2 items-center border-b border-primary30  " >
                            <FaEdit size={"16px"} color="#37137f" />
                            <p className=" text-xs font-bold text-primary " >Edit Post</p>
                        </div>
                    )}
                    {(self && post && !pinned) && (
                        <div onClick={() => { setOpen(false), setOpenPin(true) }} role="button" className=" w-full pb-5 flex gap-2 items-center border-b border-primary30  " >
                            <TbFlagFilled size={"16px"} color="#37137f" />
                            <p className=" text-xs font-bold text-primary " >Pin Post</p>
                        </div>
                    )} 
                    {(pinned) && (
                        <div onClick={() => { setOpen(false), setOpenPin(true) }} role="button" className=" w-full pb-5 flex gap-2 items-center border-b border-primary30  " >
                            <TbFlagFilled size={"16px"} color="#37137f" />
                            <p className=" text-xs font-bold text-primary " >UnPin Post</p>
                        </div>
                    )}
                    <div onClick={() => { setOpen(false), setOpenReport(true) }} role="button" className=" w-full pb-5 flex gap-2 items-center border-b border-primary30  " >
                        <TbFlagFilled size={"16px"} color="#37137f" />
                        <p className=" text-xs font-bold text-primary " >Report Post</p>
                    </div>
                    {self && (
                        <div onClick={() => { setOpen(false), setOpenDelete(true) }} role="button" className={` w-full pb-5 flex gap-2 items-center ${!item?.isAnnouncement && self ? " border-b border-primary30 " : ""} `} >
                            <HiMiniTrash size={"16px"} color="#37137f" />
                            <p className=" text-xs font-bold text-primary " >Delete Post</p>
                        </div>
                    )}
                    {(!item?.isAnnouncement && self) && (
                        <div onClick={() => { setOpen(false), setOpenBroadcast(true) }} role="button" className=" w-full pb-5 flex gap-2 items-center " >
                            <HiMiniSpeakerWave size={"16px"} color="#37137f" />
                            <p className=" text-xs font-bold text-primary " >Broadcast Post</p>
                        </div>
                    )}
                </div>
            </ModalLayout>

            <ModalLayout width=" max-w-[295px] w-full " onIcon={true} open={openDelete} setOpen={setOpenDelete}  >
                <LoadingAnimation loading={deleteChannelPost?.isLoading} >
                    <div className=" flex w-full flex-col py-3 gap-4 items-center " >
                        <Text className=" text-center font-bold text-primary " >Delete User Post</Text>
                        <Text className=" text-sm font-semibold w-[80%] text-center text-primary30 " >Are you sure you want to delete this user's post?</Text>
                        <div className=" w-[75%] flex mt-2 px-3 justify-between " >
                            <button onClick={() => { setOpen(true), setOpenDelete(false) }} className=" text-[#CA072E] outline-none font-medium text-sm " >Cancel</button>
                            <button onClick={() => deleteChannelPost?.mutate(item?._id)} className=" text-[#328330] font-medium text-sm " >Accept</button>
                        </div>
                    </div>
                </LoadingAnimation>
            </ModalLayout>
            <ModalLayout width=" max-w-[395px] w-full " onIcon={true} open={openReport} setOpen={setOpenReport}  >
                <LoadingAnimation loading={reportChannelPost?.isLoading} >
                    <div className=" flex w-full flex-col py-3 gap-4 items-center " >
                        <Text className=" text-center font-bold text-primary " >Report User Post</Text>
                        <div className=" w-full flex flex-col gap-2 " >
                            <Text>Reason</Text>
                            <TextArea value={reason} placeholder="Type your reason" className=" !p-2 h-36 " onChange={(e) => setReason(e.target.value)} />
                        </div>
                        <div className=" w-[75%] flex mt-2 px-3 justify-between " >
                            <button onClick={() => { setOpen(true), setOpenReport(false) }} className=" text-[#CA072E] outline-none font-medium text-sm " >Cancel</button>
                            <button disabled={reason ? false : true} onClick={() => reportChannelPost?.mutate({
                                postId: item?._id,
                                reason: reason
                            })} className=" text-[#328330] font-medium text-sm " >Accept</button>
                        </div>
                    </div>
                </LoadingAnimation>
            </ModalLayout>
            <ModalLayout width=" max-w-[295px] w-full " onIcon={true} open={openBroadcast} setOpen={setOpenBroadcast}  >
                <LoadingAnimation loading={createAnnocementPost?.isLoading} >
                    <div className=" flex w-full flex-col py-3 gap-4 items-center " >
                        <Text className=" text-center font-bold text-primary " >Broadcast Post</Text>
                        <Text className=" text-sm font-semibold w-[80%] text-center text-primary30 " >Are you sure you want to broadcast this post?</Text>
                        <div className=" w-[75%] flex mt-2 px-3 justify-between " >
                            <button onClick={() => { setOpen(true), setOpenBroadcast(false) }} className=" text-[#CA072E] outline-none font-medium text-sm " >Cancel</button>
                            <button onClick={() => createAnnocementPost?.mutate(item?._id)} className=" text-[#328330] font-medium text-sm " >Accept</button>
                        </div>
                    </div>
                </LoadingAnimation>
            </ModalLayout>
            <ModalLayout width=" max-w-[295px] w-full " onIcon={true} open={openPin} setOpen={setOpenPin}  >
                <LoadingAnimation loading={loadingPinPost} >
                    <div className=" flex w-full flex-col py-3 gap-4 items-center " >
                        <Text className=" text-center font-bold text-primary " >{pinned ? "UnPin Post" : "Pin Post"}</Text>
                        <Text className=" text-sm font-semibold w-[80%] text-center text-primary30 " >Are you sure you want to {pinned ? "unPin" : "pin"}this post?</Text>
                        <div className=" w-[75%] flex mt-2 px-3 justify-between " >
                            <button onClick={() => { setOpen(true), setOpenPin(false) }} className=" text-[#CA072E] outline-none font-medium text-sm " >Cancel</button>
                            <button onClick={() => pinPost(item?._id)} className=" text-[#328330] font-medium text-sm " >Accept</button>
                        </div>
                    </div>
                </LoadingAnimation>
            </ModalLayout>
        </div>
    )
}
