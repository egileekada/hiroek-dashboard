import { Spinner, Text } from "@radix-ui/themes";
import PageHeader from "../../components/shared/pageHeader";
import { WalletIcon } from "../../svg";
import { CustomButton } from "../../components/shared";
import { useNavigate } from "react-router-dom";
import { useDetails } from "../../global-state/useUserDetails";
import { formatNumber } from "../../utils/numberFormat";
import InfoGraph from "../../components/donate/infoGraph";
import { useState } from "react";
import useBankBal from "../../hooks/useBankBal";
import InfoGraphTicket from "../../components/donate/infoGraphTicket";


export default function DonatePage() {
    const router = useNavigate()
    const { bankAccountNumber, bankName } = useDetails((state) => state);

    const [tab, setTab] = useState(false)
    const { data, isLoading } = useBankBal()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Manage Your Revenue" body="Effortlessly track and optimise event revenue." />
            </div>
            <div className=" w-full flex flex-col lg:flex-row gap-6 lg:px-0 px-4 " >
                <div className=" lg:w-fit w-full flex gap-4 items-center flex-col  " >
                    <div style={{ background: "linear-gradient(107.38deg, #4C49ED 2.61%, #37137F 101.2%)" }} className=" w-full lg:w-[400px] max-w-[400px] rounded-[15px] pt-8 h-[290px] text-white flex justify-between flex-col "  >
                        <div className=" w-full flex items-center justify-between px-6 " >
                            <div className=" flex flex-col " >
                                <Text className=" text-sm font-bold " >Account Balance</Text>
                                {isLoading ? <Spinner size={"2"} /> :
                                    <Text className=" text-[22px] font-semibold -mt-1 "  >{formatNumber(data?.balance / 100)}</Text>
                                }
                            </div>
                            <WalletIcon />
                        </div>
                        <div className=" w-full flex justify-between px-6 " >
                            <div className=" w-full flex flex-col gap-1 " >
                                <Text className=" text-xs text-[#FFFFFFB2] font-semibold " >Bank Name</Text>
                                <Text className=" text-sm text-[#FFFFFF] font-semibold " >{bankName}</Text>
                            </div>
                            <div className=" w-full flex flex-col gap-1 " >
                                <Text className=" text-xs text-[#FFFFFFB2] font-semibold " >Bank Account</Text>
                                <Text className=" text-sm text-[#FFFFFF] font-semibold " >{bankAccountNumber}</Text>
                            </div>
                        </div>
                        <div className=" w-full h-[87px] flex items-center gap-6 px-6 " style={{ background: "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)" }} >
                            <CustomButton onClick={() => router("/dashboard/donation/setup")} bgColor="#FFFFFF4D" className=" " fontSize="12px" >{!bankAccountNumber ? "Setup Account" : "Manage Account"}</CustomButton>
                            <CustomButton onClick={() => router("/dashboard/donation/withdraw")} bgColor="#FFFFFF4D" className=" " fontSize="12px" >Withdraw Funds</CustomButton>
                        </div>
                    </div>
                    <div className=" w-full max-w-[400px] relative " >
                        <CustomButton type="button" onClick={() => router("/dashboard/donation/history")} >Transaction History</CustomButton>
                    </div>
                    {/* <div className=" w-full lg:hidden max-w-[400px] relative " >
                        <CustomButton type="button" onClick={() => router("/dashboard/donation/history")} >Update Pin</CustomButton>
                    </div> */}
                </div>
                <div className=" w-full flex flex-col items-center gap-3 lg:mt-4 h-auto pb-8 " >
                    <div className=' w-full max-w-[400px] py-2 justify-center items-center rounded-lg flex h-[54px] gap-4 ' >
                        <CustomButton onClick={() => setTab(false)} fontSize='14px' width='100%' bgColor={!tab ? "#37137F" : "#37137F1A"} color={tab ? "#37137F" : "white"} rounded="999px"  >Donations</CustomButton>
                        <CustomButton onClick={() => setTab(true)} fontSize='14px' width='100%' bgColor={tab ? "#37137F" : "#37137F1A"} color={!tab ? "#37137F" : "white"} rounded="999px" >Ticket Sales</CustomButton>
                    </div>
                    {!tab && (
                        <div className=" w-full max-w-[400px] p-4 shadow-lg mt-3 rounded-2xl " >
                            <InfoGraph />
                        </div>
                    )}
                    {tab && (
                        <div className=" w-full max-w-[400px] p-4 shadow-lg mt-3 rounded-2xl " >
                            <InfoGraphTicket />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}