import { useState } from "react";
import { MultipleGalleryIcon } from "../../svg";
import Editor from 'react-simple-wysiwyg';


export default function PostForm() { 
    
    const [html, setHtml] = useState('');

    function onChange(e: any) {
        setHtml(e.target.value);
    }

    return (
        <div className=" w-full " >
            <div className=" w-full max-w-[600px] flex flex-col gap-1 lg:px-0 px-4  " >
                <div className=" w-full h-full relative !text-primary " >
                    <Editor className=" w-full h-[50vh] " value={html} onChange={onChange} />
                    <button className=" absolute lg:flex hidden bottom-2 right-2 w-fit text-sm font-semibold bg-primary30 bg-opacity-15 gap-2 rounded-[44px] px-[14px] items-center justify-center h-[40px] text-primary " >
                        <MultipleGalleryIcon />
                        Add Image
                    </button>
                </div>
            </div>
        </div>
    )
}
