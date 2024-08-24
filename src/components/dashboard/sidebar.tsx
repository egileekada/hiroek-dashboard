import { Text } from '@radix-ui/themes'
import { useLocation, useNavigate } from 'react-router-dom'
import { menulist } from '../../constant'
import { CashIcon, CommunityIcon, DashboardIcon, EventIcon, ImpactIcon } from '../../svg';

export default function Sidebar() {

    const history = useLocation()
    const router = useNavigate()

    return (
        <div className=' w-full py-8 flex flex-col gap-6 ' >
            <div className=' px-4 w-full ' >
                <div className=' w-full h-[160px] rounded-[24px] bg-primary px-2 flex justify-center items-center ' >
                    <img src='/logo.png' alt='logo' />
                </div>
            </div>
            <div className=' w-full flex flex-col gap-2 ' >
                {menulist?.map((item, index) => {
                    return (
                        <div onClick={()=> router(item?.link)} role='button' key={index} className={` w-full flex items-center gap-3 ${history?.pathname === item?.link ? "bg-primary30 border-l-4 border-l-primary text-primary " : " bg-transparent text-[#37137F80] "} px-6 h-[48px] `} >
                            <div className={` w-7 h-7 flex justify-center items-center ${history?.pathname === item?.link ? " text-primary ": " text-[#37137F80] "} `} >
                                {item?.name === "Home" && (
                                    <DashboardIcon />
                                )}
                                {item?.name === "Events" && (
                                    <EventIcon />
                                )}
                                {item?.name === "Communities" && (
                                    <CommunityIcon />
                                )}
                                {item?.name === "Manage Donations" && (
                                    <CashIcon />
                                )}
                                {item?.name === "Impact Report" && (
                                    <ImpactIcon />
                                )}
                            </div>
                            <Text className=' text-sm font-bold leading-5 ' >{item?.name}</Text>
                            {item?.indicator && (
                                <div className=' w-5 ml-auto h-5 text-white bg-primary rounded font-semibold text-[10px] tracking-[0.5%] flex justify-center items-center ' >
                                    0
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
