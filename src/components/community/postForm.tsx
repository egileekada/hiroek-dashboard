import { MultipleGalleryIcon } from "../../svg";
import Editor from 'react-simple-wysiwyg';
import { CustomButton } from "../shared";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import { IoTrashBin } from "react-icons/io5" 
// import { useState } from "react";
// import ModalLayout from "../shared/modalLayout";
// import { useState } from "react"; 


export default function PostForm() { 

    const { images, setImages, loadingCreatePost, loadingCreateAnnocement, content, setContent, submit} = useCommunity()
 
    function onChange(item: any) { 
        setContent(item?.target?.value) 
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setImages([...images, ...Array.from(files)]);
        }
    };


    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };  

    return (
        <div className=" w-full " >
            <div className=" w-full max-w-[600px] flex flex-col gap-1 lg:px-0 px-4  " >
                <div className=" w-full h-full relative flex flex-col gap-4 !text-primary pb-6 " > 
                    <Editor value={content} className=" w-full h-[50vh] " onChange={onChange} /> 
                    {/* {postformState?.errors["content"] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{postformState?.errors["content"]?.message as string}</Text>} */}
                    <div className=" w-full flex gap-4 flex-wrap " >
                        {images.map((image, index) => (
                            <div key={index} className=" flex w-[120px] text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[16px] flex-col items-center justify-center h-[100px] text-primary ">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)} // Cleanup memory
                                    style={{ objectFit: "cover" }}
                                    className=" w-full h-full rounded-2xl "
                                />
                                <button className=" absolute inset-auto " onClick={() => removeImage(index)}>
                                    <IoTrashBin size={"25px"} color="red" />
                                </button>
                            </div>
                        ))}
                        <label role="button" className=" flex w-[120px] text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[16px] flex-col px-[14px] items-center justify-center h-[100px] text-primary " >
                            <MultipleGalleryIcon />
                            Add Image
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={handleImageChange}
                            />

                        </label>
                    </div>
                    <CustomButton loading={loadingCreatePost || loadingCreateAnnocement} type="button" onClick={()=> submit()} className=" items-center " width="100%" hasIcon={true} >
                        {"Create New Post"}
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}
