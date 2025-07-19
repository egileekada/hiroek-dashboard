import moment from "moment";
import { ImCheckmark } from "react-icons/im";
import { IProps } from "../../hooks/useNotification"; 
import { textLimit } from "../../utils/textlimit";
import { Text } from "@radix-ui/themes";


export default function NotificationCard({item, clickHandler}: {item:IProps, clickHandler: any, name: string}) {

    // "EVENT_FAVORITE"
    return ( 
        <div onClick={() => clickHandler(item)} style={{ boxShadow: "0px 2px 4px 0px #0000000D" }}className={` h-[80px] relative px-2 w-full flex items-center gap-4 lg:border-b-0 border-b `} >
            <div className=' flex gap-2 items-center ' >
                {(item?.type === "NEW_DONATION" || item?.type === "NEW_PAYMENT") && (
                    <div className=' w-fit' >
                        {/* <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                            <DonateIcon />
                        </div> */}
                        <img src="/images/donation.png" alt="event" className=' w-11 h-11 flex ' />
                    </div>
                )}
                {(item?.type === "EVENT_INVITE" || item?.type === "EVENT_UPDATE" || item?.type === "EVENT_STARTED" || item?.type === "NEW_EVENT" || item?.type === "EVENT_FAVORITE") && (
                    <div className=' w-fit' >
                        {/* <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                            <EventLikeColored />
                        </div> */}
                        <img src="/images/event.png" alt="event" className=' w-11 h-11 flex ' />
                    </div>
                )}
                {(item?.type === "COMMUNITY_REPORT" || item?.type === "COMMUNITY_INVITE" || item?.type === "POST_REPORT" || item?.type === "NEW_POST") && (
                    <div className=' w-fit' >
                        {/* <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                            <ChannelsColored />
                        </div> */}
                        <img src="/images/community.png" alt="event" className=' w-11 h-11 flex ' />
                    </div>
                )}
                {item?.type === "NEW_LIKE" && (
                    <div className=' w-fit' >
                        {/* <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                            <FollwingIcon />
                        </div> */}
                        <img src="/images/community.png" alt="event" className=' w-11 h-11 flex ' />
                    </div>
                )}
                {(item?.type === "NEW_COMMENT" || item?.type === "NEW_CHAT") && (
                    <div className=' w-fit' >
                        {/* <div className=' w-11 h-11 flex rounded-full justify-center items-center bg-primary bg-opacity-10 ' >
                            <CommentIcon />
                        </div> */}
                        <img src="/images/chat.png" alt="event" className=' w-11 h-11 flex ' />
                    </div>
                )}

                <div className=' flex flex-col ' >
                    <Text className=' text-sm tracking-[-0.5px] font-bold text-primary ' >{item?.title}</Text>
                    <Text className=' text-[10px] text-primary text-opacity-75 ' >{textLimit(item?.message, 20)}</Text>
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
}
