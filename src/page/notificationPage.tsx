import PageHeader from '../components/shared/pageHeader' 
import useNotification, { IProps } from '../hooks/useNotification'
import LoadingAnimation from '../components/shared/loadingAnimation' 
import { useDetails } from '../global-state/useUserDetails' 
// import ModalLayout from '../components/shared/modalLayout'
import { useEffect, useState } from 'react'
// import { CustomButton } from '../components/shared'
import { io } from "socket.io-client";
import Cookies from "js-cookie"
import { useQueryClient } from 'react-query'
import { useNavigate, useSearchParams } from 'react-router-dom' 
import ViewPost from '../components/notifications /viewPost'
import ViewEvent from '../components/notifications /viewEvent'
import NotificationCard from '../components/notifications /notificationCard'

export default function NotificationPage() {

    // const data = "Believes in our mission and has shown their support. Let's welcome them to the community!"

    const { isLoading, data, results, isRefetching, ref } = useNotification()
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

    console.log(results);
    

    return (
        <>
            {!index && (
                <div className=' w-full flex flex-col gap-6 ' >
                    <PageHeader back={true} header="Notifications" body="Manage your platform effectively with hiroek." />
                    <LoadingAnimation loading={isLoading} refeching={isRefetching} length={data?.length} >
                        <div className=' lg:max-w-[400px] w-full flex flex-col lg:px-0 ' >
                            {results?.map((item: IProps, index: number) => {
                                if(index === results?.length-1){ 
                                    return (
                                        <div key={index} ref={ref} > 
                                            <NotificationCard item={item} clickHandler={clickHandler} name={name}  />
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={index}> 
                                            <NotificationCard item={item} clickHandler={clickHandler} name={name}  />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </LoadingAnimation> 
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
                        {(detail?.type === "COMMUNITY_REPORT" || detail?.type === "COMMUNITY_INVITE" || detail?.type === "POST_REPORT" || detail?.type === "NEW_POST" || detail?.type === "NEW_COMMENT" || detail?.type === "NEW_LIKE") && (
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
