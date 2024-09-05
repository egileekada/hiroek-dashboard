import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import { EventIcon } from "../../svg";
import useProfile from "../../hooks/useProfile";


export default function ProfileForm() {

    const { profileForm } = useProfile()

    return profileForm ( 
        <div className=' w-full max-w-[607px] flex flex-col gap-4 lg:px-0 px-4 ' >
            <div className=' w-full h-[200px] lg:h-[300px] rounded-[24px] relative bg-primary ' >
                <button className=' w-fit px-6 h-[38px] lg:h-[57px] lg:text-base text-xs rounded-[44px] bg-[#FFFFFF26] absolute top-4 right-4 font-extrabold text-white ' >Upload Organization Logo</button>
            </div>
            <div className=' w-full flex flex-col gap-4 pb-6 mt-3 ' >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Description</Text>
                    <textarea name="description" placeholder="Type or search for venue..." className=" h-[111px] p-3 border-[#37137F] border-opacity-30 outline-none border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Email</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Address</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Contact No.</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Reg No.</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div>
                <div className=" w-full mt-4 lg:hidden ">
                    <CustomButton hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        Update Profile
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}
