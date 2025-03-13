import { MultipleGalleryIcon } from "../../svg"; 
import { CustomButton } from "../shared";
import useCommunity from "../../hooks/communityHooks/useCommunity";
import { IoTrashBin } from "react-icons/io5"
import { TextArea } from "@radix-ui/themes";
import PageHeader from "../shared/pageHeader";
// import { useState } from "react";
// import ModalLayout from "../shared/modalLayout";
// import { useState } from "react"; 


export default function PostForm() {

    const { images, setImages, loadingCreatePost, loadingCreateAnnocement, content, setContent, submit, index } = useCommunity()

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
        <div className=" w-full  flex flex-col gap-4" >
            <div className=" w-full flex justify-between items-center pr-2 " >
                <PageHeader back={true} header="" body="" />

                <div className=" -mt-5 lg:mt-0 " >
                <CustomButton loading={loadingCreatePost || loadingCreateAnnocement} type="button" onClick={() => submit()} className=" items-center " width={index ? "200px" : "170px"} rounded="999px" hasFrontIcon={true} >
                    {index? "Publish Broadcast" : "Publish Post"}
                </CustomButton>
                </div>
            </div>
            <div className=" w-full max-w-[full] flex flex-col gap-1 lg:px-0 px-4  " >
                <div className=" w-full h-full relative flex flex-col gap-4 !text-primary pb-6 " >
                    {/* <Editor value={content} className=" w-full h-[50vh] " onChange={onChange} />  */}
                    <TextArea value={content} className=" w-full h-[50vh] " onChange={onChange} placeholder="What's on your mind?" />
                    {/* {postformState?.errors["content"] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{postformState?.errors["content"]?.message as string}</Text>} */}
                    {images?.length === 0 && (
                        <label role="button" className=" flex w-full text-sm font-semibold bg-[#37137F26] bg-opacity-15 gap-2 rounded-[16px] px-[14px] items-center justify-center h-[64px] text-primary " >
                            <MultipleGalleryIcon />
                            Add Image(s)
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange}
                                />
                        </label>
                    )}
                    <div className=" w-full flex gap-4 flex-wrap " >
                        {images.map((image, index) => (
                            <div key={index} className=" flex w-[64px] text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[16px] flex-col items-center justify-center h-[64px] text-primary ">
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
                        {images?.length > 0 && (
                            <label role="button" className=" flex w-[64px] text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[16px] flex-col px-[14px] items-center justify-center h-[64px] text-primary " >
                                <MultipleGalleryIcon />
                                {/* Add Image */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    hidden
                                    onChange={handleImageChange}
                                />

                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
