import { Text } from '@radix-ui/themes'
import PageHeader from '../components/shared/pageHeader'
import { DonateIcon } from '../svg'
import useNotification from '../hooks/useNotification'
import LoadingAnimation from '../components/shared/loadingAnimation'
import moment from 'moment'
import { useDetails } from '../global-state/useUserDetails'
import { textLimit } from '../utils/textlimit'
import ModalLayout from '../components/shared/modalLayout'
import { useState } from 'react'
import { CustomButton } from '../components/shared'
import { io } from "socket.io-client";
import Cookies from "js-cookie"
import { useQueryClient } from 'react-query'

export default function NotificationPage() {

    // const data = "Believes in our mission and has shown their support. Let's welcome them to the community!"

    const { isLoading, data } = useNotification()
    const [open, setOpen] = useState(false)

    const query = useQueryClient()
    const { name } = useDetails((state) => state);
    const token = Cookies.get("access_token")
    const [detail, setDetail] = useState({
        name: "",
        message: "",
        id: ""
    })


    const socket: any = io("https://staging.hiroek.io", {
        auth: {
            token: token
        }
    });

    const clickHandler = (item: {
        name: string,
        message: string,
        id: string
    }) => {
        setDetail(item)
        setOpen(true)
    }

    const closeHandler = (item: string) => {
        socket.emit('notification-opened', {
            notificationId: item
        });

        query.invalidateQueries("Notification-List")
        query.invalidateQueries("Notification-counting")

        setOpen(false)
    }

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Notifications" body="Manage your platform effectively with hiroek." />
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=' lg:max-w-[400px] w-full flex flex-col lg:px-0pb-6 ' >
                    {data?.map((item, index) => {
                        return (
                            <div onClick={() => clickHandler({
                                name: item?.title,
                                message: item?.message,
                                id: item?._id
                            })} style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} key={index} className={` ${item?.isRead ? " bg-black bg-opacity-10 "  : ""} h-[80px] px-2 w-full flex items-center gap-4 lg:border-b-0 border-b `} >
                                <div className=' flex gap-2 items-center ' >
                                    {item?.title === "New Event Donation" && (
                                        <div className=' w-fit' >
                                            <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                                <DonateIcon />
                                            </div>
                                        </div>
                                    )}
                                    <div className=' flex flex-col ' >
                                        <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >{item?.title}</Text>
                                        <Text className=' text-[10px] text-primary text-opacity-75 ' ><span className=' font-bold ' >{name}</span> {textLimit(item?.message, 20)}</Text>
                                    </div>
                                </div>
                                <div className=' w-fit ml-auto  ' >
                                    <Text className=' text-[10px] font-extrabold text-primary text-opacity-50' >{moment(item?.createdAt)?.fromNow()}</Text>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
            <ModalLayout open={open} width='max-w-[350px]' setOpen={setOpen} >
                <div className=' w-full flex flex-col gap-3 ' >
                    <p className=' text-xl font-semibold text-center ' >{detail?.name}</p>
                    <p className=' text-sm text-center ' >{detail?.message}</p>
                    <div className=' my-3 w-full flex justify-center ' >
                        <CustomButton onClick={()=> closeHandler(detail?.id)} height='35px' fontSize='14px' width='150px' >Close</CustomButton>
                    </div>
                </div>
            </ModalLayout>
        </div>
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
