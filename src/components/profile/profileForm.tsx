import { Text } from "@radix-ui/themes";
import { CustomButton, CustomInput } from "../shared";
import { EventIcon } from "../../svg";
import useProfile from "../../hooks/useProfile";
import { useDetails } from "../../global-state/useUserDetails";
import { TbPhoto } from "react-icons/tb";
import { useImage } from "../../global-state/useImageData";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import CustomAddress from "../shared/customAddress";
import { useMap } from "../../global-state/useMapStore";


export default function ProfileForm() {

    const { isLoading, values, setImage, image, loadingProfile, profileForm, setValue } = useProfile()
    const { logo, name, charityRegNumber, email, description, address, telephone } = useDetails((state) => state);

    const { updateImage } = useImage((state) => state) 
    const { updateMap } = useMap((state) => state);

    const router = useNavigate()
    // const { isLoading: loadingInterest, data: interestData } = useInterest()

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

    useEffect(() =>  {
        updateMap(address)
    }, [])
    

    return profileForm (
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
                    Upload Organisation Logo
                </label>
            </div>
            <div className=' w-full flex flex-col gap-4 pb-6 mt-3 ' >
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Name</Text>
                    <CustomInput name="name" type="text" placeholder="Type event name here. . ." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Description</Text>
                    <CustomInput name="description" textarea={true} type="text" placeholder="Enter Organisation Description" />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Email</Text>
                    <CustomInput name="email" value={email} type="email" placeholder="Enter Organisation" disable={true} />
                </div>  
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Phone Number</Text>
                    <CustomInput name="telephone" value={telephone} type="tel" edit={true} setValue={setValue} placeholder="Enter Organisation Phone Number" />
                </div>  
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Address</Text>
                    <CustomAddress borderRadius="8px" name="address" type="text" setValue={setValue} placeholder="Type or search for venue..." />
                </div>
                <div className=" flex w-full flex-col gap-1 " >
                    <Text className=" text-primary font-semibold text-sm " >Organisation Reg No.</Text>
                    <CustomInput name="charityRegNumber" type="number" placeholder="Enter Organisation Reg No" />
                </div>
                <div className=" w-full mt-4 ">
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
