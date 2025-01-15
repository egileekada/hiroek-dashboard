import React from 'react'


interface IProps {
    type: "number" | "text" | "email" | "date" | "password" | "search" | "time" | "hidden" | "datetime-local" | "month" | "tel" | "url" | "week" | undefined
    placeholder: string,
    disable?: boolean
    value?: any,
    textColor?: string;
    icon?: React.ReactNode;
    hasIcon?: boolean;
    hasLeftIcon?: boolean;
    borderRadius?: string,
    onclick?: () => void,
    color?: string,
    borderColor?: string,
    borderWidth?: string,
    changeHandler: any
}

export default function ChatInput({ changeHandler, type, placeholder, disable, value, icon, hasIcon, hasLeftIcon, borderRadius, onclick, color, borderColor, borderWidth }: IProps) {
    return (
        <div className=" w-full h-[54px] relative " >
            <input
                onChange={(e) => changeHandler(e.target?.value)}

                type={type} style={{ borderRadius: borderRadius ?? "5px", color: color ?? "#37137f", borderColor: borderColor ?? "#37137F80", borderWidth: borderWidth ?? "2px" }} placeholder={placeholder} disabled={disable} value={value} className={` ${hasLeftIcon ? " pl-[40px] " : " "} h-[54px] px-3 outline-none bg-transparent w-full text-sm font-medium `} />

            {(hasIcon) && (
                <div onClick={onclick} role="button" className=" absolute w-fit cursor-pointer right-0 top-0 pr-2 " >
                    <div className=" w-[30px] h-[54px] flex justify-center items-center " >
                        {icon}
                    </div>
                </div>
            )}
        </div>
    )
}
