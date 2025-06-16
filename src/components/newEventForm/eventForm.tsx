import { useLocation } from "react-router-dom";
import PageHeader from "../shared/pageHeader";
import useEvent from "../../hooks/eventHooks/useNewEvent";
import CustomInput from "./input";
import { Text } from "../shared";
import ImagePicker from "../shared/imagePicker";
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
import CustomAddressFormik from "../shared/customAddressFormik";
import ModalLayout from "../shared/modalLayout";
// import { useDatePicker } from "../../global-state/useDatePicker";

export default function EventForm({ defaultdata }: { defaultdata?: any }) {

    const history = useLocation()

    const { formik, open, setOpen, isSuccess, isLoading, loadingEditEvent, submitHandler } = useEvent()
    const [ticketNo, setTicketNo] = useState(0)

    const { isLoading: loadingCategory, data: categoryData } = useCategory()
    const [paidEvent, setPaidEvent] = useState(false)
    const [isFundraising, setIsFundraising] = useState(false)
    const [editCategory, setEditCategory] = useState(false)

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
            formik?.setFieldValue("eventTicket.ticketPrice", defaultdata?.eventTicket?.ticketPrice)
            // formik?.setFieldValue("eventTicket.totalTicket", defaultdata?.eventTicket?.totalTicket)
            formik?.setFieldValue("fundRaiser.fundRaisingGoal", defaultdata?.fundRaiser?.fundRaisingGoal)
            setTicketNo(defaultdata?.signUpLimit ? defaultdata?.signUpLimit : 0)
            // updateStartDate(defaultdata?.endTime)
            // updateEndDate(defaultdata?.eventEndDate)
            checkForCategory()
        }
    }, [formik?.values, defaultdata])

    const checkForCategory = () => {
        if (defaultdata?.category?.subcategories?.length > 0) {
            setEditCategory(defaultdata?.category?.subcategories[0])
            formik?.setFieldValue("category", defaultdata?.category?.subcategories[0])
        } else {
            setEditCategory(defaultdata?.category?._id)
            formik?.setFieldValue("category", defaultdata?.category?._id)
        } 
    }

    const [show, setShow] = useState(false)

    console.log(formik?.values);

    console.log(defaultdata);
    


    return (
        <form onSubmit={formik?.handleSubmit} className=' w-full flex flex-col gap-6 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header={history?.pathname?.includes("edit") ? "Edit Event" : "Create New Event"} body={""} />
                <div className=" w-[230px] lg:block hidden text-white ">
                    <CreateEventBtn isSuccess={isSuccess} submit={submitHandler} open={open} setOpen={setOpen} loading={isLoading || loadingEditEvent} />
                </div>
            </div>

            <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
                <ImagePicker defaultValue={defaultdata?.photo} />
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
                        <CustomAddressFormik touched={formik?.touched} errors={formik?.errors} value={formik?.values?.address} borderRadius="8px" name="address" type="text" setValue={formik.setFieldValue} placeholder="Type or search for venue..." />
                    </div>
                    <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                        <div className=" w-full flex flex-col gap-1 ">
                            <div className=" flex w-full flex-col gap-1 " >
                                <div className=" w-full flex justify-between items-center " >
                                    <Text className=" text-primary font-semibold text-sm " >Set Signup Limit</Text> 
                                    <svg className=" w-6 h-6 cursor-pointer " onClick={() => setShow(true)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 24C14.3734 24 16.6935 23.2962 18.6668 21.9776C20.6402 20.6591 22.1783 18.7849 23.0866 16.5922C23.9948 14.3995 24.2324 11.9867 23.7694 9.65892C23.3064 7.33115 22.1635 5.19295 20.4853 3.51472C18.8071 1.83649 16.6689 0.693605 14.3411 0.230582C12.0133 -0.232441 9.60051 0.00519943 7.4078 0.913451C5.21509 1.8217 3.34094 3.35977 2.02236 5.33316C0.703788 7.30655 0 9.62663 0 12C0.00344108 15.1815 1.26883 18.2318 3.51852 20.4815C5.76821 22.7312 8.81846 23.9966 12 24ZM12 5.00001C12.2967 5.00001 12.5867 5.08798 12.8334 5.2528C13.08 5.41762 13.2723 5.65189 13.3858 5.92598C13.4994 6.20007 13.5291 6.50167 13.4712 6.79264C13.4133 7.08361 13.2704 7.35089 13.0607 7.56067C12.8509 7.77044 12.5836 7.91331 12.2926 7.97118C12.0017 8.02906 11.7001 7.99936 11.426 7.88582C11.1519 7.77229 10.9176 7.58003 10.7528 7.33336C10.588 7.08669 10.5 6.79668 10.5 6.50001C10.5 6.10218 10.658 5.72065 10.9393 5.43934C11.2206 5.15804 11.6022 5.00001 12 5.00001ZM11 10H12C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12V18C14 18.2652 13.8946 18.5196 13.7071 18.7071C13.5196 18.8946 13.2652 19 13 19C12.7348 19 12.4804 18.8946 12.2929 18.7071C12.1054 18.5196 12 18.2652 12 18V12H11C10.7348 12 10.4804 11.8946 10.2929 11.7071C10.1054 11.5196 10 11.2652 10 11C10 10.7348 10.1054 10.4804 10.2929 10.2929C10.4804 10.1054 10.7348 10 11 10Z" fill="#37137F" />
                                    </svg>
                                </div>
                                <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                                    <div role="button" onClick={() => clickTicket("remove")} >
                                        <AiOutlineMinusCircle size={"30px"} />
                                    </div>
                                    <input value={formik?.values?.signUpLimit} 
                                        name="signUpLimit"
                                        onChange={formik.handleChange}
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
                        <div className=" flex w-full flex-col gap-1 " >
                            <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                            {!loadingCategory && (
                                <CustomSelect touched={formik?.touched} errors={formik?.errors} value={formik?.values?.category ? formik?.values?.category : editCategory} placeholder="Select Categories" name="category" changeHandler={formik.setFieldValue} list={categoryData} />
                            )}
                        </div>
                    </div>
                    <div className=" w-full flex !gap-4 lg:flex-row flex-col " >
                        <div className=" flex w-full flex-col gap-1 " >
                            <Text className=" text-primary font-semibold text-sm " >Start Date & Time</Text>
                            <CustomDatePicker name="endTime" />
                        </div>
                        <div className=" flex w-full flex-col gap-1 " >
                            <Text className=" text-primary font-semibold text-sm " >End Date & Time</Text>
                            <CustomDatePicker name="eventEndDate" />
                        </div>
                    </div>

                    <div className=" w-full flex gap-4 flex-col " >
                        <div className=" flex gap-4 ">
                            <p className=" text-sm font-bold text-primary capitalize " >Is this a Paid ticketed event?</p>
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
                                <p className=" text-sm font-bold text-primary capitalize " >Do you want to use this event for a fundraiser?</p>
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

            <ModalLayout width={" max-w-[361px] "} rounded="16px" open={show} setOpen={setShow} >
                <div className=" w-full flex flex-col items-center text-primary gap-3 pb-4 " >
                    <p className=" font-bold " >Set Signup Limit</p>
                    <p className=" text-xs italic font-semibold text-center " >This enables you to control the number of people that can attend an event. Registration will close once the signup limit is reached</p>
                </div>
            </ModalLayout>
        </form>
    )
}