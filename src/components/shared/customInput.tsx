// import { TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { EyeIcon } from "../../svg";
import { useFormContext } from "react-hook-form";
import { Text } from "@radix-ui/themes";


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
    hasLeftIcon?: boolean;
    borderRadius?: string,
    textarea?: boolean,
    onclick?: () => void,
    edit?: boolean,
    setValue?: any
    color?: string,
    borderColor?: string,
    borderWidth?: string
}

export default function CustomInput({ isPassword = false, name, textarea, type, placeholder, disable, value, icon, hasIcon, hasLeftIcon, borderRadius, onclick, edit, setValue, color, borderColor, borderWidth }: IProps) {

    const [showText, setShowText] = useState(type)
    const [defaultValue, setDefaultValue] = useState("")
    const { register, formState: { errors } } = useFormContext();

    useEffect(()=> {
        setDefaultValue(value)
    }, [])

    const clickHandler = () => {
        setShowText((prev) => prev === "text" ? "password" : "text")
    }

    const changeHandler = (item: any) => {
        setValue(name, item)
        setDefaultValue(item)
    }

    return (
        // <TextField.Root size="3" placeholder={placeholder} name={name} type={type} disabled={disable} value={value} />
        <>
            {!edit && (
                <div>
                    {textarea && (
                        <textarea
                            {...register(name, {
                                required: true,
                                pattern: /^[A-Za-z]+$/i
                            })} value={value} name={name} placeholder={placeholder} style={{ borderRadius: borderRadius ?? "5px" }} className=" h-[111px] p-3 border-[#37137F] border-opacity-30 outline-none border-[2px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-medium text-primary " />
                    )}
                    {!textarea &&

                        <div className=" w-full h-[54px] relative " >
                            <input
                                {...register(name, {
                                    required: true,
                                    pattern: /^[A-Za-z]+$/i
                                })}
                                type={showText} style={{ borderRadius: borderRadius ?? "5px", color: color ?? "#37137f", borderColor: borderColor ?? "#37137F80", borderWidth: borderWidth ?? "2px" }} placeholder={placeholder} disabled={disable} value={type === "date" ? new Date(value).toISOString().split('T')[0] : value} name={name} className={` ${hasLeftIcon ? " pl-[40px] " : " "} h-[54px] px-3 outline-none bg-transparent w-full text-sm font-medium `} />
                            {(isPassword) && (
                                <div role="button" onClick={clickHandler} className={` ${showText === "password" ? "" : "opacity-20"} w-[30px] pr-2 h-[54px] flex justify-center items-center absolute right-0 top-0 `} >
                                    <EyeIcon />
                                </div>
                            )}
                            {(!isPassword && hasIcon) && (
                                <div onClick={onclick} role="button" className=" absolute w-fit cursor-pointer right-0 top-0 pr-2 " >
                                    <div className=" w-[30px] h-[54px] flex justify-center items-center " >
                                        {icon}
                                    </div>
                                </div>
                            )}
                            {(!isPassword && hasLeftIcon) && (
                                <div onClick={onclick} role="button" className=" absolute w-fit cursor-pointer left-0 top-0 pr-2 " >
                                    <div className=" w-[30px] h-[54px] flex justify-center items-center " >
                                        {icon}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    {errors[name] && <Text className=" text-left text-xs text-red-500 font-medium -mt-1 " >{errors[name]?.message as string}</Text>}
                </div>
            )}
            {edit && (
                <div>
                    {textarea && (
                        <textarea
                            onChange={(e) => changeHandler(e.target?.value)}
                            value={defaultValue}  style={{ borderRadius: borderRadius ?? "5px" }} name={name} placeholder={placeholder} className=" h-[111px] p-3 border-[#37137F] border-opacity-30 outline-none border-[2px] hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] rounded-[10px] bg-transparent w-full text-sm font-medium text-primary " />
                    )}
                    {!textarea &&

                        <div className=" w-full h-[54px] relative " >
                            <input
                                onChange={(e) => changeHandler(e.target?.value)}
                                type={showText} style={{ borderRadius: borderRadius ?? "5px", color: color ?? "#37137f", borderColor: borderColor ?? "#37137F80", borderWidth: borderWidth ?? "2px" }} placeholder={placeholder} disabled={disable} value={type === "date" ? new Date(defaultValue).toISOString().split('T')[0] : defaultValue} name={name} className={` ${hasLeftIcon ? " pl-[40px] " : " "} h-[54px] px-3 outline-none bg-transparent w-full text-sm font-medium `} />
                            {(isPassword) && (
                                <div role="button" onClick={clickHandler} className=" w-[30px] pr-2 h-[54px] flex justify-center items-center absolute right-0 top-0 " >
                                    <EyeIcon />
                                </div>
                            )}
                            {(!isPassword && hasIcon) && (
                                <div onClick={onclick} role="button" className=" absolute w-fit cursor-pointer right-0 top-0 pr-2 " >
                                    <div className=" w-[30px] h-[54px] flex justify-center items-center " >
                                        {icon}
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    {errors[name] && <Text className=" text-left text-xs text-red-500 font-medium -mt-1 " >{errors[name]?.message as string}</Text>}
                </div>
            )}
        </>
    )
}

