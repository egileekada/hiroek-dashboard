import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import { menulistmobile } from "../../constant"
import { MobileCashIcon, MobileCommunityIcon, MobileEventIcon, MobileHomeIcon, MobileImpactIcon } from "../../svg"
import { Text } from "@radix-ui/themes"
import { useDetails } from "../../global-state/useUserDetails"
import { useEffect, useState } from "react"
import useUser from "../../hooks/useUser"
import useTawkTo from "../../services/useTawk"
// import LoadingAnimation from "../shared/loadingAnimation"

export default function DashboardLayout() {

    const router = useNavigate()
    const history = useLocation()
    const { setAll } = useDetails((state) => state);
    const [loading, setLoading] = useState(true)
    const { hideChat } = useTawkTo("680611b92a762a1910951e8f", "1ipbrafch");

    useEffect(()=> {
        hideChat()
    }, [history, router])

    const { isLoading, data, isError } = useUser()

    useEffect(() => {
        if (!isLoading) {
            if (data?.email) { 
                setAll({ ...data })
                setLoading(false)
            } else if (isError) {
                router("/login")
            }
        }

        hideChat()

    }, [setAll, isLoading, setLoading, loading, isError])

    return (
        <>

            <div className=" w-screen h-full relative lg:flex hidden overflow-hidden " >
                <div className=" w-fit md:block hidden " >
                    <div className=" md:w-[60px] lg:w-[300px] h-screen border-r border-r-[#F0F1F3] " style={{ boxShadow: "4px 0px 30px 0px #8362EA0D" }} >
                        <Sidebar />
                    </div>
                </div>
                <div className=" w-full flex flex-col h-screen overflow-hidden relative " >
                    <div className={` w-full bg-white h-fit ${(history?.pathname?.includes("/dashboard/event/details") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("scan") || history?.pathname?.includes("support") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("/dashboard/community/post-comment")) ? " lg:block hidden " : " block "} top-0 sticky z-10 `} >
                        <Navbar />
                    </div>
                    <div className={` overflow-y-auto inset-0 absolute flex h-auto lg:pb-0 pb-32
                        ${(history?.pathname?.includes("/dashboard/event/create") || history?.pathname?.includes("/dashboard/donation/withdraw") || history?.pathname?.includes("scan") || history?.pathname?.includes("event/details/bymembers") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("/dashboard/community/post-comment")) ? "" : " botton-[80px] "}
                        ${(history?.pathname?.includes("/dashboard/event/details") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("scan") || history?.pathname?.includes("support") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/post-comment")) ? " lg:top-[55px] lg:p-6 top-0 " : " top-[55px] lg:p-6 p-0 "} `} >
                            <Outlet /> 
                    </div>

                </div>
            </div>
            <div className=" absolute inset-0 lg:hidden flex overflow-hidden flex-col flex-1  " >
                <div className=" w-full h-fit " >
                    <div className={` w-full bg-white h-fit ${(history?.pathname?.includes("/dashboard/event/details") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("scan") || history?.pathname?.includes("support") || history?.pathname?.includes("/dashboard/settings") || history?.pathname?.includes("/dashboard/support") || history?.pathname?.includes("/dashboard/community/details") || history?.pathname?.includes("/dashboard/community/post-comment")) ? " lg:block hidden " : " block "} top-0 sticky z-10 `} >
                        <Navbar />
                    </div>
                </div>
                <div className=" w-full h-full overflow-y-auto ">
                    <div className=" w-full h-full flex flex-col gap-3 " >
                        <Outlet />
                    </div>
                </div>
                {(!history?.pathname?.includes("/event/support") && !history?.pathname?.includes("/dashboard/event/create") && !history?.pathname?.includes("scan") && !history?.pathname?.includes("event/details/bymembers") && !history?.pathname?.includes("/dashboard/donation/withdraw") && !history?.pathname?.includes("/dashboard/settings") && !history?.pathname?.includes("/dashboard/support") && !history?.pathname?.includes("/dashboard/community/details") && !history?.pathname?.includes("/dashboard/community/post-comment")) && (

                    <div className=" w-full h-fit " >
                        <div className=" w-full h-[80px] z-50 rounded-t-[25px] bg-primary md:hidden flex flex-row justify-around items-center px-2 " >
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
                    </div>
                )}
            </div>
        </>
    )
}


