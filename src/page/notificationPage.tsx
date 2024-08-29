import { Text } from '@radix-ui/themes'
import PageHeader from '../components/shared/pageHeader'
import { CalendarStarIcon, ChatColoredIcon, CommentIcon, DonateIcon, FollwingIcon, HeartIcon, ThumbUpIcon } from '../svg'
import { textLimit } from '../components/util/textlimit'

export default function NotificationPage() {

    const data = "Believes in our mission and has shown their support. Let's welcome them to the community!" 

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Notifications" body="Effortless Event Creation and Community Engagement." />
            <div className=' w-full flex flex-col gap-6 lg:px-0 px-4 pb-6 ' >
                <div className=' w-full flex items-center gap-4 lg:border-b-0 border-b pb-6 lg:pb-0  ' >
                    <div className=' flex gap-2 items-center ' >
                        <div className=' w-fit' >
                            <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                                <HeartIcon />
                            </div>
                        </div>
                        <div className=' flex flex-col ' >
                            <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >New User Supports Organization</Text>
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
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
                            <Text className=' text-[11px] text-primary text-opacity-75 ' ><span className=' font-bold ' >James Dean</span> {textLimit(data, 30)}</Text>
                        </div>
                    </div>
                    <Text className=' text-[10px] font-extrabold text-primary text-opacity-50 ml-auto ' >10mins</Text>
                </div>
            </div>
        </div>
    )
}
