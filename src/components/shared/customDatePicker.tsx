import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import { Text } from ".";

interface IProps {
    name: string; // formik field name
    label?: string;
    disable?: boolean;
    borderRadius?: string;
    height?: number | string;
    showTime?: boolean; // 👈 toggle for date vs datetime
}

export default function CustomDatePicker({
    name,
    label,
    disable,
    borderRadius,
    height = 40,
    showTime = true,
}: IProps) {

    const { setFieldValue } = useFormikContext<any>();
    const [field, meta] = useField(name);

    const changeHandler = (item: any) => {
        if (!item) {
            setFieldValue(name, ""); // clear
            return;
        }
        setFieldValue(name, item.toISOString());
    }; 

    const commonProps = {
        disabled: disable,
        value: field.value ? dayjs(field.value) : null,
        onChange: changeHandler,
        slotProps: {
            textField: {
                sx: {
                    height: height,
                    "& .MuiInputBase-root": {
                        height: height,
                        borderRadius: borderRadius ?? "8px",
                        fontSize: 14,
                        padding: "0 8px",
                    },
                    "& input": {
                        padding: "8px 0",
                    },
                },
                error: Boolean(meta.touched && meta.error),
                helperText: meta.touched && meta.error ? meta.error : "",
            },
        },
    };

    return (
        <div className="w-full flex flex-col relative">
            {label && (
                <label className="mb-1 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {showTime ? (
                    <DateTimePicker {...commonProps} format="ddd, MM/DD/YYYY hh:mm a" />
                ) : (
                    <DatePicker {...commonProps} format="ddd, MM/DD/YYYY" />
                )}
            </LocalizationProvider>
            {meta.touched && meta.error && (
                <Text className="text-left text-xs text-red-500 font-medium -mt-1">
                    {meta.error}
                </Text>
            )}
        </div>
    );
}
