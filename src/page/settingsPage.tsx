import PageHeader from "../components/shared/pageHeader";
import { Text } from "@radix-ui/themes";
import { IoIosArrowForward } from "react-icons/io";
import { LogoutIcon, SupportIcon } from "../svg";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/shared";
import Cookies from "js-cookie" 

export default function SettingsPage() {

    const navigate = useNavigate()
    const clickHandler = () =>{ 
        Cookies.set("access_token", "")
        Cookies.set("user-index", "") 
        navigate("/login")
    }

    return (
        <div className=' w-full h-full flex flex-col gap-6 py-4 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader notification={true} second={true} back={true} header="App Settings" body="" />
            </div>
            <div className=" w-full flex flex-col mt-4  " >
                {/* <div className=" w-full px-4 py-6 flex flex-col gap-4 border-b border-[#0000001A] " >
                    <div className=" w-full flex gap-2 " >
                        <div className=" w-4 h-4 " >
                            <NotificationIcon2 />
                        </div>
                        <Text className=" text-sm font-bold text-primary " >Notifications</Text>
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary text-opacity-50 " >Enable Push Notifications</Text>
                        <Switch />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary text-opacity-50 " >Enable Email Notifications</Text>
                        <Switch />
                    </div>
                </div>

                <div className=" w-full flex gap-2 items-center px-4 py-6 border-b border-[#0000001A] " >
                    <div className=" w-4 h-4 " >
                        <WorldIcon />
                    </div>
                    <Text className=" text-sm font-bold text-primary " >Language</Text>
                    <IoIosArrowForward className=" ml-auto " />
                </div>
                <div className=" w-full flex gap-2 items-center px-4 py-6 border-b border-[#0000001A] " >
                    <div className=" w-4 h-4 " >
                        <RatingIcon />
                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary " >Rate Our Platform</Text>
                        <Text className=" text-xs font-bold text-primary text-opacity-50 " >Please give us your feedback</Text>
                    </div> 
                </div> */}
                <div role="button" onClick={() => navigate("/dashboard/support")} className=" w-full flex gap-4 items-center px-4 py-6 border-b border-[#0000001A] " >
                    <div className=" w-4 h-4 " >
                        <SupportIcon />
                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary " >Contact Support</Text>
                        <Text className=" text-xs font-bold text-primary text-opacity-50 " >Please give us your feedback</Text>
                    </div>
                    <IoIosArrowForward className=" ml-auto " />
                </div>
                {/* <div className=" w-full flex gap-2 items-center px-4 py-6 border-b border-[#0000001A] " >
                    <div className=" w-4 h-4" >
                        <DeleteIcon />
                    </div>
                    <div className=" flex flex-col " >
                        <Text className=" text-sm font-bold text-primary " >Delete Account</Text>
                        <Text className=" text-xs font-bold text-primary text-opacity-50 " >Please give us your feedback</Text>
                    </div> 
                </div> */}
            </div>
            <div className=" mt-auto w-full px-4 lg:hidden " >
                <CustomButton onClick={clickHandler} bgColor="#CC1B1BCC" hasFrontIcon={true} icon={<LogoutIcon />} >
                    Log Out
                </CustomButton>
            </div>
        </div>
    )
}
