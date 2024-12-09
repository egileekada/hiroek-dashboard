import { Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import { BackArrowIcon, SendIcon } from "../../svg";
import useEvent from "../../hooks/eventHooks/useEvent";

interface IProps {
    tab: boolean,
    setTab: (by: boolean) => void
}

export default function EventSupport({ tab, setTab }: IProps) {

    const { supportHookForm } = useEvent()

    return supportHookForm (
        <div className=' w-full flex gap-4 h-full' >
            <div className={` w-full px-4 ${!tab ? " lg:flex flex " : " lg:flex hidden "} flex-col gap-4 `} >
                {/* <div role="button" onClick={() => setTab(true)} className=" w-full flex items-center gap-2  " >
                    <div className=" w-11 h-11 rounded-full border-2 border-primary " >

                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary tracking-[1%] " >Ethan Silva</Text>
                        <Text className=" text-xs font-medium text-[#000000BF] tracking-[1%] " >Can we get this event started?</Text>
                    </div>
                    <div className=" flex flex-col ml-auto text-right gap-1 " >
                        <Text className=" text-[8px] font-extrabold text-[#6D6D6D] " >Ethan Silva</Text>
                        <div className=" w-[22px] h-[22px] text-xs font-black text-white bg-primary tracking-[1.2%] ml-auto rounded-full flex justify-center items-center " style={{ boxShadow: "0px 2px 2px 0px #00000026" }} >
                            0
                        </div>
                    </div>
                </div> */}
                <div role="button" onClick={() => setTab(true)} className=" w-full flex items-center gap-2  " >
                    <div className=" w-11 h-11 rounded-full border-2 border-primary " >

                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary tracking-[1%] " >Ethan Silva</Text>
                        <Text className=" text-xs font-medium text-[#000000BF] tracking-[1%] " >Can we get this event started?</Text>
                    </div>
                    <div className=" flex flex-col ml-auto text-right gap-1 " >
                        <Text className=" text-[8px] font-extrabold text-[#6D6D6D] " >Ethan Silva</Text>
                        <div className=" w-[22px] h-[22px] text-xs font-black text-white bg-primary tracking-[1.2%] ml-auto rounded-full flex justify-center items-center " style={{ boxShadow: "0px 2px 2px 0px #00000026" }} >
                            0
                        </div>
                    </div>
                </div>
                <div role="button" onClick={() => setTab(true)} className=" w-full flex items-center gap-2  " >
                    <div className=" w-11 h-11 rounded-full border-2 border-primary " >

                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary tracking-[1%] " >Ethan Silva</Text>
                        <Text className=" text-xs font-medium text-[#000000BF] tracking-[1%] " >Can we get this event started?</Text>
                    </div>
                    <div className=" flex flex-col ml-auto text-right gap-1 " >
                        <Text className=" text-[8px] font-extrabold text-[#6D6D6D] " >Ethan Silva</Text>
                        <div className=" w-[22px] h-[22px] text-xs font-black text-white bg-primary tracking-[1.2%] ml-auto rounded-full flex justify-center items-center " style={{ boxShadow: "0px 2px 2px 0px #00000026" }} >
                            0
                        </div>
                    </div>
                </div>
            </div>
            <div className={` w-full ${tab ? " lg:flex " : " lg:flex hidden "} flex-col h-full items-end `} >
                <div className=" w-full lg:max-w-[393px] relative flex flex-col gap-2 lg:mt-auto h-full lg:h-[500px] rounded-3xl lg:border-[5px] overflow-y-auto lg:border-primary " >
                    <div className=" w-full flex sticky top-0 flex-col bg-white gap-1 pb-2 rounded-t-3xl pt-3 lg:px-3 px-4  " >
                        <div className=' w-fit lg:hidden ' >
                            <div onClick={() => setTab(false)} role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                                <BackArrowIcon />
                            </div>
                        </div>
                        <Text className=" text-[28px] font-black text-primary " >Chat Support</Text>
                        <div className=" flex items-center gap-2 " >
                            <div className=" w-10 h-10 rounded-full border-2 border-primary " >

                            </div>
                            <div className=" flex flex-col " >
                                <Text className=" text-sm font-bold text-primary tracking-[1%] " >Ethan Silva</Text>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full h-fit flex flex-col-reverse gap-3 pb-[10px] lg:px-3 px-6 " >
                        <div className=" max-w-[70%] w-fit bg-primary text-primary bg-opacity-10 flex justify-center items-center px-4 py-4 rounded-3xl rounded-bl " >
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
                        </div>
                    </div>
                    <div className=" w-full mt-auto lg:block hidden sticky bottom-0 p-3 bg-white " >
                        <CustomInput borderRadius="9999px" placeholder="Type your message..." name="chat" type="text" hasIcon={true} icon={<SendIcon />} />
                    </div>
                    <div className=" w-full fixed lg:hidden bottom-0 p-3 bg-white " >
                        <CustomInput borderRadius="9999px" placeholder="Type your message..." name="chat" type="text" hasIcon={true} icon={<SendIcon />} />
                    </div>
                </div>
            </div>
        </div>
    )
}
