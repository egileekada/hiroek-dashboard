import { Text } from "@radix-ui/themes";
import { CustomButton } from "../shared";
import ImagePicker from "../shared/imagePicker"; 
import CustomInput from "../newEventForm/input";


export default function CommunityForm({isLoading}: { 
    isLoading: boolean
}) { 

    return (
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            <ImagePicker />
            <div className=" w-full py-5 px-4 lg:px-5 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Channel Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type community name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Channel Description</Text>
                    <CustomInput name="description" type="text" textarea={true} placeholder="Type event description here. . ." />
                    {/* <textarea placeholder="Type community description here. . ." className=" h-[156px] p-3 outline-none border-[#37137F80] border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " /> */}
                </div> 
            </div>
            <div className=" w-full py-6 max-w-[400px] px-4 " >
                <CustomButton loading={isLoading} className=" px-3 " width="100%" type="submit" >
                    Create Channel
                </CustomButton>
            </div>
        </div>
    )
}