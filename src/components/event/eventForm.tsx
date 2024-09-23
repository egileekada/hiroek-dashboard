import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";
import useInterest from "../../hooks/useInterest";
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect";
import MultipleSelect from "../shared/multipleSelect"; 
import CustomDatePicker from "../shared/customDatePicker";

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

    const { isLoading: loadingInterest, data: interestData } = useInterest()
    const { isLoading: loadingCategory, data: categoryData } = useCategory() 

    const changeHandler = (item: string, name: string) => {
        setValue(name, item)
    }

    return (
        <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <CustomInput name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomInput name="address" type="text" placeholder="Type or search for venue..." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Interest</Text>
                    {!loadingInterest && (
                        <MultipleSelect value={[]} placeholder="Select Interest" name="interest" changeHandler={(e) => changeHandler(e, "interest")} interest={interestData} />
                    )}
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        {!loadingCategory && (
                            <CustomSelect value={values?.category} formState={formState} placeholder="Select Categories" name="category" changeHandler={setValue} list={categoryData} />
                        )}
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Privacy</Text>
                        <CustomSelect value={values?.privacy} formState={formState} placeholder="Select Privacy" name="privacy" changeHandler={setValue} list={["public", "invite-only"]} />
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
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Sign-up Limit</Text>
                        <CustomInput name="signUpLimit" type="number" placeholder="Enter Limit" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Fundraising Goal</Text>
                        <CustomInput name="fundraisingGoal" type="text" placeholder="£" />
                    </div>
                </div>
            </div>
            <ImagePicker />
            <div className=" w-full py-6 lg:hidden px-4 " >
                <CustomButton loading={isLoading} className=" px-3 " width="100%" type="submit" >
                    Create New Event
                </CustomButton>
            </div>
        </div>
    )
}