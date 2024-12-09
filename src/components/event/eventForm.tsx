import { Switch, Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";
// import useInterest from "../../hooks/useInterest";
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect";
// import MultipleSelect from "../shared/multipleSelect";
import CustomDatePicker from "../shared/customDatePicker"; 
import CustomAddress from "../shared/customAddress";
import { useState, useEffect } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";

interface IProps {
    setValue: any;
    formState: any;
    isLoading: boolean,
    values: any
}

export default function EventForm(props: IProps) {

    const {
        setValue,
        formState,
        isLoading,
        values
    } = props

    // const { isLoading: loadingInterest, data: interestData } = useInterest()
    const { isLoading: loadingCategory, data: categoryData } = useCategory()  
    const [signupCount, setSignupCount] = useState(0) 

    useEffect(() => {
        setSignupCount(values?.signUpLimit ? values?.signUpLimit : 0)
    }, [])

    const clickHandler = (type: "remove" | "add") => {
        if (signupCount > 0 && type === "remove") {
            setSignupCount((prev) => prev - 1)
            setValue("signUpLimit", signupCount - 1)
        } else {
            setSignupCount((prev) => prev + 1)
            setValue("signUpLimit", signupCount + 1)
        }
    }

    return (
        <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
        <ImagePicker />
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput borderRadius="16px" name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <CustomInput borderRadius="16px" name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomAddress borderRadius="16px" name="address" type="text" setValue={setValue} placeholder="Type or search for venue..." />
                </div> 
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Sign-up Limit</Text>
                        <div className=" w-full h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-2xl " >
                            <div role="button" onClick={() => clickHandler("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            {signupCount}
                            <div role="button" onClick={() => clickHandler("add")} >
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
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date</Text>
                        <CustomDatePicker name="endTime" value={values?.endTime} setValue={setValue} />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date</Text>
                        <CustomDatePicker name="eventEndDate" value={values?.endTime} setValue={setValue} />
                    </div>
                </div> 
                <div className=" w-full flex gap-4 flex-col " >
                    <div className=" flex gap-4 ">
                        <p className=" text-sm font-bold text-primary " >Is this a Paid ticketed event?</p>
                        <Switch />
                    </div>
                    <div className=" flex gap-4 ">
                        <p className=" text-sm font-bold text-primary " >Do you want to use this event for a fundraiser?</p>
                        <Switch />
                    </div>
                </div>
            </div> 
            <div className=" w-full py-6 lg:hidden px-4 " >
                <CustomButton loading={isLoading} className=" px-3 " width="100%" type="submit" >
                    Create New Event
                </CustomButton>
            </div> 
        </div>
    )
}