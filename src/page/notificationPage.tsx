import { Text } from '@radix-ui/themes'
import PageHeader from '../components/shared/pageHeader'
import { ChannelsColored, CommentIcon, DonateIcon, EventLikeColored, FollwingIcon } from '../svg'
import useNotification, { IProps } from '../hooks/useNotification'
import LoadingAnimation from '../components/shared/loadingAnimation'
import moment from 'moment'
import { useDetails } from '../global-state/useUserDetails'
import { textLimit } from '../utils/textlimit'
// import ModalLayout from '../components/shared/modalLayout'
import { useEffect, useState } from 'react'
// import { CustomButton } from '../components/shared'
import { io } from "socket.io-client";
import Cookies from "js-cookie"
import { useQueryClient } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ImCheckmark } from "react-icons/im";
import ViewPost from '../components/notifications /viewPost'
import ViewEvent from '../components/notifications /viewEvent'

export default function NotificationPage() {

    // const data = "Believes in our mission and has shown their support. Let's welcome them to the community!"

    const { isLoading, data } = useNotification()
    // const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const query = useQueryClient()
    const { name } = useDetails((state) => state);
    const token = Cookies.get("access_token")
    const [detail, setDetail] = useState({} as IProps)

    const [searchParams] = useSearchParams();
    const index = searchParams.get("message");


    const socket: any = io("https://staging.hiroek.io", {
        auth: {
            token: token
        }
    });

    useEffect(() => {
        if (!detail?.title) {
            navigate("/dashboard/notification")
        }
    }, [detail])

    const clickHandler = (item: IProps) => {
        setDetail(item)
        navigate("/dashboard/notification?message=true")
        socket.emit('notification-opened', {
            notificationId: item?._id
        });

        query.invalidateQueries("Notification-List")
        query.invalidateQueries("Notification-counting")
    }

    return (
        <>
            {!index && (
                <div className=' w-full flex flex-col gap-6 ' >
                    <PageHeader back={true} header="Notifications" body="Manage your platform effectively with hiroek." />
                    <LoadingAnimation loading={isLoading} length={data?.length} >
                        <div className=' lg:max-w-[400px] w-full flex flex-col lg:px-0 ' >
                            {data?.map((item, index) => {
                                return (
                                    <div onClick={() => clickHandler(item)} style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} key={index} className={` h-[80px] relative px-2 w-full flex items-center gap-4 lg:border-b-0 border-b `} >
                                        <div className=' flex gap-2 items-center ' >
                                            {(item?.type === "NEW_DONATION" || item?.type === "NEW_PAYMENT") && (
                                                <div className=' w-fit' >
                                                    <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                        <DonateIcon />
                                                    </div>
                                                </div>
                                            )}
                                            {(item?.type === "EVENT_INVITE" || item?.type === "EVENT_UPDATE" || item?.type === "EVENT_STARTED") && (
                                                <div className=' w-fit' >
                                                    <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                        <EventLikeColored />
                                                    </div>
                                                </div>
                                            )}
                                            {(item?.type === "COMMUNITY_REPORT" || item?.type === "COMMUNITY_INVITE" || item?.type === "POST_REPORT" || item?.type === "NEW_POST") && (
                                                <div className=' w-fit' >
                                                    <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                        <ChannelsColored />
                                                    </div>
                                                </div>
                                            )}
                                            {item?.type === "NEW_LIKE" && (
                                                <div className=' w-fit' >
                                                    <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                        <FollwingIcon />
                                                    </div>
                                                </div>
                                            )}
                                            {(item?.type === "NEW_COMMENT" || item?.type === "NEW_CHAT") && (
                                                <div className=' w-fit' >
                                                    <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                        <CommentIcon />
                                                    </div>
                                                </div>
                                            )}

                                            <div className=' flex flex-col ' >
                                                <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >{item?.title}</Text>
                                                <Text className=' text-[10px] text-primary text-opacity-75 ' ><span className=' font-bold ' >{name}</span> {textLimit(item?.message, 20)}</Text>
                                            </div>
                                        </div>
                                        <div className=' w-fit ml-auto flex flex-col lg:mr-1 mr-2 ' >
                                            <Text className=' text-[10px] font-extrabold text-primary text-opacity-50' >{moment(item?.createdAt)?.fromNow()}</Text>

                                        </div>
                                        {item?.isRead && (
                                            <div className=' absolute bottom-1 right-4 lg:right-1 text-[10px] font-extrabold text-primary' >
                                                <ImCheckmark size={"15px"} />
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                    {/* <ModalLayout open={open} width='max-w-[350px]' setOpen={setOpen} >
                        <div className=' w-full flex flex-col gap-3 ' >
                            <p className=' text-xl font-semibold text-center ' >{detail?.name}</p>
                            <p className=' text-sm text-center ' >{detail?.message}</p>
                            <div className=' my-3 w-full flex justify-center ' >
                                <CustomButton onClick={() => closeHandler(detail?.id)} height='35px' fontSize='14px' width='150px' >Close</CustomButton>
                            </div>
                        </div>
                    </ModalLayout> */}
                </div>
            )}
            {index && (
                <div className=' w-full flex flex-col gap-6 ' >
                    <div className=' w-full flex lg:hidden ' >
                        <PageHeader second={true} back={true} header={detail?.title} body="" />
                    </div>
                    <div className=' w-full lg:flex hidden ' >
                        <PageHeader back={true} header={detail?.title} body="" />
                    </div>
                    <div className=' lg:max-w-[400px] w-full flex flex-col gap-3 lg:px-0 px-3 ' >
                        <p className=' text-sm ' >{detail?.message}</p>
                        {(detail?.type === "COMMUNITY_REPORT" || detail?.type === "COMMUNITY_INVITE" || detail?.type === "POST_REPORT" || detail?.type === "NEW_POST" || detail?.type === "NEW_COMMENT") && (
                            <ViewPost item={detail?.actionId} />
                        )}
                        {(detail?.type === "NEW_DONATION") && (
                            <ViewEvent index={detail?.actionId} />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}



{/* <div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <HeartIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >New User Supports Organization</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <DonateIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User Made Donations to Organization</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <CalendarStarIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User supports Event Name campaign!</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <DonateIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User Made Donations to Event campaign!</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <ChatColoredIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User Made a new post in the community.</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <ThumbUpIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User Liked A Post in the community.</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <CommentIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User Made a Comment in the community.</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div>
<div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
<div className=' flex gap-2 items-center ' >
    <div className=' w-fit' >
        <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
            <FollwingIcon />
        </div>
    </div>
    <div className=' flex flex-col ' >
        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >User is now following Organization</Text>
        <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit("", 30)}</Text>
    </div>
</div>
<Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
</div> */}
