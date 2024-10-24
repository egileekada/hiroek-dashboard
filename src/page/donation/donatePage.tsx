import { Text } from "@radix-ui/themes";
import PageHeader from "../../components/shared/pageHeader";
import { WalletIcon } from "../../svg";
import { CustomButton } from "../../components/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DirectDonation, InDirectDonation } from "../../components/donate";
import { useDetails } from "../../global-state/useUserDetails";
import { formatNumber } from "../../utils/numberFormat";


export default function DonatePage() {

    const [tab, setTab] = useState(0) 
    const router = useNavigate() 
    const { fundRaised, bankAccountNumber, bankName } = useDetails((state) => state); 
    
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Manage Your Donations." body="Manage Your Donation." />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton className=" px-3 " width="200px" onClick={() => router("/dashboard/donation/pin")} >
                        Update Pin
                    </CustomButton>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                <div className=" w-full flex gap-8 lg:flex-row flex-col  " >
                    <div className=" w-full rounded-[15px] pt-8 h-[290px] text-white flex justify-between flex-col " style={{ background: "linear-gradient(107.38deg, #4C49ED 2.61%, #37137F 101.2%)" }} >
                        <div className=" w-full flex items-center justify-between px-6 " >
                            <div className=" flex flex-col " >
                                <Text className=" text-sm font-bold " >Donations Account Balance</Text>
                                <Text className=" text-[22px] font-semibold -mt-1 "  >{formatNumber(fundRaised)}</Text>
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
                            <CustomButton onClick={() => router("/dashboard/donation/bankInfo")} bgColor="#FFFFFF4D" className=" " >Manage Account</CustomButton>
                            <CustomButton bgColor="#FFFFFF4D" className=" " >Withdrawal History</CustomButton>
                        </div>
                    </div>
                    <div className=" w-full h-[200px] " >

                    </div>
                </div>
                <div className=" w-full flex flex-col gap-6 mt-8 " >
                    <div className=" w-full flex h-[23px] " >
                        <div role="button" onClick={() => setTab(0)} className={` cursor-pointer w-full flex flex-col relative px-3 text-primary ${tab === 0 ? " bg-opacity-50 " : "  "} `} >
                            <Text className=" text-[13px] font-bold text-center " >All data</Text>
                            <div className={` w-full h-[2px] rounded-t-[10px] ${tab === 0 ? " bg-primary " : " bg-[#EBEEF2] "} absolute -bottom-1 inset-x-0 `} />
                        </div>
                        <div role="button" onClick={() => setTab(1)} className={` cursor-pointer w-full flex flex-col relative px-3 text-primary ${tab === 1 ? " bg-opacity-50 " : "  "} `} >
                            <Text className=" text-[13px] font-bold text-center " >Direct Donations</Text>
                            <div className={` w-full h-[2px] rounded-t-[10px] ${tab === 1 ? " bg-primary " : " bg-[#EBEEF2] "} absolute -bottom-1 inset-x-0 `} />
                        </div>
                        <div role="button" onClick={() => setTab(3)} className={` cursor-pointer w-full flex flex-col relative px-3 text-primary ${tab === 1 ? " bg-opacity-50 " : "  "} `} >
                            <Text className=" text-[13px] font-bold text-center " >Indirect Donations</Text>
                            <div className={` w-full h-[2px] rounded-t-[10px] ${tab === 3 ? " bg-primary " : " bg-[#EBEEF2] "} absolute -bottom-1 inset-x-0 `} />
                        </div>
                        <div role="button" onClick={() => setTab(2)} className={` cursor-pointer w-full flex flex-col relative px-3 text-primary ${tab === 2 ? " bg-opacity-50 " : "  "} `} >
                            <Text className=" text-[13px] font-bold text-center " >Withdrawals</Text>
                            <div className={` w-full h-[2px] rounded-t-[10px] ${tab === 2 ? " bg-primary " : " bg-[#EBEEF2] "} absolute -bottom-1 inset-x-0 `} />
                        </div>
                    </div>
                    {/* <div style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }} className=" px-5 mt-4 py-[14px] w-full flex flex-col " >
                        {data?.map((item) => {
                            return (
                                <div key={item} className=" w-full flex items-center py-3 justify-between " >
                                    <div className=" flex gap-3 items-center " >
                                        <div className=" text-primary text-opacity-50 " >
                                            <CashIcon size="32px" />
                                        </div>
                                        <div className=" flex flex-col " >
                                            <Text className=" text-primary text-sm font-semibold " >Donation Received</Text>
                                            <Text className=" text-primary text-opacity-50 tracking-[0.5%] italic font-semibold text-xs " >Today</Text>
                                        </div>
                                    </div>
                                    <Text className={` text-sm ${item === "green" ? " text-[#137F1E] " : "text-[#CE4646] "} font-extrabold tracking-[0.5%] `} >£0</Text>
                                </div>
                            )
                        })}
                    </div> */}
                    {tab === 1 && (
                        <DirectDonation />
                    )}
                    {tab === 3 && (
                        <InDirectDonation />
                    )}
                </div>
            </div>
        </div>
    )
}