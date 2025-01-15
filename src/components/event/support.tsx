import { Spinner, Text } from "@radix-ui/themes"; 
import { BackArrowIcon, SendIcon } from "../../svg";
import useEvent from "../../hooks/eventHooks/useEvent";
import { io } from "socket.io-client";
import { useEffect } from "react";
import Cookies from "js-cookie"
import LoadingAnimation from "../shared/loadingAnimation";
import useConversation from "../../hooks/eventHooks/useConversation";
import useGetEventData from "../../hooks/eventHooks/useGetEventData";
import { useSearchParams } from "react-router-dom";
import { useConversationHook } from "../../global-state/useConversationHook";
import lodash from 'lodash'; 
import ChatInput from "../shared/chatInput";

interface IProps {
    tab: boolean,
    setTab: (by: boolean) => void
}

export default function EventSupport({ tab, setTab }: IProps) {

    const { supportHookForm } = useEvent()  
    const [searchParams] = useSearchParams();
    const token = Cookies.get("access_token") 
    const index = searchParams.get("id"); 
    const { updateConversation, data: condata } = useConversationHook((state) => state)


    const userId = Cookies.get("user-index")

    const { data, isLoading } = useGetEventData().getSingleEventData()
    const { data: conversation, isLoading: loadingMessage, refetch } = useGetEventData().getConversationMessageData()
    const { createConversation, loadingConversation, createChat, loadingChat, inputMessage, setInputMessage } = useConversation()

    const socket: any = io("https://staging.hiroek.io", {
        auth: {
            token: token
        }
    });

    useEffect(() => {
        // Establish connection
        if (index) {
            // Listen for incoming messages
            socket.on(`conversation-${index}`, () => { 
                refetch()
            });
        }
    }, [index]);

    const clickHandler = (item: {
        fullname: string;
        photo: string;
        _id: string;
    }) => {
        createConversation({
            userTwo: item?._id,
            userType: "User"
        })
        updateConversation({
            ...condata,
            name: item?.fullname,
            photo: item?.photo
        })
        setTab(true)
    }

    const changeHandler = (value: any) => { 
        setInputMessage(value);
    } 

    return supportHookForm(
        <div className=' w-full flex gap-4 h-full' >
            <div className={` w-full ${!tab ? " flex " : " lg:flex hidden "} `} >
                <LoadingAnimation loading={isLoading || loadingMessage} >
                    <div className={` w-full px-4 flex-col flex gap-4 `} >
                        {lodash.uniqBy(data?.members, "_id")?.map((item, index) => {
                            return (
                                <div key={index} role="button" onClick={() => clickHandler(item)} className=" w-full flex items-center gap-2  " >
                                    <div className=" w-11 h-11 rounded-full border-2 border-primary " >
                                        <img src={item?.photo} className=" w-full h-full rounded-full object-cover " alt={item?._id} />
                                    </div>
                                    <div className=" flex flex-col " >
                                        <Text className=" text-sm font-bold text-primary tracking-[1%] " >{item?.fullname}</Text>
                                        {/* <Text className=" text-xs font-medium text-[#000000BF] tracking-[1%] " >Can we get this event started?</Text> */}
                                    </div>
                                    <div className=" flex flex-col ml-auto text-right gap-1 " >
                                        {/* <Text className=" text-[8px] font-extrabold text-[#6D6D6D] " >{item?.fullname}</Text> */}
                                        {/* <div className=" w-[22px] h-[22px] text-xs font-black text-white bg-primary tracking-[1.2%] ml-auto rounded-full flex justify-center items-center " style={{ boxShadow: "0px 2px 2px 0px #00000026" }} >
                                            0
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </LoadingAnimation>
            </div>
            <div className={` w-full ${(tab && !condata?.name) ? " lg:hidden " : tab ? " flex " : " hidden "} flex-col h-full items-end `} >
                <LoadingAnimation width="w-full lg:max-w-[393px] !h-full " loading={loadingConversation} >
                    <div className=" w-full lg:max-w-[393px] relative flex flex-col lg:mt-auto h-full lg:h-[60vh] rounded-3xl lg:border-[5px] lg:border-primary " >

                        <div className=" w-full flex sticky top-0 flex-col bg-white gap-1 pb-2 h-[20vh] rounded-t-3xl pt-3 lg:px-3 px-4  " >
                            <div className=' w-fit lg:hidden ' >
                                <div onClick={() => setTab(false)} role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
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
                            {/* <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl " >
                                <Text className=" text-xs font-semibold " >Can we get this event started? Can we get this event started? Can we get this event started? Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div>
                            <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " >
                                <Text className=" text-xs font-semibold " >Can we get this event started?</Text>
                            </div> */}
                            {conversation?.map((item, index) => {
                                if (item?.senderType)
                                    return (
                                        <div key={index} className={item?.sender?._id === userId ? " max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 ml-auto rounded-3xl rounded-br " : " max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl "} >
                                            <Text className=" text-xs font-semibold " >{item?.message}</Text>
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
