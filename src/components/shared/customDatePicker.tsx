import { useFormContext } from "react-hook-form";
import { Text } from "@radix-ui/themes";
import { useState } from "react";


interface IProps {
    name: string;
    disable?: boolean;
    value?: any;
    borderRadius?: string; 
    setValue: any;
}

export default function CustomDatePicker({ name, disable, value, borderRadius, setValue }: IProps) {


    const { formState: { errors } } = useFormContext();

    const [date, setDate] = useState("")

    const changeHandler = (item: any) => {
        setDate(item)
        setValue(name, item)
    }

    return (
        <div>
            <div className=" w-full h-[39px] relative " >
                <input
                    onChange={(e) => changeHandler(e.target?.value)}
                    type={"date"} style={{ borderRadius: borderRadius ?? "5px" }} disabled={disable} value={new Date(date ? date : value).toISOString().split('T')[0]} name={name} className=" h-[39px] px-3 border-[#37137F] border-opacity-30 border-[1.5px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] bg-transparent w-full text-sm font-medium text-primary " />

                {errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold -mt-1 " >{errors[name]?.message as string}</Text>}
            </div>
        </div>
    )
}

