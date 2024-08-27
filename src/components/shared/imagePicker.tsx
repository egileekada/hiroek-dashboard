import { Text } from '@radix-ui/themes' 
import { GalleryIcon } from '../../svg'

export default function ImagePicker() {
    return (
        <div className=" w-full p-5 flex flex-col gap-4 " style={{ boxShadow: "0px 4px 30px 0px #2E2D740D" }}  >
            <div className=" w-full border border-[#37137F4D] rounded-lg border-dashed h-[200px] gap-2 flex flex-col justify-center items-center " >
                <div className=" w-11 h-11 flex justify-center items-center bg-[#37137F26] rounded-lg " >
                    <GalleryIcon />
                </div>
                <Text className=" tracking-[0.5%] text-sm text-[#858D9D] " >Drag and drop image here, or click add image</Text>
                <button className=" px-3 h-[40px] bg-[#37137F26] rounded-lg text-[#37137F80] font-bold text-sm tracking-[0.5%]  " >Add Image</button>
            </div>
        </div>
    )
}