import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import { EventIcon } from "../../svg";
import useProfile from "../../hooks/useProfile";
import { useDetails } from "../../global-state/useUserDetails";
import { TbPhoto } from "react-icons/tb";
import { useImage } from "../../global-state/useImageData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 


export default function ProfileForm() {

    const { isLoading, values, setImage, image, loadingProfile } = useProfile()
    const { logo, name, charityRegNumber, email, description } = useDetails((state) => state);

    const { updateImage } = useImage((state) => state) 

    const router = useNavigate()

    const handleImageChange = (e: any) => {

        const selected = e.target.files[0];
        const TYPES = ["image/png", "image/jpg", "image/jpeg"];
        if (selected && TYPES.includes(selected.type)) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(selected)
        }

        updateImage(selected)

    }

    useEffect(() => {
        if (name !== values?.name || charityRegNumber !== values?.charityRegNumber || description !== values?.description) {
            router("/dashboard")
        }
    }, [name])

    return (
        <div className=' w-full max-w-[607px] flex flex-col gap-4 lg:px-0 px-4 ' >
            <div className=' w-full h-[200px] lg:h-[300px] rounded-[24px]  relative ' >
                {image ?
                    <img className=' h-full w-full rounded-[24px] ' src={image} alt='logo' /> :
                    logo ?
                        <img className=' h-full w-full rounded-[24px] ' src={logo} alt='logo' /> :
                        <div className=" w-full h-full bg-gray-400 flex justify-center items-center  rounded-[24px] " >
                            <TbPhoto size={"40px"} />
                        </div>
                }

                <label className=' w-fit px-6 h-[38px] lg:h-[57px] lg:text-base text-xs rounded-[44px] bg-primary absolute top-4 justify-center items-center flex right-4 font-extrabold text-white '  >
                    <input style={{ display: 'none' }} type="file" accept="image/*" id="input" onChange={handleImageChange} />
                    Upload Organization Logo
                </label>
            </div>
            <div className=' w-full flex flex-col gap-4 pb-6 mt-3 ' >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Description</Text>
                    <CustomInput name="description" textarea={true} type="text" placeholder="Enter Organization Description" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Email</Text>
                    <CustomInput name="email" value={email} type="email" placeholder="Enter Organization" disable={true} />
                </div>
                {/* <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization interests</Text>
                    <CustomInput name="interests" type="number" placeholder="Enter Organization interests" />
                </div> */}
                {/* <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Address</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div> */}
                {/* <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Contact No.</Text>
                    <CustomInput name="email" type="email" placeholder="Type or search for venue..." />
                </div> */}
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organization Reg No.</Text>
                    <CustomInput name="charityRegNumber" type="number" placeholder="Enter Organization Reg No" />
                </div>
                <div className=" w-full mt-4 lg:hidden ">
                    <CustomButton loading={isLoading || loadingProfile} hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        Update Profile
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}
