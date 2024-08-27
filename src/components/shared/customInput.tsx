// import { TextField } from "@radix-ui/themes";
import { useState } from "react";
import { EyeIcon } from "../../svg";


interface IProps {
    isPassword?: boolean;
    name: string;
    type: "number" | "text" | "email" | "date" | "password" | "search" | "time" | "hidden" | "datetime-local" | "month" | "tel" | "url" | "week" | undefined
    placeholder: string,
    disable?: boolean
    value?: any,
    ref?: any,
    hint?: null | string;
    textColor?: string;
    icon?: React.ReactNode;
    hasIcon?: boolean;
    borderRadius?: string,
    onclick?: () => void
}

export default function CustomInput({ isPassword = false, name, type, placeholder, disable, value, icon, hasIcon, borderRadius, onclick }: IProps) {

    const [showText, setShowText] = useState(type)

    const clickHandler = () => {
        setShowText((prev) => prev === "text" ? "password" : "text")
    }

    return (
        // <TextField.Root size="3" placeholder={placeholder} name={name} type={type} disabled={disable} value={value} />
        <div className=" w-full h-[45px] relative " >
            <input type={showText} style={{ borderRadius: borderRadius ?? "10px" }} placeholder={placeholder} disabled={disable} value={value} name={name} className=" h-[45px] px-3 border-[#37137F80] border-[1.5px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] bg-transparent w-full text-sm font-semibold text-primary " />
            {(isPassword) && (
                <div role="button" onClick={clickHandler} className=" w-[30px] pr-2 h-[45px] flex justify-center items-center absolute right-0 top-0 " >
                    <EyeIcon />
                </div>
            )}
            {(!isPassword && hasIcon) && (
                <div onClick={onclick} role="button" className=" absolute w-fit cursor-pointer right-0 top-0 pr-2 " >
                    <div className=" w-[30px] h-[45px] flex justify-center items-center " >
                        {icon}
                    </div>
                </div>
            )}
        </div>
    )
}
