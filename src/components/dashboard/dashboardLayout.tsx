import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import { menulistmobile } from "../../constant"
import { MobileCashIcon, MobileCommunityIcon, MobileEventIcon, MobileHomeIcon, MobileImpactIcon } from "../../svg"
import { Text } from "@radix-ui/themes"
import { useDetails } from "../../global-state/useUserDetails"
import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"
import LoadingAnimation from "../shared/loadingAnimation"

export default function DashboardLayout() {

    const router = useNavigate()
    const history = useLocation()
    const { setAll } = useDetails((state) => state);
    const [loading, setLoading] = useState(true)

    const { isLoading, data } = useUser()

    useEffect(() => {
        if (!isLoading) {
            if (data?.email) {
                setAll({ ...data })
                setLoading(false)
            } else {
                router("/login")
            }
        }
    }, [setAll, isLoading, setLoading, loading])

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-screen h-screen flex overflow-hidden " >
                <div className=" w-fit md:block hidden " >
                    <div className=" md:w-[60px] lg:w-[300px] h-screen border-r border-r-[#F0F1F3] " style={{ boxShadow: "4px 0px 30px 0px #8362EA0D" }} >
                        <Sidebar />
                    </div>
                </div>
                <div className=" w-full flex flex-col h-screen overflow-hidden relative " >
                    <div className={` w-full bg-white h-fit ${(history?.pathname === "/dashboard/event/details" || history?.pathname === "/dashboard/community/details") ? " lg:block hidden " : " blocl "} top-0 sticky `} >
                        <Navbar />
                    </div>
                    <div className={` overflow-y-auto inset-0 md:bottom-0 bottom-[90px] absolute flex ${(history?.pathname === "/dashboard/event/details" || history?.pathname === "/dashboard/community/details") ? " lg:top-[55px] lg:p-6 top-0 " : " top-[55px] lg:p-6 p-0 "} pb-8 `} >
                        <Outlet />
                    </div>
                    <div className=" w-full h-[90px] fixed bottom-0 z-50 rounded-[25px] bg-primary md:hidden flex flex-row justify-around items-center px-2 " >
                        {menulistmobile?.map((item, index) => {
                            return (
                                <div onClick={() => router(item?.link)} role='button' key={index} className={` w-full h-fit flex flex-col items-center justify-center text-white rounded-t-[25px] `} >
                                    <div className={` w-[70%] h-8 ${history?.pathname === item?.link ? " bg-[#FFFFFF1F] " : ""} rounded-[44px] flex justify-center items-center`} >
                                        {item?.name === "Home" && (
                                            <MobileHomeIcon />
                                        )}
                                        {item?.name === "Events" && (
                                            <MobileEventIcon />
                                        )}
                                        {item?.name === "Community" && (
                                            <MobileCommunityIcon />
                                        )}
                                        {item?.name === "Donations" && (
                                            <MobileCashIcon />
                                        )}
                                        {item?.name === "Impact" && (
                                            <MobileImpactIcon />
                                        )}
                                    </div>
                                    <Text className=' text-sm font-bold !leading-[16px] mt-2 ' >{item?.name}</Text>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </LoadingAnimation>
    )
}
