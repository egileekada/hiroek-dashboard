import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker"; 
import useCategory from "../../hooks/useCategory";
import CustomSelect from "../shared/customSelect"; 
import CustomDatePicker from "../shared/customDatePicker";
import { IEvent } from "../../model/event";
import CustomAddress from "../shared/customAddress";

interface IProps {
    setValue: any;
    formState: any;
    isLoading: boolean,
    values: any,
    interest: Array<string>,
    defaultdata: IEvent
}

export default function EditEventForm(props: IProps) {

    const {
        setValue,
        formState,
        isLoading,
        values, 
        defaultdata
    } = props

    // const { isLoading: loadingInterest, data: interestData } = useInterest()
    const { isLoading: loadingCategory, data: categoryData } = useCategory()

    const changeHandler = (item: string, name: string) => {
        setValue(name, item)
    }

    return (
        <div className=" w-full flex flex-col gap-4 lg:pb-6 " >
            <ImagePicker defaultValue={defaultdata?.photo} />
            <div className=" w-full p-4 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput edit={true} setValue={setValue} value={values?.name ? values?.name : defaultdata?.name}  name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <CustomInput edit={true} setValue={setValue} value={values?.description ? values?.description : defaultdata?.description} name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomAddress name="address" type="text" setValue={setValue} placeholder="Type or search for venue..." />
                </div>
                {/* <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Interest</Text>
                    {!loadingInterest && (
                        <MultipleSelect value={interest} placeholder="Select Interest" name="interest" changeHandler={(e) => changeHandler(e, "interest")} interest={interestData} />
                    )}
                </div> */}
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        {!loadingCategory && (
                            <CustomSelect value={values?.category ? values?.category : defaultdata?.category} formState={formState} placeholder="Select Categories" name="category" changeHandler={changeHandler} list={categoryData} />
                        )}
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Privacy</Text>
                        <CustomSelect value={values?.privacy ? values?.privacy : defaultdata?.privacy} formState={formState} placeholder="Select Privacy" name="privacy" changeHandler={changeHandler} list={["public", "invite-only"]} />
                    </div>
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date</Text>
                        <CustomDatePicker name="endTime" value={values?.endTime ? values?.endTime : defaultdata?.endTime} setValue={setValue} />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date</Text>
                        <CustomDatePicker name="eventEndDate" value={values?.eventEndDate ? values?.eventEndDate : defaultdata?.eventEndDate} setValue={setValue} />
                    </div>
                </div>
                <div className=" w-full flex gap-4 lg:flex-row flex-col " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Sign-up Limit</Text>
                        <CustomInput edit={true} setValue={setValue} name="signUpLimit" value={values?.signUpLimit ? values?.signUpLimit+"" : defaultdata?.signUpLimit+""} type="number" placeholder="Enter Limit" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Fundraising Goal</Text>
                        <CustomInput edit={true} setValue={setValue} name="fundraisingGoal"value={values?.fundraisingGoal ? values?.fundraisingGoal+"" : defaultdata?.fundraisingGoal+""} type="text" placeholder="£" />
                    </div>
                </div>
            </div>
            <div className=" w-full py-6 lg:hidden px-4 " >
                <CustomButton loading={isLoading} className=" px-3 " width="100%" type="submit" >
                    Edit Event
                </CustomButton>
            </div>
        </div>
    )
}