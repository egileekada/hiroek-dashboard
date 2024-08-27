import { Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";


export default function EventForm() {
    return (
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            <div className=" w-full p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Description</Text>
                    <textarea placeholder="Type event description here. . ." className=" h-[156px] p-3 border-[#37137F80] border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Event Venue</Text>
                    <CustomInput name="name" type="text" placeholder="Type or search for venue..." />
                </div>
                <div className=" w-full flex gap-4 " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Category</Text>
                        <CustomInput name="name" type="text" placeholder="Category" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Event Access</Text>
                        <CustomInput name="name" type="text" placeholder="Event Access Type" />
                    </div>
                </div>
                <div className=" w-full flex gap-4 " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Start Date</Text>
                        <CustomInput name="name" type="date" placeholder="Type" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >End Date</Text>
                        <CustomInput name="name" type="date" placeholder="Type" />
                    </div>
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Fundraising Goal</Text>
                    <CustomInput name="name" type="text" placeholder="£" />
                </div>
            </div>
            <ImagePicker />
        </div>
    )
}