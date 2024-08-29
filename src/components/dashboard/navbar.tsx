import { useState } from "react";
import { DownArrowIcon, NotificationIcon } from "../../svg";
import { Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

    const [searchText, setSearchText] = useState("")

    const router = useNavigate()

    return (
        <div className=" w-full h-[55px] flex justify-between items-center px-4 " >
            <div className=" w-[300px] lg:block hidden " >
                <input type={"search"} placeholder={"Search"} value={searchText} onChange={(e) => setSearchText(e.target.value)} className=" h-[35px] px-3 border-[#37137F80] border-[0.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
            </div>
            <div className=" flex items-center ml-auto " >
                <div onClick={()=> router("/dashboard/notification")} role="button" className=" w-10 h-10 relative flex justify-center items-center " >
                    <div className=' absolute top-0 right-0 w-5 h-5 text-white bg-primary rounded font-semibold text-[10px] tracking-[0.5%] flex justify-center items-center ' >
                        0
                    </div>
                    <NotificationIcon />
                </div>
                <div role="button" onClick={()=> router("/dashboard/profile")} className=" cursor-pointer pl-3 ml-1 border-l border-[#F0F1F3] flex items-center gap-2 " >
                    <div className=" w-fit relative " >
                        <div className=" w-8 h-8 relative bg-primary rounded-full " >
                        </div>
                        <div className=" w-[10px] h-[10px] absolute bottom-0 right-0 border-2 border-white rounded-full bg-[#22CA83] " />
                    </div>
                    <div className=" hidden lg:flex flex-col ml-1 " >
                        <Text className=" text-xs tracking-[0.5%] font-semibold leading-[5px] text-[#1D1F2C] " >British Red Cross</Text>
                        <Text className=" text-xs tracking-[0.5%] font-semibold leading-[5px] text-[#4A4C56] " >Online</Text>
                    </div>
                    <div className=" lg:block hidden " role="button" >
                        <DownArrowIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
