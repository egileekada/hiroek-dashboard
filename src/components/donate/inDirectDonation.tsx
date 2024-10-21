import useDonation from '../../hooks/useGetDonation'
import { CashIcon } from '../../svg'
import LoadingAnimation from '../shared/loadingAnimation'
import { Text } from '@radix-ui/themes'

export default function InDirectDonation() {

    const { inDirectData } = useDonation()

    return (
        <div style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }} className=" px-5 mt-4 py-[14px] w-full flex flex-col " >
            <LoadingAnimation loading={inDirectData().isLoading} length={inDirectData().data?.length} >
                {inDirectData().data?.map((item) => {
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
            </LoadingAnimation>
        </div>
    )
}
