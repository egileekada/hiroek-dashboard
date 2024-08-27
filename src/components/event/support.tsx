import { Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import { SendIcon } from "../../svg";


export default function EventSupport() {
    return (
        <div className=' w-full flex gap-4 h-full' >
            <div className=" w-full px-5 " >
                <div className=" w-full flex items-center gap-2  " >
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
            <div className=" w-full flex flex-col h-full items-end " >
                <div className=" w-full max-w-[393px] relative flex flex-col gap-2 mt-auto h-[500px] rounded-3xl border-[5px] overflow-y-auto border-primary " >
                    <div className=" w-full flex sticky top-0 flex-col bg-white gap-1 pb-2 rounded-t-3xl pt-3 px-3  " >
                        <Text className=" text-[28px] font-black text-primary " >Chat Support</Text>
                        <div className=" flex items-center gap-2 " > 
                            <div className=" w-10 h-10 rounded-full border-2 border-primary " >

                            </div>
                            <div className=" flex flex-col " >
                                <Text className=" text-sm font-bold text-primary tracking-[1%] " >Ethan Silva</Text>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full h-fit flex flex-col-reverse gap-3 pb-[10px] px-3 " >
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
                    <div className=" w-full mt-auto sticky bottom-0 p-3 bg-white " >
                        <CustomInput borderRadius="9999px" placeholder="Type your message..." name="chat" type="text" hasIcon={true} icon={<SendIcon />} />
                    </div>
                </div>
            </div>
        </div>
    )
}
