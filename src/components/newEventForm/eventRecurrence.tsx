import { FormikProps } from "formik";
import { ICreateEvent } from "../../model/event";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { CustomButton, Text } from "../shared";
import CustomSelect from "../shared/formSelect";
import { RadioGroup } from "@radix-ui/themes";
import CustomDatePicker from "../shared/customDatePicker";
import CustomInput from "./input";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface IProps {
    formik: FormikProps<ICreateEvent>;
    data: any;
    setTab: (by: number) => void
    setOpen: (by: boolean) => void
}

export default function EventRecurrence({ formik, setTab, setOpen }: IProps) {

    const navigate = useNavigate()

    const history = useLocation()
    const { id } = useParams();

    const validateRecurrence = () => {
        const r = formik.values.recurrence;

        if (!r.interval || r.interval <= 0) {
            return "Set a valid interval";
        }

        if (!r.frequency) {
            return "Select a frequency";
        }

        if (r.daysOfWeek.length === 0) {
            return "Select at least one day";
        }

        if (!r.endType) {
            return "Choose how the recurrence ends";
        }

        if (r.endType === "UNTIL_DATE" && !r.endDate) {
            return "Set an end date";
        }

        if (r.endType === "AFTER_OCCURRENCES" && !r.occurrenceCount) {
            return "Set occurrence count";
        }

        return null;
    };

    const [ticketNo, setTicketNo] = useState(0)
    const clickTicket = (type: "remove" | "add") => {
        if (ticketNo > 0 && type === "remove") {
            formik.setFieldValue("recurrence.interval", ticketNo - 1)
            setTicketNo((prev) => prev - 1)
        } else {
            formik.setFieldValue("recurrence.interval", ticketNo + 1)
            setTicketNo((prev) => prev + 1)
        }
    }

    const changeHandler = (item: number) => {

        let clone = [...formik.values.recurrence.daysOfWeek]

        if (clone.includes(item)) {
            clone = clone.filter((index) => index !== item)
            console.log(clone);

        } else {
            clone.push(item)
        }

        formik.setFieldValue("recurrence.daysOfWeek", clone)
    }

    // const clickHandler = (e: any) => {
    //     e.preventDefault()
    //     if(formik.values.recurrence.daysOfWeek.length === 0 || !formik.values.recurrence.interval || !formik.values.recurrence.frequency || !formik.values.recurrence.endType){
    //         toast.error("Fill Recurrence Correctly")
    //     } else if (formik.values.recurrence.endType === "UNTIL_DATE" && !formik?.values.recurrence.endDate) {
    //         toast.error("Set an End Date")
    //     } else if(formik.values.recurrence.endType === "AFTER_OCCURRENCES" && !formik?.values.recurrence.occurrenceCount) {
    //         toast.error("Set Occurrence")
    //     } else {
    //         if(history.pathname.includes("edit")) {
    //             if(formik.values.fundRaiser.fundRaisingGoal) {
    //                 navigate(`/dashboard/event/edit/${id}?type=fundraising`)
    //             } else {
    //                 setOpen(true)
    //                 setTab(4)
    //             }
    //         } else {
    //             setOpen(true)
    //             setTab(4)
    //         }
    //     }
    // }

    const clickHandler = (e: any) => {
        e.preventDefault();

        const error = validateRecurrence();
        if (error) {
            toast.error(error);
            return;
        }

        if (history.pathname.includes("edit")) {
            if (formik.values.fundRaiser.fundRaisingGoal) {
                navigate(`/dashboard/event/edit/${id}?type=fundraising`);
            } else {
                setOpen(true);
                setTab(4);
            }
        } else {
            setOpen(true);
            setTab(4);
        }
    };


    return (
        <form onSubmit={clickHandler} className=" w-full flex flex-col gap-4 lg:pb-6 px-4 " >
            <div className=" w-full flex flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Repeats Every</Text>
                <div className=" flex flex-row items-center gap-2 " >
                    <div className=" w-fit h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                        <div role="button" onClick={() => clickTicket("remove")} >
                            <AiOutlineMinusCircle size={"30px"} />
                        </div>
                        <input value={formik?.values?.recurrence?.interval}
                            name="recurrence.interval"
                            onChange={formik.handleChange}
                            placeholder="0"
                            type="number"
                            className=" focus:border-0 outline-none text-center w-[100px] "
                            onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                        <div role="button" onClick={() => clickTicket("add")} >
                            <IoMdAddCircleOutline size={"30px"} />
                        </div>
                    </div>
                    <div className=" w-[170px] " >
                        <CustomSelect options={[
                            {
                                label: "WEEKLY",
                                value: "WEEKLY"
                            }, {
                                label: "MONTHLY",
                                value: "MONTHLY"
                            }
                        ]} name={"recurrence.frequency"} />
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-1 " >
                <Text className=" text-primary font-semibold text-sm " >Repeats On</Text>
                <div className=" w-full flex gap-3 " >
                    <div onClick={() => changeHandler(1)} className={` ${formik.values.recurrence.daysOfWeek?.includes(1) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Mo</p>
                    </div>
                    <div onClick={() => changeHandler(2)} className={` ${formik.values.recurrence.daysOfWeek?.includes(2) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Tu</p>
                    </div>
                    <div onClick={() => changeHandler(3)} className={` ${formik.values.recurrence.daysOfWeek?.includes(3) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>W</p>
                    </div>
                    <div onClick={() => changeHandler(4)} className={` ${formik.values.recurrence.daysOfWeek?.includes(4) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Th</p>
                    </div>
                    <div onClick={() => changeHandler(5)} className={` ${formik.values.recurrence.daysOfWeek?.includes(5) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Fr</p>
                    </div>
                    <div onClick={() => changeHandler(6)} className={` ${formik.values.recurrence.daysOfWeek?.includes(6) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Sa</p>
                    </div>
                    <div onClick={() => changeHandler(0)} className={` ${formik.values.recurrence.daysOfWeek?.includes(0) ? "bg-primary text-white " : "border-[#37137F26] border text-primary"} w-10 h-10 cursor-pointer rounded-full flex justify-center items-center text-lg font-semibold `} >
                        <p>Su</p>
                    </div>
                </div>
            </div>
            <div className=" w-full flex flex-col gap-1 pb-5 " >
                <Text className=" text-primary font-semibold text-sm " >Recurrence Ends</Text>
                <RadioGroup.Root onValueChange={(val) => { formik.setFieldValue("recurrence.endType", val), formik?.setFieldValue("recurrence.endDate", ""), formik?.setFieldValue("recurrence.occurrenceCount", "") }} className=" text-sm font-semibold text-primary " defaultValue={formik?.values?.recurrence?.endType} name="example">
                    <RadioGroup.Item className=" items-center flex h-[60px] border-b w-full " value="NEVER">
                        <p  >Never</p>
                    </RadioGroup.Item>
                    <RadioGroup.Item className=" items-center flex h-[60px] border-b w-full " value="UNTIL_DATE">
                        <div className=" flex gap-2 items-center " >
                            <p>On</p>
                            <CustomDatePicker disable={formik?.values?.recurrence?.endType === "UNTIL_DATE" ? false : true} name="recurrence.endDate" />
                        </div>
                    </RadioGroup.Item>
                    <RadioGroup.Item className=" items-center flex h-[60px] border-b w-full " value="AFTER_OCCURRENCES">
                        <div className=" flex gap-2 items-center " >
                            <p>After</p>
                            <div className=" w-12 my-auto " >
                                <CustomInput disable={formik?.values?.recurrence?.endType === "AFTER_OCCURRENCES" ? false : true} name={"recurrence.occurrenceCount"} height="40px" type={"number"} placeholder={"0"} />
                            </div>
                            <p>Occurences</p>
                        </div>
                    </RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <CustomButton width="400px" >Save & Continue</CustomButton>
        </form>
    )
}