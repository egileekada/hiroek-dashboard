import { useLocation } from "react-router-dom";
import PageHeader from "../shared/pageHeader";
import useEvent from "../../hooks/eventHooks/useNewEvent";
import CustomInput from "./input";
import { Text } from "../shared";
import ImagePicker from "../shared/imagePicker";
import CustomAddress from "../shared/customAddress";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect";
import CustomDatePicker from "../shared/customDatePicker";
import GetOrganization from "../event/getOrganization";
import { IoCloseCircle } from "react-icons/io5";
import { Switch } from "@radix-ui/themes";
import CreateEventBtn from "../event/createEventBtn";
import CreateEventBtnMobile from "../event/createEventBtnmobile";
// import { useDatePicker } from "../../global-state/useDatePicker";

export default function EventForm({defaultdata} : {defaultdata?: any}) {

    const history = useLocation()

    const { formik, open, setOpen, isSuccess, isLoading, loadingEditEvent, submitHandler } = useEvent()
    const [ticketNo, setTicketNo] = useState(0)

    const { isLoading: loadingCategory, data: categoryData } = useCategory()
    const [paidEvent, setPaidEvent] = useState(false)
    const [isFundraising, setIsFundraising] = useState(false)

    // console.log(formik.values);

    const clickTicket = (type: "remove" | "add") => {
        if (ticketNo > 0 && type === "remove") {
            formik.setFieldValue("signUpLimit", ticketNo - 1)
            setTicketNo((prev) => prev - 1)
        } else {
            formik.setFieldValue("signUpLimit", ticketNo + 1)
            setTicketNo((prev) => prev + 1)
        }
    } 
    
    useEffect(() => {
        if (!formik?.values?.name && defaultdata?.name) {
            formik?.setFieldValue("address", defaultdata?.address)
            formik?.setFieldValue("name", defaultdata?.name)
            formik?.setFieldValue("description", defaultdata?.description)
            formik?.setFieldValue("signUpLimit", defaultdata?.signUpLimit ? defaultdata?.signUpLimit : 0)

            if(defaultdata?.category?.subcategories?.length > 0){
                formik?.setFieldValue("category", defaultdata?.category?.subcategories[0])
            } else {
                formik?.setFieldValue("category", defaultdata?.category?._id)
            } 
            formik?.setFieldValue("eventTicket.ticketPrice", defaultdata?.eventTicket?.ticketPrice)
            // formik?.setFieldValue("eventTicket.totalTicket", defaultdata?.eventTicket?.totalTicket)
            formik?.setFieldValue("fundRaiser.fundRaisingGoal", defaultdata?.fundRaiser?.fundRaisingGoal) 
            setTicketNo(defaultdata?.signUpLimit ? defaultdata?.signUpLimit : 0)
            // updateStartDate(defaultdata?.endTime)
            // updateEndDate(defaultdata?.eventEndDate)
        }
    }, [formik?.values]) 

    const checkForCategory = () => {
        if(defaultdata?.category?.subcategories?.length > 0){
            return defaultdata?.category?.subcategories[0]
        } else {
            return defaultdata?.category?._id
        } 
            return ""
    }

    console.log(formik?.values);
    

    return (
        <form onSubmit={formik?.handleSubmit} className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header={history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"} body={history?.pathname?.includes("edit") ? "" : "Effortless Event Creation and Community Engagement."} />
                <div className=" w-[230px] lg:block hidden text-white ">
                    <CreateEventBtn isSuccess={isSuccess} submit={submitHandler} open={open} setOpen={setOpen} loading={isLoading || loadingEditEvent} />
                </div>
            </div>

            <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
                <ImagePicker />
                <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                        <CustomInput touched={formik?.touched} errors={formik?.errors} setValue={formik.setFieldValue} value={formik?.values?.name} borderRadius="8px" name="name" type="text" placeholder="Type event name here. . ." />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                        <CustomInput touched={formik?.touched} errors={formik?.errors} setValue={formik.setFieldValue} value={formik?.values?.description} borderRadius="8px" name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                        {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                        <CustomAddress touched={formik?.touched} errors={formik?.errors} value={formik?.values?.address} borderRadius="8px" name="address" type="text" setValue={formik.setFieldValue} placeholder="Type or search for venue..." />
                    </div>
                    <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                        <div className=" w-full flex flex-col gap-1 ">
                        <div className=" flex w-full flex-col gap-1 " >
                            <Text className=" text-primary font-semibold text-sm " >Spots Available</Text>
                            <div className=" w-full h-[54px] text-opacity-30 text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                                <div role="button" onClick={() => clickTicket("remove")} >
                                    <AiOutlineMinusCircle size={"30px"} />
                                </div>
                                {formik?.values?.signUpLimit + ""}
                                <div role="button" onClick={() => clickTicket("add")} >
                                    <IoMdAddCircleOutline size={"30px"} />
                                </div>
                            </div>
                        </div> 
                        </div>
                        <div className=" flex w-full flex-col gap-1 " >
                            <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                            {!loadingCategory && (
                                <CustomSelect touched={formik?.touched} errors={formik?.errors} value={formik?.values?.category ? formik?.values?.category : checkForCategory()} placeholder="Select Categories" name="category" changeHandler={formik.setFieldValue} list={categoryData} />
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
                                    <CustomInput touched={formik?.touched} errors={formik?.errors} value={formik?.values?.eventTicket?.ticketPrice} setValue={formik.setFieldValue} borderRadius="8px" name="eventTicket.ticketPrice" type="number" placeholder="" icon={<Text className=" font-medium !text-primary !text-xl ml-2 " >£</Text>} hasLeftIcon={true} />
                                </div>
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
                                            <CustomInput touched={formik?.touched} errors={formik?.errors} value={formik.values.fundRaiser.organizations} setValue={formik.setFieldValue} icon={<Text className=" font-medium !text-xl ml-2 " >£</Text>} hasLeftIcon={true} borderRadius="8px" color="white" borderWidth="1px" borderColor="white" name="fundRaiser.fundRaisingGoal" type="number" placeholder="Enter Amount" />
                                        </div>
                                    </div>
                                    <GetOrganization value={formik?.values} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className=" w-full py-6 lg:hidden px-4 " >
                    <CreateEventBtnMobile isSuccess={isSuccess} open={open} setOpen={setOpen} submit={submitHandler} loading={isLoading} />
                </div>
            </div>
        </form>
    )
}