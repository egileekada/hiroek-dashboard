import { Switch, Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";
// import useInterest from "../../hooks/useInterest";
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect";
// import MultipleSelect from "../shared/multipleSelect";
import CustomDatePicker from "../shared/customDatePicker";
import CustomAddress from "../shared/customAddress";
import { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5"; 
import CreateEventBtnMobile from "./createEventBtnmobile"; 
import GetOrganization from "./getOrganization";

interface IProps {
    setValue: any;
    formState: any;
    isLoading: boolean,
    values: any,
    submit: any
    open: boolean,
    setOpen: any,
    control: any,
    isSuccess: boolean
}

export default function EventForm(props: IProps) {

    const {
        setValue,
        formState,
        isLoading,
        values,
        submit,
        open,
        setOpen,
        control,
        isSuccess
    } = props

    // const { isLoading: loadingInterest, data: interestData } = useInterest()
    const { isLoading: loadingCategory, data: categoryData } = useCategory() 
    const [paidEvent, setPaidEvent] = useState(false)
    const [isFundraising, setIsFundraising] = useState(false) 
    const [ticketNo, setTicketNo] = useState(0) 
    
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
            <ImagePicker />
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput borderRadius="8px" name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <CustomInput borderRadius="8px" name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomAddress borderRadius="8px" name="address" type="text" setValue={setValue} placeholder="Type or search for venue..." />
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " > 
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Spots Available</Text>
                        <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                            <div role="button" onClick={() => clickTicket("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            {ticketNo}
                            <div role="button" onClick={() => clickTicket("add")} >
                                <IoMdAddCircleOutline size={"30px"} />
                            </div>
                        </div>
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        {!loadingCategory && (
                            <CustomSelect value={values?.category} formState={formState} placeholder="Select Categories" name="category" changeHandler={setValue} list={categoryData} />
                        )}
                    </div>
                </div>
                <div className=" w-full flex gap-4 flex-col lg:flex-row relative " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date & Time</Text>
                        <CustomDatePicker borderRadius="8px" name="endTime"  />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date & Time</Text>
                        <CustomDatePicker borderRadius="8px" name="eventEndDate"  />
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
                                <CustomInput borderRadius="8px" name="eventTicket.ticketPrice" type="number" placeholder="" icon={<Text className=" font-medium !text-xl ml-2 " >£</Text>} hasLeftIcon={true} />
                            </div>
                            {/* <div className=" flex w-full flex-col gap-1 " >
                                <Text className=" text-primary font-semibold text-sm " >No Of Avaliable Ticket</Text>
                                <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                                    <div role="button" onClick={() => clickTicket("remove")} >
                                        <AiOutlineMinusCircle size={"30px"} />
                                    </div>
                                    {ticketNo}
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
                                        <p className=" text-sm font-bold " >Fundraising Goal</p>
                                    </div>
                                    <div className=" flex w-full flex-col gap-1 " >
                                        <CustomInput icon={<Text className=" font-medium !text-xl ml-2 " >£</Text>} hasLeftIcon={true} borderRadius="8px" color="white" borderWidth="1px" borderColor="white" name="fundRaiser.fundRaisingGoal" type="number" placeholder="Enter Amount" />
                                    </div>
                                </div>
                                <GetOrganization value={values} />
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