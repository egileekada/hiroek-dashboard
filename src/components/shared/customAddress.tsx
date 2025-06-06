// import { TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react"; 
import { Text } from "@radix-ui/themes";
import { useMap } from "../../global-state/useMapStore";
import ModalLayout from "./modalLayout";
import MapWithClickMarker from "./map_component/newMap"; 


interface IProps {
    isPassword?: boolean;
    name: string;
    type: "number" | "text" | "email" | "date" | "password" | "search" | "time" | "hidden" | "datetime-local" | "month" | "tel" | "url" | "week" | undefined
    placeholder: string,
    disable?: boolean
    value?: any,
    textColor?: string;
    borderRadius?: string,
    setValue?: any, 
    touched?: any,
    errors?: any
}

export default function CustomAddress({ name, type, placeholder, disable, value, borderRadius, setValue, errors, touched }: IProps) {

    const [defaultValue, setDefaultValue] = useState(value + "")
    // const { formState: { errors } } = useFormContext();
    const { address } = useMap((state) => state);
    const [open, setOpen] = useState(false)

    const changeHandler = (item: string) => {
        setValue(name, item)
        setDefaultValue(item)
    }

    useEffect(() => {
        setValue(name, address)
        setDefaultValue(address)
    }, [address])

    return (
        // <TextField.Root size="3" placeholder={placeholder} name={name} type={type} disabled={disable} value={value} />
        <>
            <div >
                <div className=" w-full h-[54px] relative " >
                    <input
                        onClick={() => setOpen(true)}
                        onChange={(e) => changeHandler(e.target?.value)} 
                        type={type} style={{ borderRadius: borderRadius ?? "5px" }} placeholder={placeholder} disabled={disable} value={defaultValue} name={name} className=" h-[54px] px-3 border-[#37137F] border-opacity-30 border-[2px] outline-none hover:border-[#37137F80] active:border-[#37137F80] focus:border-[#37137F80] bg-transparent w-full text-sm font-medium text-primary " />
                </div> 

                {touched[name] && errors[name] && <Text className=" text-left text-xs text-red-500 font-medium -mt-1 " >{errors[name]}</Text>}
                {/* {errors[name] && <Text className=" text-left text-xs text-red-500 font-medium -mt-1 " >{errors[name]?.message as string}</Text>} */}

                <ModalLayout width="600px" open={open} setOpen={setOpen} > 
                    <MapWithClickMarker setOpen={setOpen} /> 
                </ModalLayout>
            </div>
        </>
    )
}

