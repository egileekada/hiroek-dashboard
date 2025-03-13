import { useFormContext } from "react-hook-form";
import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { dateFormat, timeFormat } from "../../utils/dateFormat";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon2 } from "../../svg";


interface IProps {
    name: "endTime" | "eventEndDate";
    disable?: boolean;
    value?: any;
    borderRadius?: string;
    setValue: any;
    payload?: any
}

export default function CustomDatePicker({ name, payload, value, setValue }: IProps) {


    const { formState: { errors } } = useFormContext();

    const [date, setDate] = useState("")

    const changeHandler = (item: any) => {
        setDate(item)
        setValue(name, item)
    }

    useEffect(()=> { 
        setDate(value)
    }, [])  


    const CustomInput = ({ value, onClick }: any) => { 
        console.log(value);
        return ( 
            <div onClick={onClick} className=" w-full flex flex-1 justify-between items-center text-sm text-primary px-3 gap-2 border-[2px] border-opacity-30 rounded-[8px] h-[54px] border-[#37137F] " >
                {date ? dateFormat(date)+" "+timeFormat(date) : "Select Date And Time"}
                <CalendarIcon2 />
            </div>
        )
    }

    return (
        <div className=" w-full flex flex-col " > 
            <DatePicker
                id={name}
                // value={}
                // disabled={name === "End" && !eventdata.startDate}
                selected={value ? new Date(value) : new Date()}
                dateFormat="MMM d, yyyy h:mm aa"
                showTimeSelect
                minDate={(name === "eventEndDate") ? (payload?.endTime ? new Date(payload?.endTime) : new Date()) : new Date()}
                onChange={changeHandler}
                customInput={<CustomInput />}
            />
            {errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{errors[name]?.message as string}</Text>}
        </div>
    )
}

