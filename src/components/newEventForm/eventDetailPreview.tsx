import { ClockIcon, TicketIcon } from "lucide-react";
import { LocationIcon, CalendarIcon2 } from "../../svg";
import { dateFormat, timeFormat } from "../../utils/dateFormat";
import { CustomButton, Text } from "../shared";
import { FormikProps } from "formik";
import { ICreateEvent } from "../../model/event";
import { useImage } from "../../global-state/useImageData";
import { formatNumber } from "../../utils/numberFormat";
import { MdEditSquare } from "react-icons/md";
import { useNavigate } from "react-router-dom";


interface IProps {
    formik: FormikProps<ICreateEvent>;
    isLoading: boolean
    data: any;
}

export default function EventDetailPreview(
    { formik, isLoading }: IProps
) {

    const { eventImage } = useImage((state) => state)

    const router = useNavigate()

    return (
        <div className=" w-full flex-1 flex lg:flex-row relative flex-col pb-4 gap-6 text-primary " >
            <div className=" w-full h-full flex flex-col rounded-[44px] gap-4 px-4 lg:pb-8 pb-6 lg:p-8 " >
                <div className=" w-full h-[240px] bg-green-700 rounded-3xl lg:rounded-3xl relative " >
                    <img src={eventImage ? URL.createObjectURL(eventImage) : formik.values.photo} alt={formik.values.name} className=" w-full h-full rounded-b-3xl lg:rounded-3xl object-cover " />
                </div>
                <div className=" w-full px-4 relative z-20 -mt-[80px]  " >
                    <div className=" py-5 px-4 gap-[6px] text-primary w-full bg-white flex flex-col rounded-[14px] " style={{ boxShadow: "0px 3px 10px 0px #0000000D" }} >
                        <Text className=" !font-bold " >{formik.values.name}</Text>
                        <div className=" flex gap-2 mt-2 " >
                            <div className=" w-fit text-primary text-opacity-50 mt-[2px] " >
                                <LocationIcon block={true} />
                            </div>
                            <Text className="!font-semibold text-xs " >{formik.values.address}</Text>
                        </div>
                        <div className=" flex items-center gap-2 w-full justify-between " >
                            <div className=" flex items-center gap-2 " >
                                <div className=" w-fit text-primary text-opacity-50 " >
                                    <CalendarIcon2 />
                                </div>
                                <Text className="!font-semibold text-xs mr-2 " >{dateFormat(formik.values.endTime)}</Text>
                            </div>
                            <div className=" flex items-center gap-2 " >
                                <div className=" w-fit text-primary text-opacity-50 " >
                                    <ClockIcon />
                                </div>
                                <Text className=" !font-semibold text-xs " >{timeFormat(formik.values.endTime)}</Text>
                            </div>
                        </div>
                        <div className=" w-full flex justify-between items-center " >
                            <div className=" flex gap-2 items-center " >
                                <TicketIcon />
                                <Text className=" font-bold text-xs " >{formik.values.signUpLimit} Spot(s) Available</Text>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 " >
                    <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                        <Text className=" font-extrabold text-xs " >About Event</Text>
                    </div>
                    <Text className=" text-primary text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{formik.values.description}</Text>
                </div>
                {formik.values.fundRaiser.fundRaisingGoal && (
                    <div className=" w-full flex gap-4 " >
                        <div className=" flex flex-col gap-3 w-full items-center " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <Text className=" font-extrabold text-xs " >Minimum Pledge</Text>
                            </div>

                            <div className=" w-fit bg-[#37137F] text-white rounded-full px-[10px] h-[25px] flex justify-center items-center "  >
                                <Text className=" font-extrabold text-xs " >{formatNumber(formik.values.fundRaiser.fundRaisingGoal)}</Text>
                            </div>
                        </div>
                    </div>
                )}
                <div className=" flex flex-col gap-3 items-center " >
                    <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                        <Text className=" font-extrabold text-xs " >Tickets Available</Text>
                    </div>
                    {formik.values?.ticketing.length === 0 && (
                        <div className=" max-w-[360px] w-full h-[96px] border rounded-lg flex flex-col gap-1 justify-center px-4 " >
                            <p className=" text-xs font-semibold " >Standard Ticket</p>
                            <p className=" font-semibold " >£0.00</p>
                        </div>
                    )} 
                    {formik.values?.ticketing.length > 0 && (
                        <>
                            {formik.values?.ticketing?.map((item, index) => {
                                return (
                                    <div className=" w-full justify-between items-center flex border rounded-lg  px-4 h-[96px] " >
                                        <div key={index} className=" lg:max-w-[360px] w-full flex flex-col gap-1 justify-center" >
                                            <p className=" text-xs font-semibold " >{item?.ticketType}</p>
                                            <p className=" font-semibold " >{formatNumber(item?.ticketPrice)}</p>
                                            {item?.salesEndDate && (
                                                <p className=" text-xs font-semibold ">Sales End On {dateFormat(item?.salesEndDate)}</p>
                                            )}
                                        </div>
                                        <button onClick={()=> router(`/dashboard/event/create?type=editticket&index=${index}`)}>
                                            <MdEditSquare size={"20px"} />
                                        </button>
                                    </div>
                                )
                            })}
                        </>
                    )}

                </div>
                <div className=" mt-auto pt-6 w-full lg:w-[50%] " >
                    <CustomButton loading={isLoading} onClick={() => formik.handleSubmit()} bgColor="#B00062" rounded="999px" type="submit" >Launch Event</CustomButton>
                </div>
            </div>

        </div>
    )
}