import { Text } from "@radix-ui/themes";
import PageHeader from "../components/shared/pageHeader";
import { CashIcon, CommunityIcon, EventIcon } from "../svg";
import EventCardList from "../components/shared/eventCardList";
import CommunityCardList from "../components/shared/communityCardList";
import { useDetails } from "../global-state/useUserDetails";
import { capitalizeFLetter } from "../utils/capitalLetter";
import useGetStats from "../hooks/useGetStats";
import { formatNumberWithK } from "../utils/formatNumberWithK";
import { formatNumber } from "../utils/numberFormat";


export default function DashboardPage() {

    const { name  } = useDetails((state) => state);

    const  { data } = useGetStats()
    
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header={"Welcome "+capitalizeFLetter(name)} body="Effortlessly Create Events and Engage With Your Supporters In Real Time." />
            <div className=" w-full grid grid-cols-2 lg:flex gap-4 px-4 lg:px-0 " >
                <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[170px] relative flex items-center  " >
                    <div className=" px-4 flex flex-col text-white " >
                        <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                            <CashIcon />
                        </div>
                        <Text className=" relative z-10 font-semibold mt-1 " >Direct Donations</Text>
                        <Text className=" relative z-10 text-[28px] tracking-[1%] -mt-1 font-semibold " >{formatNumber(data?.directDonations)}</Text>
                    </div>
                    <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                </div>
                <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[170px] relative flex items-center  " >
                    <div className=" px-4 flex flex-col text-white " >
                        <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                            <EventIcon />
                        </div>
                        <Text className=" relative z-10 font-semibold mt-1 " >Event Donations</Text>
                        <div className=" flex gap-2 items-center " >
                            <Text className=" relative z-10 text-[28px] tracking-[1%] -mt-1 font-semibold " >{formatNumber(data?.eventDonations)}</Text>
                            <div className=" h-[22px] bg-[#FFFFFF26] rounded-[4px] px-[6px] flex justify-center items-center " >
                                <Text className=" relative z-10 tracking-[0.5%] text-xs font-semibold " >{formatNumberWithK(data?.totalDonors)} Donors</Text>
                            </div>
                        </div>
                    </div>
                    <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                </div>
                <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[170px] relative flex items-center  " >
                    <div className=" px-4 flex flex-col text-white " >
                        <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                            <EventIcon />
                        </div>
                        <Text className=" relative z-10 font-semibold mt-1 " >Hosted Events</Text>
                        <Text className=" relative z-10 text-[28px] tracking-[1%] -mt-1 font-semibold " >{formatNumber(data?.eventsCreated, "")}</Text>
                    </div>
                    <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                </div>
                <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[170px] relative flex items-center  " >
                    <div className=" px-4 flex flex-col text-white " >
                        <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                            <CommunityIcon />
                        </div>
                        <Text className=" relative z-10 font-semibold mt-1 " >Communities</Text>
                        <div className=" flex gap-2 items-center " >
                            <Text className=" relative z-10 text-[28px] tracking-[1%] -mt-1 font-semibold " >{formatNumber(data?.walletBalance, "")}</Text>
                        </div>
                    </div>
                    <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                </div>
            </div>
            <div className=" w-full flex flex-col px-4 lg:px-0 gap-6 " >
            <EventCardList />
            <CommunityCardList />
            </div>
        </div>
    )
}
