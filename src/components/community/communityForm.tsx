import { Text } from "@radix-ui/themes";
import { CustomInput } from "../shared";
import ImagePicker from "../shared/imagePicker";
import useCommunity from "../../hooks/useCommunity";


export default function CommunityForm() {

    const { communityHookForm } = useCommunity()

    return communityHookForm (
        <div className=" w-full flex flex-col gap-4 pb-6 " >
            <div className=" w-full py-5 px-4 lg:px-5 lg:p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Community Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type community name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Community Description</Text>
                    <textarea placeholder="Type community description here. . ." className=" h-[156px] p-3 outline-none border-[#37137F80] border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
                </div>
                <div className=" w-full flex lg:flex-row flex-col gap-4 " >
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Select Cause or Interest</Text>
                        <CustomInput name="name" type="text" placeholder="Cause or Interest" />
                    </div>
                    <div className=" flex w-full flex-col gap-1 " >
                        <Text className=" text-primary font-semibold text-sm " >Community Access</Text>
                        <CustomInput name="name" type="text" placeholder="Community Access Type" />
                    </div>
                </div>
            </div>
            <ImagePicker />
        </div>
    )
}