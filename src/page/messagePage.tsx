import { Text } from "@radix-ui/themes" 
import PageHeader from "../components/shared/pageHeader"
import useGetEventData from "../hooks/eventHooks/useGetEventData"
import LoadingAnimation from "../components/shared/loadingAnimation"
import Cookies from "js-cookie" 
import { useSearchStore } from "../global-state/useSearchText"
import moment from "moment"
import { capitalizeFLetter } from "../utils/capitalLetter"
import { textLimit } from "../utils/textlimit"
import { useConversationHook } from "../global-state/useConversationHook"
import useConversation from "../hooks/eventHooks/useConversation"
import { useState } from "react"


export default function MessagePage() {
 
    const { search, setSearchText } = useSearchStore((state)=> state)
    const userId = Cookies.get("user-index") 
    const { data, isLoading } = useGetEventData().getEventConversationData() 
    const [show, setShow] = useState("") 

    const validEvent = (newdata: any)=> {
        let item= newdata.filter((item: any) => item.event !== null);  
        return item
    }

    const NotUser = (newdata: any)=> {
        let item= newdata.filter((item: any) => item.participant?._id !== userId); 
        return item
    }

    const { createConversation, loadingConversation } = useConversation()
    const { updateConversation, data: condata } = useConversationHook((state) => state)

    const clickHandler = (item: any, eventid: string, ownEvent: any) => {
 
        setShow(eventid) 
        if(ownEvent?.participant?._id === userId){
            createConversation({
                userTwo: item?.participant?._id,
                userType: item?.participantType+"",
                ownEvent: eventid + ""
            })
        } else {
            createConversation({
                userTwo: item?.participant?._id,
                userType: item?.participantType+"",
                userTwoEvent: eventid + ""
            })
        }
        
        updateConversation({
            ...condata,
            name: item?.participant?.fullname,
            photo: item?.participant?.photo
        }) 

    } 
    
    

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} path={"/dashboard"} header="Event Messages" second={true} body="" />
            <div className=" w-full lg:hidden flex px-4  " >
                <input type={"search"} placeholder={"Search"} value={search} onChange={(e) => setSearchText(e.target.value)} className=" h-[45px] px-3 border-[#37137F80] border-[0.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
            </div> 
            <LoadingAnimation loading={isLoading} length={data?.length} >
                <div className=" max-w-[400px] w-full flex flex-col gap-4 lg:px-0 px-4 " >
                    {data?.map((item, index) => {
                        let event = validEvent(item?.participants)
                        let userdata = NotUser(item?.participants)
                        return (
                            <div key={index} className=" w-full flex items-center py-4 border-b justify-between " >
                                <div className=" flex gap-2 items-center " >
                                    <div className=" w-fit " >
                                        <div className=" w-[32px] h-[32px] rounded-full " >
                                            <img src={event[0]?.event?.photo} alt={userdata[0]?.name} className=" object-cover w-full h-full rounded-full " />
                                        </div>
                                    </div>
                                    <div className=" flex flex-col " >
                                        {/* <Text className=" text-xs font-bold !leading-[14px] text-[#37137F] " >{capitalizeFLetter(textLimit(userdata[0]?.name, 20))}</Text> */}
                                        <Text className=" text-xs font-bold !leading-[14px] text-[#37137F] " >{capitalizeFLetter(textLimit(event[0]?.event?.name, 20))}</Text>
                                        <Text className=" text-[10px] text-[#37137F80] " >{moment(item.updatedAt)?.fromNow()}</Text>
                                    </div>
                                </div>
                                <div className=" w-fit " >
                                    <button disabled={loadingConversation} onClick={()=> clickHandler(userdata[0], event[0]?.event?._id, event[0])} className=" text-[#2E008B] !text-[10px] bg-[#37137F26] rounded-[44px] w-[75px] h-[25px] " >
                                        {(loadingConversation && event[0]?.event?._id === show) ? "Loading.." : "View Chats"} 
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </LoadingAnimation>
        </div>
    )
}
