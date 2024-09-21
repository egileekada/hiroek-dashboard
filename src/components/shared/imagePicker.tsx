import { Text } from '@radix-ui/themes'
import { GalleryIcon } from '../../svg'
import { useState } from 'react'
import { useImage } from '../../global-state/useImageData'

export default function ImagePicker({ defaultValue } : { defaultValue?: string }) {

    const [image, setImage] = useState("")
    const { updateEventImage } = useImage((state) => state)

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

        updateEventImage(selected)

    } 

    return (
        <div className=" w-full p-5 flex flex-col gap-4  " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
            <div className=" w-full border border-[#37137F4D] relative rounded-lg border-dashed h-[300px] gap-2 flex flex-col justify-center items-center " >
                <div className=" w-11 h-11 flex justify-center items-center bg-[#37137F26] rounded-lg " >
                    <GalleryIcon />
                </div>
                <Text className=" tracking-[0.5%] text-sm text-[#858D9D] " >Drag and drop image here, or click add image</Text>
                {/* <label> */}
                <label role='button' className={` px-3 h-[40px] relative z-20 ${image || defaultValue ? "bg-primary text-white " : "bg-[#37137F26] text-[#37137F80] " }  flex justify-center items-center rounded-lg font-bold text-sm tracking-[0.5%]  `} >
                    {(image || defaultValue) ? "Change Image" : "Add Image"}
                    <input style={{ display: 'none' }} type="file" accept="image/*" id="input" onChange={handleImageChange} />
                </label>
                {/* </lab/el> */}
                {(image || defaultValue) && (
                    <img className=' h-full w-full rounded-lg absolute inset-0 object-cover ' src={image ? image : defaultValue} alt='logo' />
                )}
                {(image || defaultValue) && (
                    <div className=' h-full w-full rounded-lg absolute inset-0 bg-black bg-opacity-25 ' />
                )}
            </div>

        </div>
    )
} 
