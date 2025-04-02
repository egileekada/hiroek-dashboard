import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import { menulistmobile } from "../../constant"
import { MobileCashIcon, MobileCommunityIcon, MobileEventIcon, MobileHomeIcon, MobileImpactIcon } from "../../svg"
import { Text } from "@radix-ui/themes"
import { useDetails } from "../../global-state/useUserDetails"
import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"
// import LoadingAnimation from "../shared/loadingAnimation"

export default function DashboardLayout() {

    const router = useNavigate()
    const history = useLocation()
    const { setAll } = useDetails((state) => state);
    const [loading, setLoading] = useState(true)

    const { isLoading, data, isError } = useUser()

    useEffect(() => {
        if (!isLoading) {
            if (data?.email) {
                console.log(data);

                setAll({ ...data })
                setLoading(false)
            } else if (isError) {
                router("/login")
            }
        }


    }, [setAll, isLoading, setLoading, loading, isError])

    return (
        // <LoadingAnimation loading={isLoading} >
        <div className=" w-screen h-screen flex overflow-hidden " >
            <div className=" w-fit md:block hidden " >
                <div className=" md:w-[60px] lg:w-[300px] h-screen border-r border-r-[#F0F1F3] " style={{ boxShadow: "4px 0px 30px 0px #8362EA0D" }} >
                    <Sidebar />
                </div>
            </div>
            <div className=" w-full flex flex-col h-screen overflow-hidden relative " >
                <div className={` w-full bg-white h-fit ${(history?.pathname?.includes("/dashboard/event/details") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("scan") || history?.pathname?.includes("support") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("/dashboard/community/post-comment")) ? " lg:block hidden " : " block "} top-0 fixed `} >
                    <Navbar />
                </div>
                <div className={` overflow-y-auto inset-x-0 absolute h-full
                        ${(history?.pathname?.includes("/dashboard/event/create") || history?.pathname?.includes("/dashboard/donation/withdraw") || history?.pathname?.includes("scan") || history?.pathname?.includes("event/details/bymembers") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("/dashboard/community/post-comment")) ? "" : "bottom-[80px] pb-12"}
                        ${(history?.pathname?.includes("/dashboard/event/details") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("scan") || history?.pathname?.includes("support") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/post-comment")) ? " lg:top-[55px] lg:p-6 top-0 " : " top-[55px] lg:p-6 p-0 "} `} >
                    <Outlet /> 
                </div>
                {(!history?.pathname?.includes("/event/support") && !history?.pathname?.includes("/dashboard/event/create") && !history?.pathname?.includes("scan") && !history?.pathname?.includes("event/details/bymembers") && !history?.pathname?.includes("/dashboard/donation/withdraw") && !history?.pathname?.includes("/dashboard/settings") && !history?.pathname?.includes("/dashboard/support") && !history?.pathname?.includes("/dashboard/community/details") && !history?.pathname?.includes("/dashboard/community/post-comment")) && (
                    <div className=" w-full h-[80px] fixed bottom-0 z-50 rounded-t-[25px] bg-primary md:hidden flex flex-row justify-around items-center px-2 " >
                        {menulistmobile?.map((item, index) => {
                            return (
                                <div onClick={() => router(item?.link)} role='button' key={index} className={` w-full h-fit flex flex-col items-center justify-center text-white rounded-t-[25px] `} >
                                    <div className={` w-[70%] h-8 ${history?.pathname === item?.link ? " bg-[#FFFFFF1F] " : ""} rounded-[44px] flex justify-center items-center`} >
                                        {item?.name === "Home" && (
                                            <MobileHomeIcon active={history?.pathname === item?.link} />
                                        )}
                                        {item?.name === "Events" && (
                                            <MobileEventIcon />
                                        )}
                                        {item?.name === "Channels" && (
                                            <MobileCommunityIcon />
                                        )}
                                        {item?.name === "Revenue" && (
                                            <MobileCashIcon />
                                        )}
                                        {item?.name === "Impact" && (
                                            <MobileImpactIcon />
                                        )}
                                    </div>
                                    <Text className=' text-xs font-bold mt-2 ' >{item?.name}</Text>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>

        // </LoadingAnimation>
    )
}
