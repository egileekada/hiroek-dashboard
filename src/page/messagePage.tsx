import { Text } from "@radix-ui/themes"
import { useState } from "react"
import PageHeader from "../components/shared/pageHeader"
import useGetEventData from "../hooks/eventHooks/useGetEventData"
import LoadingAnimation from "../components/shared/loadingAnimation"
import { capitalizeFLetter } from "../utils/capitalLetter"
import { textLimit } from "../utils/textlimit"
import moment from "moment"
import { useNavigate } from "react-router-dom"


export default function MessagePage() {

    const [searchText, setSearchText] = useState("") 

    const { data, isLoading } = useGetEventData().getEventData()
    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true}  header="Event Messages" second={true} body="" />
            <div className=" w-full lg:hidden flex px-4  " >
                <input type={"search"} placeholder={"Search"} value={searchText} onChange={(e) => setSearchText(e.target.value)} className=" h-[45px] px-3 border-[#37137F80] border-[0.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
            </div>
            <div className=" max-w-[400px] w-full flex flex-col gap-4 lg:px-0 px-4 " >
                <LoadingAnimation loading={isLoading}  >
                    {data?.map((item, index) => {
                        return (
                            <div key={index}  className=" w-full flex items-center py-4 border-b justify-between " >
                                <div className=" flex gap-2 items-center " >
                                    <div className=" w-fit " >
                                        <div className=" w-[32px] h-[32px] rounded-full " >
                                            <img src={item?.photo} alt={item?.photo}  className=" object-cover w-full h-full rounded-full " />
                                        </div>
                                    </div>
                                    <div className=" flex flex-col " >
                                        <Text className=" text-xs font-bold !leading-[14px] text-[#37137F] " >{capitalizeFLetter(textLimit(item?.name, 50))}</Text>
                                        <Text className=" text-[10px] text-[#37137F80] " >{moment(item?.createdAt)?.fromNow()}</Text>
                                    </div>
                                </div>
                                <div className=" w-fit " >
                                    <button  onClick={() => router(`/dashboard/event/support/${item?._id}?message=true`)} className=" text-[#2E008B] !text-[10px] bg-[#37137F26] rounded-[44px] w-[75px] h-[25px] " >
                                        View Chats
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </LoadingAnimation>
            </div>
        </div>
    )
}
