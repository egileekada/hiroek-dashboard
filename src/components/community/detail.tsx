import { Text } from "@radix-ui/themes";
import { BackWhiteIcon, ChatIcon, EditIcon, HeartColorlessIcon, MoreIcon, SendTopIcon } from "../../svg";
import { useNavigate } from "react-router-dom";
import { ICommunity } from "../../model/community";


export default function CommunityDetail({ item }: { item: ICommunity }) {

    const data = ["media", "", "", "media"]
    const router = useNavigate()

    return (
        <div className=" w-full flex lg:flex-row flex-col gap-4 lg:gap-6 text-primary pb-6 " >
            <div className=" w-full h-fit flex flex-col rounded-b-[44px] lg:rounded-[44px] lg:p-8 pb-2 " >
                <div className=" w-full h-[240px] bg-green-700 relative rounded-b-[44px] lg:rounded-[44px] " >
                    <div role="button" onClick={() => router(-1)} className=" cursor-pointer lg:hidden w-11 h-11 absolute top-6 z-10 left-4 rounded-md bg-[#FFFFFF26] lg:bg-[#FFFFFF33] flex justify-center items-center " >
                        <BackWhiteIcon color="white" />
                    </div>
                    <img alt="image" src={item?.photo} className=" w-full h-full object-cover lg:rounded-[44px] " />
                    <div className=" absolute inset-0 bg-black bg-opacity-40 z-[5] " />
                    <div role="button" onClick={() => router(-1)} className=" text-white cursor-pointer text-xs lg:hidden w-fit px-3 h-11 absolute top-6 z-10 right-4 rounded-[44px] bg-[#FFFFFF26] lg:bg-[#FFFFFF33] flex gap-2 justify-center items-center " >
                        <EditIcon color="" />
                        Edit Community
                        {/* <QRIcon /> */}
                    </div>
                </div>
                <div className=" w-full px-4 lg:px-6 z-20 -mt-[25%]  " >
                    <div className=" p-5 text-primary w-full gap-2 bg-white flex flex-col rounded-[34px] items-center " style={{boxShadow: "0px 3px 3px 0px #00000038"}} >
                        <Text className=" font-black text-2xl " >{item?.name}</Text>
                        <Text className=" text-xs text-primary text-opacity-75 font-semibold text-center " >{item?.description}</Text>
                        {/* <div className=" w-fit px-4  h-[30px] bg-primary bg-opacity-15 font-bold text-sm flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                            Causes & Interest
                        </div>
                        <div className=" w-fit flex gap-3 " >
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-xs flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Education
                            </div>
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-xs flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Healthcare
                            </div>
                            <div className="w-fit px-4  h-[30px] bg-primary bg-opacity-90 text-white font-bold text-xs flex justify-center items-center rounded-[44px] " style={{ boxShadow: "0px 2px 4px 0px #0000001A" }} >
                                Agriculture
                            </div>
                        </div> */}
                        <div className='flex items-center mt-2 bg-primary bg-opacity-15 rounded-[44px] py-2 px-4 text-black ' >
                            <div className=' w-7 h-7 rounded-full bg-blue-600 ' />
                            <div className=' w-7 h-7 rounded-full -ml-2 bg-green-600 ' />
                            <div className=' w-7 h-7 rounded-full -ml-2 bg-red-600 ' />
                            <Text className=' ml-2 font-semibold text-sm ' >50K+ Members</Text>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-6 " >
                <div className=" w-full flex gap-2 px-2 justify-center " >
                    <button className=" text-white text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary " >Recent Posts</button>
                    <button className=" text-primary text-xs font-bold h-[40px] rounded-[44px] px-4 w-fit bg-primary bg-opacity-10 " >Announcements</button>
                    {/* <button onClick={()=> router("/dashboard/community/post")} className=" text-white gap-1 lg:gap-2 text-xs flex items-center justify-center font-bold h-[40px] rounded-[44px] lg:px-4 lg:w-fit w-full bg-primary " style={{ background: "linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" }} >
                        <ChatWhiteIcon /> Add New Post
                    </button> */}
                </div>
                <div className=" w-full rounded-[44px] p-4 lg:p-6 flex flex-col gap-6 " >
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