import { DropdownMenu, Text } from '@radix-ui/themes'
import { IInterest } from '../../model/interest'
import { useState } from 'react';
import ModalLayout from './modalLayout';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface IProps {
    changeHandler?: any;
    list?: Array<string>;
    interest?: Array<IInterest>;
    placeholder: string,
    name: string,
    formState: any,
    value?: string,
    rounded?: string
}

export default function CustomSelect(props: IProps) {

    const {
        changeHandler,
        list = [],
        placeholder,
        value,
        name,
        formState,
        // rounded
    } = props

    const [defaultData, setDefaultData] = useState(value)

    const clickhandler = (item: string) => {
        setDefaultData(item)
        changeHandler(name, item)
        setOpen(false)
        setOpenModal(false)

        console.log(item);
        
    }

    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState("")

    const extractActivities = (inputString: any) => {
        if (typeof inputString !== "string") {
            throw new Error("Input must be a string");
        }

        const activities = inputString.split('",').map(activity => activity.trim().replace(/"/g, "")); // Split and clean input

        const result = activities.map(activity => {
            const [name, values] = activity.split(" ("); // Split by the first "("
            const items = values.replace(")", "").split(",").map(item => item.trim()); // Extract values into an array
            return {
                name: name.trim(),
                values: items
            };
        });

        return result;
    }; 


    return (
        <>
            <div className=' w-full md:flex hidden birder flex-col placeholder:text-white relative ' >
                <div onClick={() => setOpen(true)} className=' w-full px-4 flex justify-between h-[54px] text-sm rounded-lg border-primary bg-primary text-white border-2 items-center gap-4 ' >
                    {defaultData ? defaultData : placeholder}
                    <div className=' w-fit ' >
                        <DropdownMenu.TriggerIcon />
                    </div>
                </div>
                {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>}
            </div>
            <div className=' w-full md:hidden flex birder flex-col !bg-primary placeholder:text-white relative ' >
                <div onClick={() => setOpenModal(true)} className=' w-full px-4 flex justify-between h-[54px] text-sm rounded-lg border-primary bg-primary text-white border-2 items-center gap-4 ' >
                    {defaultData ? defaultData : placeholder}
                    <div className=' w-fit ' >
                        <DropdownMenu.TriggerIcon />
                    </div>
                </div>
                {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>}
            </div>
            <ModalLayout height='100vh' width=' max-w-[400px] ' open={open} setOpen={setOpen} >
                <div className=' w-full h-full flex flex-col gap-4 py-4  ' >
                    <Text className=' text-[18px] text-primary font-bold w-[80%] mx-auto text-center ' >Select your Preferred Category for The Event</Text>
                    <div className=' w-full overflow-y-auto ' >
                        <div className=' h-auto flex flex-col gap-1 w-full ' >
                            {list?.map((item: string, index: number) => {
                                return (
                                    <div key={index} className=' w-full flex flex-col px-2 ' >
                                        {item?.includes("(") ?
                                            <div role='button' onClick={() => setSelected((prev) => prev === extractActivities(item)[0]?.name ? "" : extractActivities(item)[0]?.name)} className=' text-sm flex items-center h-[54px] w-full justify-between font-semibold ' key={index} >
                                                {extractActivities(item)[0]?.name + ""}
                                                {selected !== extractActivities(item)[0]?.name ?
                                                    <IoIosArrowDown size={"20px"} /> :
                                                    <IoIosArrowUp size={"20px"} />
                                                }
                                            </div> :
                                            <div role='button' onClick={() => clickhandler(item)} className=' text-sm flex items-center h-[54px] font-semibold ' key={index} >
                                                {item}
                                            </div>
                                        }
                                        {item?.includes("(") && (
                                            <>
                                                {selected === extractActivities(item)[0]?.name && (
                                                    <div className=' flex flex-col px-4 gap-2 ' >
                                                        {extractActivities(item)[0]?.values?.map((subitem, subindex) => {
                                                            return (
                                                                <div role='button' onClick={() => clickhandler((extractActivities(item)[0]?.name).toString() + " " + subitem)} key={subindex} className=' text-sm w-full py-2  ' >
                                                                    {subitem}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </ModalLayout>

            <ModalLayout height='100%' width=' max-w-full ' open={openModal} setOpen={setOpenModal} >
                <div className=' w-full h-full flex flex-col gap-4 py-4  ' >
                    <Text className=' text-[18px] text-primary font-bold w-[80%] mx-auto text-center ' >Select your Preferred Category for The Event</Text>
                    <div className=' w-full overflow-y-auto ' >
                        <div className=' h-auto flex flex-col gap-1 w-full ' >
                            {list?.map((item: string, index: number) => {
                                return (
                                    <div key={index} className=' w-full flex flex-col px-2 ' >
                                        {item?.includes("(") ?
                                            <div role='button' onClick={() => setSelected((prev) => prev === extractActivities(item)[0]?.name ? "" : extractActivities(item)[0]?.name)} className=' text-sm flex items-center h-[54px] w-full justify-between font-semibold ' key={index} >
                                                {extractActivities(item)[0]?.name + ""}
                                                {selected !== extractActivities(item)[0]?.name ?
                                                    <IoIosArrowDown size={"20px"} /> :
                                                    <IoIosArrowUp size={"20px"} />
                                                }
                                            </div> :
                                            <div role='button' onClick={() => clickhandler(item)} className=' text-sm flex items-center h-[54px] font-semibold ' key={index} >
                                                {item}
                                            </div>
                                        }
                                        {item?.includes("(") && (
                                            <>
                                                {selected === extractActivities(item)[0]?.name && (
                                                    <div className=' flex flex-col px-4 gap-2 ' >
                                                        {extractActivities(item)[0]?.values?.map((subitem, subindex) => {
                                                            return (
                                                                <div role='button' onClick={() => clickhandler(extractActivities(item)[0]?.name + " " + subitem)} key={subindex} className={`  text-sm w-full py-2  `} >
                                                                    {subitem}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}
