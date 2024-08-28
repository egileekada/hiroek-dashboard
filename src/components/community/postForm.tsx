import { MultipleGalleryIcon } from "../../svg";


export default function PostForm() {
    return (
        <div className=" w-full " >
            <div className=" w-full max-w-[600px] flex flex-col gap-1 lg:px-0 px-4  " > 
                <div className=" w-full h-[300px] relative " >
                    <textarea placeholder="Type community description here. . ." className=" h-full lg:h-[300px] p-3 border-[#37137F80] border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-semibold text-primary " />
                    <button className=" absolute lg:flex hidden bottom-2 right-2 w-fit text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[44px] px-[14px] items-center justify-center h-[40px] text-primary " >
                        <MultipleGalleryIcon />
                        Add Image
                    </button>
                </div>
            </div>
        </div>
    )
}
