import { FormikProps } from "formik";
import { ICreateEvent, IEvent } from "../../model/event";
import CustomInput from "./input";
import { CustomButton, Text } from "../shared";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CustomDatePicker from "../shared/customDatePicker";
import { Switch } from "@radix-ui/themes";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../utils/useQuery";
import { numberFormat } from "../../utils/formatNumberWithK";
import useEvent from "../../hooks/eventHooks/useNewEvent";

interface IProps {
    formik: FormikProps<ICreateEvent>;
    setTab: (by: number) => void
}

export default function EditEventTicket({ formik }: IProps) {

    const query = useQuery();
    const index = query.get('index');
    const ticketId = query.get('ticketId');
    const history = useLocation()
    const navigate = useNavigate()

    const { ticketMutate, loadingticketEvent } = useEvent()

    const [checked, setChecked] = useState(false)

    const changeHandler = () => {
        setChecked((prev) => !prev)
        formik.setFieldValue(`ticketing[${index}].absorbFees`, !checked)
    }

    console.log(checked);

    const { id } = useParams();

    const clickTicket = (type: "remove" | "add") => {
        if (Number(formik?.values?.ticketing[Number(index)].signUpLimit) > 0 && type === "remove") {
            formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) - 1)
            // setTicketNo((prev) => prev - 1)
        } else if (type === "add") {
            if (!formik?.values?.ticketing[Number(index)]?.signUpLimit) {
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, 1)
            } else {
                formik.setFieldValue(`ticketing[${index}].signUpLimit`, Number(formik?.values?.ticketing[Number(index)]?.signUpLimit) + 1)
            }
        }
    }

    const clickHandler = () => {
        if (history.pathname.includes("edit")) {
            navigate(`/dashboard/event/edit/${id}?type=ticketdetails`)
        } else {
            navigate(`/dashboard/event/create?type=ticketdetails`)
        }
    }

    const price = Number(formik?.values?.ticketing[Number(index)]?.ticketPrice)
    const fee = Number((Number(price) * (1.5 / 100)) + 0.2 + 0.6).toFixed(2)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(ticketId) {
            ticketMutate({
                payload: {
                    ticketPrice: formik.values.ticketing[Number(index)].ticketPrice,
                    ticketType: formik.values.ticketing[Number(index)].ticketType,
                    salesStartDate: formik.values.ticketing[Number(index)].salesStartDate,
                    salesEndDate: formik.values.ticketing[Number(index)].salesStartDate,
                    signUpLimit: formik.values.ticketing[Number(index)].signUpLimit,
                    absorbFees: formik.values.ticketing[Number(index)]?.absorbFees,
                },
                id: ticketId as string
            })
        } else  { 
            clickHandler()
        }
    }

    return (
        <form onSubmit={onSubmit} className=" max-w-[450px] w-full flex flex-col gap-4 lg:pb-6 px-4 lg:px-0 pb-6 " >
            <div className=" flex w-full flex-col gap-4 " >
                <CustomInput borderRadius="8px" name={`ticketing[${index}].ticketPrice`} label="Event Ticket Price" type="number" placeholder="" />
                <div className=" rounded-xl p-4 text-primary flex flex-col gap-2 w-full bg-[#37137F1A] " >
                    <div className=" w-full flex justify-between items-center pb-2 border-b border-[#37137F4D] " >
                        <Text className=" text-sm font-bold " >Ticket Price</Text>
                        <Text className=" font-black " >{numberFormat(price)}</Text>
                    </div>
                    <div className=" w-full flex justify-between items-center pb-2 border-[#37137F4D] " >
                        <Text className=" text-xs font-semibold " >Hiroek Fee:</Text>
                        <Text className=" font-black " >£0.60</Text>
                    </div>
                    <div className=" w-full flex justify-between items-center pb-2 border-b border-[#37137F4D] " >
                        <Text className=" text-xs font-semibold " >Payment Processing Fee:</Text>
                        <Text className=" font-black " >(1.5)%+ £0.20</Text>
                    </div>
                    <div className=" w-full flex justify-between items-center pb-2 border-[#37137F4D] " >
                        <Text className=" text-xs font-semibold " >Buyers Pay:</Text>
                        <Text className=" font-black " >{numberFormat((Number(price) + (Number(price) * (1.5 / 100)) + 0.2 + 0.6).toFixed(2))}</Text>
                    </div>
                    <div className=" w-full flex justify-between items-center pb-2 border-b border-[#37137F4D] " >
                        <Text className=" text-xs font-semibold " >You Receive:</Text>
                        <Text className=" font-black " >{!formik.values.ticketing[Number(index)].absorbFees ? numberFormat(price) : numberFormat(Number(price) - Number(fee))}</Text>
                    </div>

                    <div className=" w-full flex justify-between items-center py-2 " >
                        <Text className=" text-xs font-semibold " >Do you want to absorb all the fees?</Text>
                        <Switch checked={checked} onClick={changeHandler} />
                    </div>
                </div>
                <CustomInput borderRadius="8px" name={`ticketing[${index}].ticketType`} label="Ticket Type Name" type="text" placeholder="" />
                <div className=" w-full flex flex-col gap-1 ">
                    <div className=" flex w-full flex-col gap-1 " >
                        <div className=" w-full flex justify-between items-center " >
                            <Text className=" text-primary font-semibold text-sm " >No of Tickets Available</Text>
                        </div>
                        <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                            <div role="button" onClick={() => clickTicket("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            <input value={formik?.values?.ticketing[Number(index)]?.signUpLimit}
                                name="signUpLimit"
                                onChange={(e) => formik.setFieldValue(`ticketing[${index}].signUpLimit`, e.target.value)}
                                placeholder="0"
                                type="number"
                                className=" focus:border-0 outline-none text-center "
                                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                            <div role="button" onClick={() => clickTicket("add")} >
                                <IoMdAddCircleOutline size={"30px"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex gap-4 mb-4 "  >
                    <CustomDatePicker name={`ticketing[${index}].salesStartDate`} showTime={false} label="Sale Starts" height={"50px"} />
                    <CustomDatePicker name={`ticketing[${index}].salesEndDate`} showTime={false} label="Sale Ends" height={"50px"} />
                </div>
                {!ticketId && (
                    <CustomButton onClick={clickHandler} >Update Ticket</CustomButton>
                )}
                {ticketId && (
                    <CustomButton loading={loadingticketEvent} >Update Ticket</CustomButton>
                )}
            </div>
        </form>
    )
}