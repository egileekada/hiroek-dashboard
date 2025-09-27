import { GalleryIcon } from '../../svg'
import { useState } from 'react'
import { useImage } from '../../global-state/useImageData'
import toast from 'react-hot-toast'

export default function ImagePicker({ defaultValue } : { defaultValue?: string }) {

    const [image, setImage] = useState("")
    const { eventImage, updateEventImage } = useImage((state) => state)

    const handleImageChange = (e: any) => {

        const selected = e.target.files[0]; 
        
        const TYPES = ["image/png", "image/jpg", "image/jpeg"];
        if (selected && TYPES.includes(selected.type)) {
            const reader: any = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            toast.error("Invalid Image Type")
        }
        updateEventImage(selected) 
    } 

    return (
        <div className=" w-full px-4 flex flex-col gap-4  " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
            <div className=" w-full border border-[#37137F4D] relative rounded-lg border-dashed h-[184px] gap-2 flex flex-col justify-center items-center " >
                <div className=" w-11 h-11 flex justify-center items-center bg-[#37137F26] rounded-lg " >
                    <GalleryIcon />
                </div>
                {/* <Text className=" tracking-[0.5%] text-sm text-[#858D9D] " >Drag and drop image here, or click add image</Text> */}
                {/* <label> */}
                <label role='button' className={` px-3 h-[31px] relative z-20 ${image || defaultValue ? "bg-white text-[#B00062] " : "bg-primary text-white " }  flex justify-center items-center rounded-[44px] font-extrabold text-[10px] tracking-[0.5%]  `} >
                    {(image || defaultValue) ? "Change Event Image" : " Upload Event Image"}
                    <input style={{ display: 'none' }} type="file" accept="image/*" id="input" onChange={handleImageChange} />
                </label>
                {/* </lab/el> */}
                {(eventImage || defaultValue) && (
                    <img className=' h-full w-full rounded-lg absolute inset-0 object-cover ' src={eventImage ? URL.createObjectURL(eventImage) : defaultValue} alt='logo' />
                )}
                {(eventImage || defaultValue) && (
                    <div className=' h-full w-full rounded-lg absolute inset-0 bg-black bg-opacity-25 ' />
                )}
            </div>

        </div>
    )
} 
