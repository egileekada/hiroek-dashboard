
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomButton } from '../../components/shared'
import PageHeader from '../../components/shared/pageHeader'
import { Text } from '@radix-ui/themes';
import { CashIcon } from '../../svg';
import useGetRevenue from '../../hooks/revenueHooks/getHistory';
import { useDetails } from '../../global-state/useUserDetails';
import { formatNumber } from '../../utils/numberFormat';
import { dateFormat } from '../../utils/dateFormat';
import { textLimit } from '../../utils/textlimit';
import LoadingAnimation from '../../components/shared/loadingAnimation';

export default function TransactionHistory() {

    const [searchParams] = useSearchParams();
    const index = searchParams.get("type");
    const { } = useDetails((state) => state);


    const { data, isLoading } = useGetRevenue().getDonationData()
    const { data: withdrawalData, isLoading: loadingWithdrawFunds } = useGetRevenue().getWithdrawalData()
    const { data: dataHistory, isLoading: loadingHistory } = useGetRevenue().getTicketSalesData()
    const navigate = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader path={"/dashboard/donation"} back={true} header="Transaction History" body="" />
            <div className=' w-full flex lg:px-0 px-4 ' >
                <div className=' w-fit py-2 lg:flex hidden justify-center items-center rounded-lg bg-[#37137F1A] h-[54px] ' >
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history")} fontSize='14px' width='180px' bgColor={!index ? "#37137F" : "transparent"} color={index ? "#37137F" : "white"}  >Donations</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Withdrawals")} fontSize='14px' width='180px' bgColor={index === "Withdrawals" ? "#37137F" : "transparent"} color={index !== "Withdrawals" ? "#37137F" : "white"} >Withdrawals</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Sales")} fontSize='14px' width='180px' bgColor={index === "Sales" ? "#37137F" : "transparent"} color={index !== "Sales" ? "#37137F" : "white"}  >Ticket Sales</CustomButton>
                </div>
                <div className=' w-full  py-2 lg:hidden justify-center items-center rounded-lg flex bg-[#37137F1A] h-[54px] ' >
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history")} fontSize='14px' width='100%' bgColor={!index ? "#37137F" : "transparent"} color={index ? "#37137F" : "white"}  >Donations</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Withdrawals")} fontSize='14px' width='100%' bgColor={index === "Withdrawals" ? "#37137F" : "transparent"} color={index !== "Withdrawals" ? "#37137F" : "white"} >Withdrawals</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Sales")} fontSize='14px' width='100%' bgColor={index === "Sales" ? "#37137F" : "transparent"} color={index !== "Sales" ? "#37137F" : "white"} >Ticket Sales</CustomButton>
                </div>
            </div>
            <div className=' lg:max-w-[550px] w-full flex flex-col ' > 
                {!index && (
                    <LoadingAnimation loading={isLoading} >
                        <div className=' w-full flex flex-col gap-3 mt-2 ' >
                            {data?.map((item, index) => {
                                return (
                                    <div key={index} className=' lg:max-w-[550px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                                        <div className=' flex gap-2 items-center ' >
                                            <div className=' w-10 h-10 rounded-full ' >
                                                <img alt='logo' src={item?.user?.photo} className=' object-cover w-full h-full rounded-full ' />
                                            </div>
                                            <div className=' flex flex-col ' >
                                                <Text className=' text-xs font-bold text-primary ' >{textLimit(item?.user?.fullname, 20)}</Text>
                                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >{item?.event?.name}</Text>
                                                <Text className=' text-[10px] font-bold text-primary text-opacity-50' >{item?.recipients[0]?.name}</Text>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col ' >
                                            <Text className=' text-[#137F1E] text-sm font-bold text-right ' >{formatNumber(item?.amount / 100)}</Text>
                                            <Text className=' text-primary text-opacity-50 text-[10px] font-bold ' >{dateFormat(item?.createdAt)}</Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                )}
                {index === "Withdrawals" && (
                    <LoadingAnimation loading={loadingWithdrawFunds} >
                        <div className=' w-full flex flex-col gap-3 mt-2 ' >
                            {withdrawalData?.map((item, index) => {
                                return (
                                    <div key={index} className=' lg:max-w-[550px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                                        <div className=' flex gap-2 items-center ' >
                                            <div className=' w-fit text-primary ' >
                                                <CashIcon />
                                            </div>
                                            <div className=' flex flex-col ' >
                                                <Text className=' text-xs font-bold text-[#137F1E] ' >{formatNumber(item?.amount)} Withdrawn Successfully</Text>
                                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >{item?.bankAccountName} (**** **** {item?.bankAccountNumber?.slice(item?.bankAccountNumber?.length - 4, item?.bankAccountNumber?.length)})</Text>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col mt-auto ' >
                                            <Text className=' text-primary text-opacity-50 text-[8px] font-bold ' >{dateFormat(item?.createdAt)}</Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                )}
                {index === "Sales" && (
                    <LoadingAnimation loading={loadingHistory} >
                        <div className=' w-full flex flex-col gap-3 mt-2 ' >
                            {dataHistory?.map((item, index) => {
                                return (
                                    <div key={index} className=' lg:max-w-[550px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                                        <div className=' flex gap-2 items-center ' >
                                            <div className=' w-10 h-10 bg-red-400 rounded-full ' >
                                                <img alt='pic' src={item?.user?.photo} className=' w-full h-full object-cover rounded-full  ' />
                                            </div>
                                            <div className=' flex flex-col ' >
                                                <Text className=' text-xs font-bold text-primary ' >{item?.user?.fullname}</Text>
                                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >{item?.event?.name}</Text>
                                                <Text className=' text-[10px] font-bold text-primary text-opacity-50' >No. Of Tickets: {item?.totalTickets === 0 ? "1" : item?.tickets?.length}</Text>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col ' >
                                            <Text className=' text-[#137F1E] text-sm font-bold ml-auto ' >{formatNumber(item?.totalTickets)}</Text>
                                            <Text className=' text-primary text-opacity-50 text-[10px] font-bold ' >{dateFormat(item?.createdAt)}</Text>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                )}
            </div>
        </div>
    )
}