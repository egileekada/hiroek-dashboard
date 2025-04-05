import { Switch, Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect";
import CustomDatePicker from "../shared/customDatePicker";
import { IEvent } from "../../model/event";
import CustomAddress from "../shared/customAddress";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
// import { LuSearch } from "react-icons/lu"; 
import CreateEventBtnMobile from "./createEventBtnmobile";
import { useDatePicker } from "../../global-state/useDatePicker";

interface IProps {
    setValue: any;
    formState: any;
    isLoading: boolean,
    values: any,
    defaultdata: IEvent
    submit: any
    open: boolean,
    setOpen: any,
    isSuccess: boolean
}

export default function EditEventForm(props: IProps) {

    const {
        setValue,
        formState,
        isLoading,
        values,
        defaultdata,
        open,
        submit,
        setOpen,
        isSuccess
    } = props

    // const { isLoading: loadingInterest, data: interestData } = useInterest()
    const { isLoading: loadingCategory, data: categoryData } = useCategory()

    const changeHandler = (item: string, name: string) => {
        setValue(name, item)
    }
    // const [signupCount, setSignupCount] = useState(0)
    // const [ticketNo, setTicketNo] = useState(0)
    const [paidEvent, setPaidEvent] = useState(false)
    const [isFundraising, setIsFundraising] = useState(false)
    const [ticketNo, setTicketNo] = useState(0) 

    useEffect(() => {
        // setSignupCount(values?.signUpLimit ? values?.signUpLimit : defaultdata?.signUpLimit ? defaultdata?.signUpLimit : 0)
        // setTicketNo(values?.eventTicket?.totalTicket ? values?.eventTicket?.totalTicket : defaultdata?.eventTicket?.totalTicket ? defaultdata?.eventTicket?.totalTicket : 0)
        setPaidEvent(defaultdata?.eventTicket?.ticketPrice > 0 ? true : false)
        setIsFundraising(defaultdata?.fundRaiser?.fundRaisingGoal > 0 ? true : false)
    }, [])


    const { updateEndDate, updateStartDate } = useDatePicker((state) => state)

    useEffect(() => {
        if (!values?.name) {
            setValue("address", defaultdata?.address)
            setValue("name", defaultdata?.name)
            setValue("description", defaultdata?.description)
            setValue("signUpLimit", defaultdata?.signUpLimit)
            setValue("category", defaultdata?.category)
            setValue("eventTicket.ticketPrice", defaultdata?.eventTicket?.ticketPrice)
            setValue("eventTicket.totalTicket", defaultdata?.eventTicket?.totalTicket)
            setValue("fundRaiser.fundRaisingGoal", defaultdata?.fundRaiser?.fundRaisingGoal) 
            updateStartDate(defaultdata?.endTime)
            updateEndDate(defaultdata?.eventEndDate)
        }
    }, [values])  

    const clickTicket = (type: "remove" | "add") => {
        if (ticketNo > 0 && type === "remove") {
            setTicketNo((prev) => prev - 1)
            setValue("eventTicket.totalTicket", ticketNo - 1)
        } else {
            setTicketNo((prev) => prev + 1)
            setValue("eventTicket.totalTicket", ticketNo + 1)
        }
    }

    return (
        <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
            <ImagePicker defaultValue={defaultdata?.photo} />
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput borderRadius="16px" edit={true} setValue={setValue} value={values?.name ? values?.name : defaultdata?.name} name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <CustomInput borderRadius="16px" edit={true} setValue={setValue} value={values?.description ? values?.description : defaultdata?.description} name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomAddress borderRadius="16px" name="address" type="text" setValue={setValue} placeholder="Type or search for venue..." />
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >No Of Avaliable Ticket</Text>
                        <div className=" w-full h-[54px] text-opacity-30 text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                            <div role="button" onClick={() => clickTicket("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            {values?.eventTicket?.totalTicket + ""}
                            <div role="button" onClick={() => clickTicket("add")} >
                                <IoMdAddCircleOutline size={"30px"} />
                            </div>
                        </div>
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        {!loadingCategory && (
                            <CustomSelect value={values?.category ? values?.category : defaultdata?.category} formState={formState} placeholder="Select Categories" name="category" changeHandler={changeHandler} list={categoryData} />
                        )}
                    </div>
                </div>
                <div className=" w-full flex !gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date</Text>
                        <CustomDatePicker name="endTime" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date</Text>
                        <CustomDatePicker name="eventEndDate" />
                    </div>
                </div>

                <div className=" w-full flex gap-4 flex-col " >
                    <div className=" flex gap-4 ">
                        <p className=" text-sm font-bold text-primary " >Is this a Paid ticketed event?</p>
                        <Switch checked={paidEvent} onClick={() => setPaidEvent((prev) => !prev)} />
                    </div>
                    {paidEvent && (
                        <div className=" w-full flex lg:flex-row flex-col gap-3 text-primary " >
                            <div className=" flex w-full flex-col gap-1 " >
                                <Text className=" text-primary font-semibold text-sm " >Event Ticket Price</Text>
                                <CustomInput disable={true} value={values?.eventTicket?.ticketPrice ? values?.eventTicket?.ticketPrice / 100 : defaultdata?.eventTicket?.ticketPrice} borderRadius="8px" name="eventTicket.ticketPrice" type="number" placeholder="" icon={<Text className=" font-medium !text-xl ml-2 " >£</Text>} hasLeftIcon={true} />
                            </div>
                            {/* <div className=" flex w-full flex-col gap-1 " >
                                <Text className=" text-primary font-semibold text-sm " >No Of Avaliable Ticket</Text>
                                <div className=" w-full h-[54px] text-opacity-30 text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                                    <div role="button" onClick={() => clickTicket("remove")} >
                                        <AiOutlineMinusCircle size={"30px"} />
                                    </div>
                                    {values?.eventTicket?.totalTicket+""}
                                    <div role="button" onClick={() => clickTicket("add")} >
                                        <IoMdAddCircleOutline size={"30px"} />
                                    </div>
                                </div>
                            </div> */}
                            <div className=" w-full " />
                        </div>
                    )}
                    {!isFundraising && (
                        <div className=" flex gap-4 ">
                            <p className=" text-sm font-bold text-primary " >Do you want to use this event for a fundraiser?</p>
                            <Switch checked={isFundraising} onClick={() => setIsFundraising((prev) => !prev)} />
                        </div>
                    )}
                    {isFundraising && (
                        <div className=" w-full flex flex-col bg-primary rounded-2xl pb-6 lg:p-6 p-4 text-white " >
                            <div className=" ml-auto " onClick={() => setIsFundraising((prev) => !prev)} >
                                <IoCloseCircle size={"30px"} color="white" />
                            </div>
                            <div className=" w-full flex lg:flex-row flex-col gap-4 " >

                                <div className=" flex flex-col w-full gap-1 " >
                                    <div className=" w-full flex justify-between items-center " >
                                        <p className=" text-sm font-bold " >Set Minimum Pledge</p>
                                    </div>
                                    <div className=" flex w-full flex-col gap-1 " >
                                        <CustomInput value={values?.fundRaiser.fundRaisingGoal ? values?.fundRaiser.fundRaisingGoal : defaultdata?.fundRaiser.fundRaisingGoal} icon={<Text className=" font-medium !text-xl ml-2 " >£</Text>} hasLeftIcon={true} borderRadius="8px" color="white" borderWidth="1px" borderColor="white" name="fundRaiser.fundRaisingGoal" type="number" placeholder="Enter Amount" />
                                    </div>
                                </div>
                                {/* <div className=" flex w-full flex-col gap-1 " >
                                    <Text className=" text-white font-semibold text-sm " >Add Charity Partners</Text>
                                    <div className=" flex w-full flex-col gap-1 " >
                                        <CustomInput icon={<LuSearch size={"20px"} className=" ml-3 " />} hasLeftIcon={true} borderRadius="8px" color="white" borderWidth="1px" borderColor="white" name="fundRaiser.organisation[1]" type="text" placeholder="Search Charity Partners" />
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className=" w-full py-6 lg:hidden px-4 " >
                <CreateEventBtnMobile isSuccess={isSuccess} open={open} setOpen={setOpen} submit={submit} loading={isLoading} />
            </div>
        </div>
    )
}