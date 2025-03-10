import { Text } from '@radix-ui/themes'
import PageHeader from '../components/shared/pageHeader'
import { DonateIcon } from '../svg' 
import useNotification from '../hooks/useNotification'
import LoadingAnimation from '../components/shared/loadingAnimation'
import moment from 'moment'

export default function NotificationPage() {

    // const data = "Believes in our mission and has shown their support. Let's welcome them to the community!"

    const { isLoading, data } = useNotification()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Notifications" body="Get Notification On Donations To Your Organisation, On Events Set Up In Aid of Your Mission And More…" />
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=' w-full flex flex-col gap-6 lg:px-0 px-4 pb-6 ' >
                    {data?.map((item, index) => {
                        if (item?.title === "New Event Donation") {
                            return (
                                <div key={index} className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
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
                                            <Text className=' text-[10px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {item?.message}</Text>
                                        </div>
                                    </div>
                                    <div className=' w-fit ml-auto  ' > 
                                    <Text className=' text-[10px] font-extrabold text-primary text-opacity-50' >{moment(item?.createdAt)?.fromNow()}</Text>
                                        </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </LoadingAnimation>
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
