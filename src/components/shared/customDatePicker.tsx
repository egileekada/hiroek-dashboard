import "react-datepicker/dist/react-datepicker.css";
// import { CalendarIcon2 } from "../../svg";
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; 
import { useDatePicker } from "../../global-state/useDatePicker";  

interface IProps {
    name: "endTime" | "eventEndDate";
    disable?: boolean; 
    borderRadius?: string; 
}

export default function CustomDatePicker({ name }: IProps) {


    // const { formState: { errors } } = useFormContext();

    const { startData, endDate, updateEndDate, updateStartDate } = useDatePicker((state) => state) 

    const changeHandler = (item: any) => {  
 
        if (name === "endTime") {
            updateStartDate(item.toISOString())
        } else {
            updateEndDate(item.toISOString())
        }
    }   

    return (
        <div className=" w-full flex flex-col h-[54px] relative !text-primary " >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker 
                    // label={name !== "endTime" ? "End Date": "Start Date"}
                    className=" text-primary "
                    minDate={name === "endTime" ? dayjs() : dayjs(startData)} 
                    defaultValue={dayjs(name === "endTime" ? startData : endDate)}
                    format="ddd, MM/DD/YYYY hh:mm a" 
                    onChange={(item) => changeHandler(item)} 

                />
            </LocalizationProvider>
            {/* {errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{errors[name]?.message as string}</Text>} */}
        </div>
    )
}

