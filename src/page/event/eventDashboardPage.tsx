import { Text } from '@radix-ui/themes'
import PageHeader from '../../components/shared/pageHeader'
import { CashIcon, EventIcon, CommunityIcon } from '../../svg'
import { formatNumber } from '../../utils/numberFormat'
import LoadingAnimation from '../../components/shared/loadingAnimation'
import useGetEventData from '../../hooks/eventHooks/useGetEventData'
import { dateFormatDashboad } from '../../utils/dateFormat'
import { numberFormat } from '../../utils/formatNumberWithK'

export default function EventDashboardPage() {

    const { getEventDashboardData, getEventDashboardTicketData } = useGetEventData()

    console.log(getEventDashboardTicketData()?.data);


    return (
        <div className=' w-full flex flex-col gap-4 lg:gap-6 ' >
            <PageHeader back={true} header={"Event Dashboard"} body="" />
            <LoadingAnimation loading={getEventDashboardData()?.isLoading} >
                <div className=" w-full grid grid-cols-2 lg:flex gap-2 lg:gap-4 px-4 lg:px-0 " >
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[136px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <CashIcon />
                            </div>
                            <Text className=" relative z-10 font-semibold mt-1 lg:text-base text-xs " >Total Pledged Amount</Text>
                            <Text className=" relative z-10 text-2xl lg:text-[28px] tracking-[1%] -mt-1 inter-all " >{formatNumber(getEventDashboardData()?.data?.pledges)}</Text>
                        </div>
                        <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[136px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <EventIcon />
                            </div>
                            <Text className=" relative z-10 font-semibold mt-1 lg:text-base text-xs " >Tickets Sold</Text>
                            <div className=" flex gap-2 items-center " >
                                <Text className=" relative z-10 text-2xl lg:text-[28px] tracking-[1%] -mt-1 inter-all " >{numberFormat(getEventDashboardData()?.data?.tickets)}</Text>
                            </div>
                        </div>
                        <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-primary h-[136px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <EventIcon />
                            </div>
                            <Text className=" relative z-10 font-semibold mt-1 lg:text-base text-xs " >Total Ticket Revenue</Text>
                            <Text className=" relative z-10 text-2xl lg:text-[28px] tracking-[1%] -mt-1 inter-all " >{formatNumber(getEventDashboardData()?.data?.ticketValues)}</Text>
                        </div>
                        <img src="/images/one.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                    <div className=" lg:max-w-[264px] w-full rounded-[12px] bg-secondary h-[136px] lg:h-[170px] relative flex items-center  " >
                        <div className=" px-4 flex flex-col text-white " >
                            <div className=" w-9 h-9  bg-[#FFFFFF33] rounded-lg flex justify-center items-center " >
                                <CommunityIcon />
                            </div>
                            <Text className=" relative z-10 font-semibold mt-1 lg:text-base text-xs " >Event Sign-Ups</Text>
                            <div className=" flex gap-2 items-center " >
                                <Text className=" relative z-10 text-2xl lg:text-[28px] tracking-[1%] -mt-1 inter-all " >{formatNumber(getEventDashboardData()?.data?.members, "")}</Text>
                            </div>
                        </div>
                        <img src="/images/two.png" alt="one" className=" absolute inset-0 w-full h-full rounded-[12px] " />
                    </div>
                </div>
            </LoadingAnimation>
            <div className=' w-full flex flex-col px-4 lg:px-0 gap-4 pb-8 ' >
                <div className=' w-full flex items-center ' >
                    <div className=' flex flex-col ' >
                        <p className=' text-sm font-bold text-primary ' >Tickets Sold</p>
                        <p className=' text-xs text-[#37137F80] font-medium ' >Event Tickets Sold So Far</p>
                    </div>
                </div>

                <LoadingAnimation loading={getEventDashboardTicketData()?.isLoading} >
                    <>
                        {getEventDashboardTicketData()?.data?.map((item, index) => {
                            return (
                                <div key={index} className=' mt-4 flex w-full items-center justify-between ' >
                                    <div className=' flex items-center gap-2 ' >
                                        <div className=' w-8 h-8 rounded-lg bg-slate-400 ' >
                                            <img className=' w-full h-full rounded-lg ' src={item?.user?.photo} alt={item?.user?.photo} />
                                        </div>
                                        <div className=' flex flex-col ' >
                                            <p className=' text-xs font-bold text-primary ' >{item?.user?.fullname}</p>
                                            <p className=' text-[10px] font-medium text-[#37137F80] ' >{dateFormatDashboad(item?.createdAt)} | Tickets: {item?.tickets?.length}</p>
                                        </div>
                                    </div>
                                    <p className=' text-sm font-extrabold text-primary ' >{ }</p>
                                </div>
                            )
                        })}
                    </>
                </LoadingAnimation>
            </div>
        </div>
    )
}
