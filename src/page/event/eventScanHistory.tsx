import { Text } from "@radix-ui/themes";
import { BackArrowIcon } from "../../svg";
import { LuSearch } from "react-icons/lu";
import CustomInputWithoutForm from "../../components/shared/customInputWithoutForm";
import { useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import useGetEventData from "../../hooks/eventHooks/useGetEventData";
import LoadingAnimation from "../../components/shared/loadingAnimation";
import moment from "moment";


export default function EventScanHistory() {

    const [value, setValue] = useState("")
    const navigate = useNavigate()

    const { id } = useParams();
    const { data, isLoading } = useGetEventData().getScanEventTicket()

    return (
        <div className=' w-full py-4 h-full flex flex-col' >
            <div className=" w-full bg-white flex sticky top-0 flex-col gap-1 rounded-t-3xl pt-3 lg:px-3 px-4  " >
                <div className=" w-full flex items-center justify-center " >
                    <div className=' w-fit absolute left-4 ' >
                        <div onClick={() => navigate(
                            `/dashboard/event/scanner/${id}`
                        )} role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                            <BackArrowIcon />
                        </div>
                    </div>
                    <Text className=" text-[14px] font-black text-primary " >Ticket Scan History</Text>
                </div>
            </div>
            <div className=" px-4 mt-8 flex flex-col gap-3 " >

                <div className=" w-full text-primary " >
                    <CustomInputWithoutForm setValue={setValue} value={value} icon={<LuSearch size={"20px"} color='#37137f' className=" ml-3 " />} hasLeftIcon={true} borderRadius="8px" color="#37137f" borderWidth="1px" type="text" placeholder="Search For Event Attendee Name" />
                </div>
                <div className=" w-full flex flex-col gap-1 " >
                    <Text className=" text-primary text-sm " >Tickets Scanned</Text>
                    <Text className=" text-primary30 text-sm " >Event Tickets Scanned So Far</Text>
                </div>
                <LoadingAnimation loading={isLoading} length={data?.length} >
                    <div className=" w-full flex flex-col gap-3 mt-2 " >
                        {data?.map((item, index) => {
                            return (
                                <div key={index} className=" w-full flex items-center justify-between " >
                                    <div className=" flex gap-2 items-center " >
                                        <div className=" w-8 h-8 rounded-full " >
                                            <img className=" w-full h-full rounded-full object-cover " src={item?.user?.photo} alt={item?.user?._id} />
                                        </div>
                                        <div className=" flex flex-col " >
                                            <Text className=" text-xs text-primary font-bold " >{item?.user?.fullname}</Text>
                                            <Text className=" text-[10px] text-primary text-opacity-50 font-bold " >{moment(item?.updatedAt)?.fromNow()}</Text>
                                        </div>
                                    </div>
                                    {/* <CustomButton bgColor="#37137F26" fontSize="10px" color="#2E008B" width="90px" rounded="44px" height="24px" >
                                        <Text className=" mt-[2px] " >View Details</Text>
                                    </CustomButton> */}
                                </div>
                            )
                        })}
                    </div>
                </LoadingAnimation>
            </div>
        </div>
    )
}
