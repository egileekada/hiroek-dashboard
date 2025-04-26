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
import LoadingAnimation from "../components/shared/loadingAnimation";


export default function DashboardPage() {

    const { name } = useDetails((state) => state);
    const { data, isLoading } = useGetStats()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header={"Welcome " + capitalizeFLetter(name)} body="Effortlessly Create Events and Engage With Your Supporters In Real Time." />
            <LoadingAnimation loading={isLoading} >
                <div className=" w-full grid grid-cols-2 lg:flex gap-4 px-4 lg:px-0 " >
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[160px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col gap-2 text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <CashIcon />
                            </div>
                            <Text className=" relative z-10 font-bold mt-1 lg:text-base !text-sm " >Total Amount</Text>
                            <Text className=" relative z-10 text-[24px] tracking-[1%] -mt-1 font-extrabold " >{formatNumber(data?.walletBalance / 100)}</Text>
                        </div>
                        <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[160px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col gap-2 text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <EventIcon />
                            </div>
                            <Text className=" relative z-10 font-bold mt-1 lg:text-base text-sm " >Ticket Sales</Text>
                            <div className=" flex gap-1 lg:flex-row lg:items-center " >
                                <Text className=" relative z-10 text-[24px] tracking-[1%] -mt-1 font-extrabold " >{formatNumber(data?.ticketSales / 100)}</Text>
                                <div className=" h-[22px] bg-[#FFFFFF26] rounded-[4px] w-fit px-[6px] flex justify-center items-center " >
                                    <Text className=" relative z-10 tracking-[0.5%] inter-all lg:text-xs text-[10px] " >{formatNumberWithK(data?.totalDonors)} Donors</Text>
                                </div>
                            </div>
                        </div>
                        <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[160px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col gap-2 text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <EventIcon />
                            </div>
                            <Text className=" relative z-10 font-bold mt-1 lg:text-base text-sm " >Events</Text>
                            <Text className=" relative z-10 text-[24px] tracking-[1%] -mt-1 font-extrabold " >{formatNumber(data?.eventsCreated, "")}</Text>
                        </div>
                        <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[160px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col gap-2 text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <CommunityIcon />
                            </div>
                            <Text className=" relative z-10 font-bold mt-1 lg:text-base text-sm " >Tickets Sold</Text>
                            <div className=" flex gap-2 items-center " >
                                <Text className=" relative z-10 text-[24px] tracking-[1%] -mt-1 font-extrabold " >{formatNumber(data?.ticketSalesCount, "")}</Text>
                            </div>
                        </div>
                        <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                </div>
            </LoadingAnimation>
            <div className=" w-full flex flex-col px-4 lg:px-0 gap-6 h-full " >

                <div className=" w-full" >
                    <EventCardList />
                </div>
                <div> 
                    <CommunityCardList />
                </div>
            </div>
        </div>
    )
}
