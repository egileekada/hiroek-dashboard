import { useFormContext } from "react-hook-form";
import { Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";
import { dateFormat, timeFormat } from "../../utils/dateFormat";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon2 } from "../../svg";
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 


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
    const [open, setOpen] = useState(false)

    const changeHandler = (item: any) => { 
        
        setDate(item.toISOString())
        setValue(name, item.toISOString())
    }

    useEffect(() => {
        setDate(value)
    }, [])  
 
        // <div className=" w-full flex flex-col " > 
        //     <DatePicker
        //         id={name}
        //         // value={}
        //         // disabled={name === "End" && !eventdata.startDate}
        //         selected={value ? new Date(value) : new Date()}
        //         dateFormat="MMM d, yyyy h:mm aa"
        //         showTimeSelect
        //         minDate={(name === "eventEndDate") ? (payload.endTime ? new Date(payload.endTime) : new Date()) : new Date()}
        //         onChange={changeHandler}
        //         customInput={<CustomInput />}
        //     />

        console.log(payload);
        

    return (
        <div className=" w-full flex flex-col h-[54px] relative " > 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    open={open} 
                    disablePast
                    onOpen={() => setOpen(true)} 
                    onClose={() => setOpen(false)}
                    label="Select date"
                    onChange={(item)=> changeHandler(item)}
                    slots={{
                        textField: () => (
                            <div onClick={() => setOpen((prev: boolean) => !prev)} className=" w-full flex flex-1 justify-between items-center text-sm text-primary px-3 gap-2 border-[2px] border-opacity-30 rounded-[8px] !h-[54px] border-[#37137F] " >
                                {date ? dateFormat(date) + " " + timeFormat(date) : "Select Date And Time"}
                                <CalendarIcon2 />
                            </div>
                        ),
                    }}
                />
            </LocalizationProvider>
            {errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{errors[name]?.message as string}</Text>}
        </div>
    )
}

