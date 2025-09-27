import { DropdownMenu, Text } from '@radix-ui/themes'
import { IInterest } from '../../model/interest'
import { useEffect, useState } from 'react';
import ModalLayout from './modalLayout';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { ICategories } from '../../hooks/useCategory';

interface IProps {
    changeHandler?: any;
    list?: Array<ICategories>;
    interest?: Array<IInterest>;
    placeholder: string,
    name: string,
    formState?: any,
    value?: any,
    rounded?: string,
    touched?: any,
    errors?: any
}

export default function CustomSelect(props: IProps) {

    const {
        changeHandler,
        list,
        placeholder,
        value,
        name,
        touched,
        errors
        // formState,
        // rounded
    } = props

    const [defaultData, setDefaultData] = useState(value)

    const clickhandler = (item: string) => {
        setDefaultData(item)
        changeHandler(name, item)
        setOpen(false)
        setOpenModal(false) 
    }  

    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [selected, setSelected] = useState("")
 
    const selectHandler = (item: string) => {
        if (item === selected) {
            setSelected("")
        } else {
            setSelected(item)
        }
    }

    function checkForName() {
        for (const item of list || []) {
            // Check subcategories first
            if (item?.subcategories?.length > 0) {
                for (const subitem of item.subcategories) {
                    if (subitem?._id === defaultData) {
                        return subitem.name;
                    }
                }
            }

            // Fallback to checking item itself
            if (item?._id === defaultData) {
                return item.name;
            }
        }

        return "";
    }  

    useEffect(()=> {
        setDefaultData(value)
    }, [value])

    return (
        <>
            <div className=' w-full md:flex hidden birder flex-col gap-1 placeholder:text-white relative ' >
                <div onClick={() => setOpen(true)} className=' w-full px-4 flex justify-between h-[54px] text-sm rounded-lg border-primary bg-primary text-white border-2 items-center gap-4 ' >
                    {defaultData ? checkForName() : placeholder}
                    <div className=' w-fit ' >
                        <DropdownMenu.TriggerIcon />
                    </div>
                </div>
                {touched[name] && errors[name] && <Text className=" text-left text-xs text-red-500 font-medium " >{errors[name]}</Text>} 
                {/* {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>} */}
            </div>
            <div className=' w-full md:hidden flex birder flex-col placeholder:text-white relative ' >
                <div onClick={() => setOpenModal(true)} className=' w-full px-4 flex justify-between h-[54px] text-sm rounded-lg border-primary bg-primary text-white border-2 items-center gap-4 ' >
                    {defaultData ? checkForName() : placeholder}
                    <div className=' w-fit ' >
                        <DropdownMenu.TriggerIcon />
                    </div>
                </div>
                {touched[name] && errors[name] && <Text className=" text-left text-xs text-red-500 font-medium mt-1 " >{errors[name]}</Text>} 
            </div>
            <ModalLayout height='100vh' width=' max-w-[400px] ' open={open} setOpen={setOpen} >
                <div className=' w-full h-full flex flex-col gap-4 py-4  ' >
                    <Text className=' text-[18px] text-primary font-bold w-[80%] mx-auto text-center ' >Select your Preferred Category for The Event</Text>
                    <div className=' w-full overflow-y-auto ' >
                        <div className=' h-auto flex flex-col gap-1 w-full ' >
                            {list?.map((item, index) => {
                                return (
                                    <div key={index} className=' w-full flex flex-col px-2 ' >
                                        {item?.subcategories?.length ?
                                            <div role='button' onClick={() => selectHandler(item?._id)} className=' text-sm flex items-center h-[45px] w-full justify-between font-semibold ' key={index} >
                                                {item?.name}
                                                {selected !== item?._id ?
                                                    <IoIosArrowDown size={"20px"} /> :
                                                    <IoIosArrowUp size={"20px"} />
                                                }
                                            </div> :
                                            <div role='button' onClick={() => clickhandler(item?._id)} className=' text-sm flex items-center h-[45px] font-semibold ' key={index} >
                                                {item?.name}
                                            </div>
                                        }

                                        {item?._id === selected && (
                                            <>
                                                <div className=' flex flex-col px-4 gap-2 ' >
                                                    {item?.subcategories?.map((subitem, subindex) => {
                                                        return (
                                                            <div role='button' onClick={() => clickhandler(item?._id)} key={subindex} className=' text-sm w-full h-[45px] items-center flex ' >
                                                                {subitem?.name}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
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
                            {list?.map((item, index) => {
                                return (
                                    <div key={index} className=' w-full flex flex-col px-2 ' >
                                        {item?.subcategories?.length ?
                                            <div role='button' onClick={() => selectHandler(item?._id)} className=' text-sm flex items-center h-[45px] w-full justify-between font-semibold ' key={index} >
                                                {item?.name}
                                                {selected !== item?._id ?
                                                    <IoIosArrowDown size={"20px"} /> :
                                                    <IoIosArrowUp size={"20px"} />
                                                }
                                            </div> :
                                            <div role='button' onClick={() => clickhandler(item?._id)} className=' text-sm flex items-center h-[45px] font-semibold ' key={index} >
                                                {item?.name}
                                            </div>
                                        }

                                        {item?._id === selected && (
                                            <>
                                                <div className=' flex flex-col px-4 gap-2 ' >
                                                    {item?.subcategories?.map((subitem, subindex) => {
                                                        return (
                                                            <div role='button' onClick={() => clickhandler(item?._id)} key={subindex} className=' text-sm w-full h-[45px] items-center flex   ' >
                                                                {subitem?.name}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
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
