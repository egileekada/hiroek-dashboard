import { Spinner, Text } from "@radix-ui/themes";
import { BackArrowIcon, SendIcon } from "../../svg";
import useEvent from "../../hooks/eventHooks/useEvent";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Cookies from "js-cookie"
import LoadingAnimation from "../shared/loadingAnimation";
import useConversation from "../../hooks/eventHooks/useConversation";
import useGetEventData from "../../hooks/eventHooks/useGetEventData";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useConversationHook } from "../../global-state/useConversationHook";
// import lodash from 'lodash';
import ChatInput from "../shared/chatInput";
import moment from "moment";
import { useQueryClient } from "react-query";
import { capitalizeFLetter } from "../../utils/capitalLetter";
import { textLimit } from "../../utils/textlimit";

interface IProps {
    tab: boolean,
    setTab: (by: boolean) => void
}

export default function EventSupport({ tab, setTab }: IProps) {

    const { supportHookForm } = useEvent()
    const [searchParams] = useSearchParams();
    const token = Cookies.get("access_token")
    const index = searchParams.get("id");
    const { id: eventId } = useParams();
    const { updateConversation, data: condata } = useConversationHook((state) => state)
    const query = useQueryClient()
    const message = searchParams.get("message");
    const membe = searchParams.get("member");
    const curate = searchParams.get("curate"); 
    const navigate = useNavigate()


    const userId = Cookies.get("user-index") 

    const { data: conversation, isLoading: loadingMessage, refetch } = useGetEventData().getConversationMessageData()
    const { data: conversationMember, isLoading: loadingMember, refetch: refetchMember } = useGetEventData().getConversationEventMember()
    const { createConversation, loadingConversation, createChat, loadingChat, inputMessage, setInputMessage } = useConversation()

    const socket: any = io("https://staging.hiroek.io", {
        auth: {
            token: token
        }
    });

    const validEvent = (newdata: any) => {
        let item = newdata.filter((item: any) => item.event !== null);
        return item
    }

    const NotUser = (newdata: any) => {
        let item = newdata.filter((item: any) => item.participant?._id !== userId);
        return item
    }

    useEffect(() => {
        // Establish connection
        if (index) {
            // Listen for incoming messages
            socket.on(`conversation-${index}`, () => {
                refetch()
            });
        }
    }, [index]); 

    const clickHandler = (item: any, eventid: string, ownEvent: any) => {

        console.log("test");
        
        if (!loadingConversation) {
            if (ownEvent?.participant?._id === userId) {
                createConversation({
                    userTwo: item?.participant?._id,
                    userType: item?.participantType + "",
                    ownEvent: eventid + ""
                })
            } else {
                createConversation({
                    userTwo: item?.participant?._id,
                    userType: item?.participantType + "",
                    userTwoEvent: eventid + ""
                })
            }
            setTab(true)
            updateConversation({
                ...condata,
                name: item?.participant?.fullname,
                photo: item?.participant?.photo
            })
        }

    }

    useEffect(() => {
        if (index || membe) {
            setTab(true)
        }

        if(membe && !condata?.photo){
            navigate(`/dashboard/event/details/bymembers/${eventId}`)
        }
    }, [index, membe])

    const changeHandler = (value: any) => {
        setInputMessage(value);
    }

    useEffect(() => {
        socket.emit('conversation-opened', {
            conversationId: index
        });
        query?.invalidateQueries("Conversations-count")
        refetchMember()
    }, [index])

    const clickBack = () => {
        // member? `/event/details/bymembers/${id}` : index ? `/dashboard/message` : `/dashboard/event/details/${id}
        if (membe) {
            navigate(`/dashboard/event/details/bymembers/${eventId}`)
        } else if (curate) {
            navigate(`/dashboard/message`)
        } else if (message) {
            if(index){
                setTab(false)
                navigate(-1) 
            } else { 
                navigate(`/dashboard/message`)
            }
        } else {
            setTab(false)
        }
    } 

    return supportHookForm(
        <div className=' w-full flex gap-4 h-full' >
            <div className={` w-full ${!tab ? " flex " :( membe || curate )? " hidden " : " lg:flex hidden "} `} >
                <LoadingAnimation loading={loadingMember} length={(conversationMember)?.length} >
                    <div className={` w-full px-4 flex-col flex gap-4 `} >
                        {conversationMember?.map((item, index) => {
                            let event = validEvent(item?.participants)
                            let userdata = NotUser(item?.participants)
                            return ( 
                                <div key={index} role="button" onClick={() => clickHandler(userdata[0], event[0]?.event?._id, event[0])} className=" w-full flex items-center gap-2  " >
                                    <div className=" w-11 h-11 rounded-full border-2 border-primary " >
                                        <img src={userdata[0]?.participant?.photo} alt={userdata[0]?.name} className=" object-cover w-full h-full rounded-full " />
                                    </div>
                                    <div className=" flex flex-col " >
                                        <Text className=" text-sm font-bold text-primary tracking-[1%] " >{capitalizeFLetter(textLimit(userdata[0]?.name, 20))}</Text>
                                        <Text className=" text-xs font-medium text-[#000000BF] tracking-[1%] " >{item?.lastMessage?.message}</Text>
                                    </div>
                                    <div className=" flex flex-col ml-auto text-right gap-1 " >
                                        {Number(item?.unreadMessages) > 0  && (
                                            <div className=" w-4 h-4 rounded-full flex items-center justify-center text-xs bg-primary text-white " > 
                                                {item?.unreadMessages}
                                            </div>
                                        )}
                                    </div>
                                </div> 
                            )
                        })}
                    </div>
                </LoadingAnimation>
            </div>
            <div className={` w-full ${(tab || index) ? " flex " : " hidden "} flex-col h-full items-end `} >
                <LoadingAnimation width="w-full lg:max-w-[393px] !h-full " loading={loadingConversation || loadingMessage} >
                    <div className=" w-full lg:max-w-[393px] relative flex flex-col lg:mt-auto h-full lg:h-[60vh] rounded-3xl lg:border-[5px] lg:border-primary " >

                        <div className=" w-full flex sticky top-0 flex-col bg-white gap-1 pb-2 h-[20vh] rounded-t-3xl pt-3 lg:px-3 px-4  " >
                            <div className=' w-fit lg:hidden ' >
                                <div onClick={() => clickBack()} role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                                    <BackArrowIcon />
                                </div>
                            </div>
                            <Text className=" text-[28px] font-black text-primary " >Chat Support</Text>
                            <div className=" flex items-center gap-2 " >
                                <div className=" w-10 h-10 rounded-full border-2 border-primary " >
                                    <img src={condata?.photo + ""} alt="current" className=" w-full h-full rounded-full object-cover " />
                                </div>
                                <div className=" flex flex-col " >
                                    <Text className=" text-sm font-bold text-primary tracking-[1%] " >{condata?.name}</Text>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full lg:relative fixed lg:bottom-0 bottom-20 h-[65vh]  lg:h-[35vh] flex flex-col-reverse overflow-y-auto mt-auto gap-3 pb-[10px] lg:px-3 px-6 " >
                            {conversation?.map((item, index) => {
                                if (item?.senderType)
                                    return (
                                        <div className=" w-full flex flex-col " >
                                            <div key={index} className={item?.sender?._id === userId ? " max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " : " max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl "} >
                                                <Text className=" text-xs font-semibold " >{item?.message}</Text>
                                            </div>
                                            <Text className={` ${item?.sender?._id === userId ? " ml-auto" : ""} text-[8px] text-primary  `} >{moment(item?.createdAt)?.fromNow()}</Text>
                                        </div>
                                    )
                            })}
                        </div>
                        <div className=" w-full mt-auto lg:block hidden sticky bottom-0 p-3 bg-white rounded-b-3xl " >
                            <ChatInput changeHandler={changeHandler} value={inputMessage} borderRadius="9999px" placeholder="Type your message..." type="text" hasIcon={true} icon={
                                <div role="button" onClick={() => createChat({
                                    message: inputMessage,
                                    // replying: "empty"
                                })} >
                                    {loadingChat ?
                                        <Spinner size={"3"} /> :
                                        <SendIcon color={inputMessage ? "#37137f" : "#37137F80"} />
                                    }
                                </div>
                            } />
                        </div>
                        <div className=" w-full fixed lg:hidden bottom-0 p-3 bg-white " >
                            <ChatInput changeHandler={changeHandler} value={inputMessage} borderRadius="9999px" placeholder="Type your message..." type="text" hasIcon={true} icon={
                                <div role="button" onClick={() => createChat({
                                    message: inputMessage,
                                    // replying: "empty"
                                })} >
                                    {loadingChat ?
                                        <Spinner size={"3"} /> :
                                        <SendIcon color={inputMessage ? "#37137f" : "#37137F80"} />
                                    }
                                </div>
                            } />
                        </div>

                    </div>
                </LoadingAnimation>
            </div>
        </div>
    )
}
