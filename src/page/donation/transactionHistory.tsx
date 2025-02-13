
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CustomButton } from '../../components/shared'
import PageHeader from '../../components/shared/pageHeader'
import { Text } from '@radix-ui/themes';
import { CashIcon } from '../../svg';

export default function TransactionHistory() {

    const [searchParams] = useSearchParams();
    const index = searchParams.get("type");

    const navigate = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader path={"/dashboard/donation"} back={true} header="Transaction History" body="" />
            <div className=' w-full flex justify-center px-4 ' >
                <div className=' w-fit py-2 lg:flex hidden justify-center items-center rounded-lg bg-[#37137F1A] h-[54px] ' >
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history")} fontSize='14px' width='180px' bgColor={!index ? "#37137F" : "transparent"} color={index ? "#37137F" : "white"}  >Donations</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Withdrawals")} fontSize='14px' width='180px' bgColor={index === "Withdrawals" ? "#37137F" : "transparent"} color={index !== "Withdrawals" ? "#37137F" : "white"} >Withdrawals</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Sales")} fontSize='14px' width='180px' bgColor={index === "Sales" ? "#37137F" : "transparent"} color={index !== "Sales" ? "#37137F" : "white"}  >Ticket Sales</CustomButton>
                </div>
                <div className=' w-full  py-2 lg:hidden justify-center items-center rounded-lg flex bg-[#37137F1A] h-[54px] ' >
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history")} fontSize='14px' width='100%' bgColor={!index ? "#37137F" : "transparent"} color={index ? "#37137F" : "white"}  >Donations</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Withdrawals")} fontSize='14px' width='100%' bgColor={index === "Withdrawals" ? "#37137F" : "transparent"} color={index !== "Withdrawals" ? "#37137F" : "white"} >Withdrawals</CustomButton>
                    <CustomButton noshadow={true} onClick={() => navigate("/dashboard/donation/history?type=Sales")} fontSize='14px' width='100%' bgColor={index === "Sales" ? "#37137F" : "transparent"} color={index !== "Sales" ? "#37137F" : "white"}  >Ticket Sales</CustomButton>
                </div>
            </div>
            {!index && (
                <div className=' w-full flex items-center flex-col gap-3 mt-2 ' >
                    <div className=' max-w-[450px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                        <div className=' flex gap-2 items-center ' >
                            <div className=' w-10 h-10 bg-red-400 rounded-full ' />
                            <div className=' flex flex-col ' >
                                <Text className=' text-xs font-bold text-primary ' >Angela Merkel</Text>
                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >Angela Merkel</Text>
                                <Text className=' text-[10px] font-bold text-primary text-opacity-50' >No. Of Tickets: 2</Text>
                            </div>
                        </div>
                        <div className=' flex flex-col ' >
                            <Text className=' text-[#137F1E] text-sm font-bold ' >£500.00</Text>
                            <Text className=' text-primary text-opacity-50 text-[10px] font-bold ' >20 Jan 2024</Text>
                        </div>
                    </div>
                </div>
            )}
            {index === "Withdrawals" && (
                <div className=' w-full flex items-center flex-col gap-3 mt-2 ' >
                    <div className=' max-w-[450px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                        <div className=' flex gap-2 items-center ' >
                            <div className=' w-fit text-primary ' >
                                <CashIcon />
                            </div>
                            <div className=' flex flex-col ' >
                                <Text className=' text-xs font-bold text-[#137F1E] ' >£1,000 Withdrawn Successfully</Text>
                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >Bank Account (**** **** **** 4587)</Text>
                            </div>
                        </div>
                        <div className=' flex flex-col mt-auto ' >
                            <Text className=' text-primary text-opacity-50 text-[8px] font-bold ' >20 Jan 2024</Text>
                        </div>
                    </div>
                </div>
            )}
            {index === "Sales" && (
                <div className=' w-full flex items-center flex-col gap-3 mt-2 ' >
                    <div className=' max-w-[450px] w-full justify-between pb-3 border-b border-[#2E2D740D] px-3 flex items-center ' >
                        <div className=' flex gap-2 items-center ' >
                            <div className=' w-10 h-10 bg-red-400 rounded-full ' />
                            <div className=' flex flex-col ' >
                                <Text className=' text-xs font-bold text-primary ' >Angela Merkel</Text>
                                <Text className=' text-[10px] font-bold text-primary text-opacity-50 ' >Angela Merkel</Text>
                                <Text className=' text-[10px] font-bold text-primary text-opacity-50' >No. Of Tickets: 2</Text>
                            </div>
                        </div>
                        <div className=' flex flex-col ' >
                            <Text className=' text-[#137F1E] text-sm font-bold ' >£500.00</Text>
                            <Text className=' text-primary text-opacity-50 text-[10px] font-bold ' >20 Jan 2024</Text>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}