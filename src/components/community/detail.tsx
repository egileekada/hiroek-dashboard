import { Text } from "@radix-ui/themes";
import { ChatIcon, ChatWhiteIcon, HeartColorlessIcon, MoreIcon, SendTopIcon } from "../../svg";


export default function CommunityDetail() {

    const data = ["media", "", "", "media"]

    return (
        <div className=" w-full flex gap-6 text-primary pb-6 " >
            <div className=" w-full h-fit flex flex-col rounded-[44px] p-8 pb-12 " style={{ boxShadow: "0px 4px 30px 0px #0000000D" }} >
                <div className=" w-full h-[316px] bg-green-700 rounded-3xl " >

                </div>
                <div className=" w-full px-6 -mt-[25%]  " >
                    <div className=" p-5 text-primary w-full gap-2 bg-white flex flex-col rounded-[14px] items-center " style={{ boxShadow: "0px 3px 10px 0px #0000000D" }} >
                        <Text className=" font-black text-2xl " >Hope Harvesters</Text>
                        <Text className=" text-xs text-primary text-opacity-75 font-semibold text-center " >Hope Harvesters is A Community dedicated to uplifting underprivileged communities through sustainable development programs, educational initiatives, and health services. Our mission is to harvest hope and create opportunities for a brighter future.</Text>
                        <div className=" w-fit px-4  h-[30px] bg-primary bg-opacity-15 font-bold text-sm flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                            Causes & Interest
                        </div>
                        <div className=" w-fit flex gap-3 " >
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-sm flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Education
                            </div>
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-sm flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Healthcare
                            </div>
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-sm flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Agriculture
                            </div>
                        </div>
                        <div className='flex items-center mt-2 bg-primary bg-opacity-15 rounded-[44px] py-2 px-4 text-black ' >
                            <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                            <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                            <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' />
                            <Text className=' ml-2 font-semibold ' >50K+ Members</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-6 " >
                <div className=" w-full flex gap-2 " >
                    <button className=" text-white text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary " >Recent Posts</button>
                    <button className=" text-primary text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary bg-opacity-10 " >Announcements</button>
                    <button className=" text-white gap-2 text-xs flex items-center font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary " style={{ background: "linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" }} >
                        <ChatWhiteIcon /> Add New Post
                    </button>
                </div>
                <div className=" w-full rounded-[44px] p-6 flex flex-col gap-6 " style={{ boxShadow: "0px 4px 30px 0px #2E2D741A" }} >
                    {data?.map((item) => {
                        return (
                            <div className=" w-full flex flex-col gap-3 " >
                                <div className=" flex items-center w-full justify-between " >
                                    <div className=" flex items-center gap-2 " >
                                        <div className=" w-10 h-10 rounded-full border border-primary border-opacity-50 " >

                                        </div>
                                        <div className=" flex flex-col " >
                                            <Text className=" text-xs font-bold " >Anya Taylor Smith</Text>
                                            <Text className=" text-[10px] italic font-bold text-primary text-opacity-50 " >5mins ago</Text>
                                        </div>
                                    </div>
                                    <div className=" flex gap-3 items-center " >
                                        <div role="button" className=" cursor-pointer w-fit " >
                                            <SendTopIcon />
                                        </div>
                                        <div role="button" className=" cursor-pointer w-fit " >
                                            <MoreIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className=" w-full flex flex-col px-3 gap-3 " >
                                    <Text className=" text-xs font-medium " >We're overwhelmed by the incredible support from our community! Your generosity has made a tremendous difference in the lives of many. Thank you for being part of our mission.</Text>
                                    {item === "media" && (
                                        <div className=" w-full h-[200px] bg-red-400 rounded-2xl " >

                                        </div>
                                    )}
                                    <div className=" flex items-center gap-4 " >
                                        <div role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                                            <HeartColorlessIcon size="24px" />
                                            <Text className=" font-black text-xs " >0</Text>
                                        </div>
                                        <div role="button" className=" cursor-pointer flex gap-2 items-center text-primary " >
                                            <ChatIcon />
                                            <Text className=" font-black text-xs " >0</Text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}