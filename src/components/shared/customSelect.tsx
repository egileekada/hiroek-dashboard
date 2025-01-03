import { DropdownMenu, Text } from '@radix-ui/themes'
import { IInterest } from '../../model/interest'
import { useState } from 'react';

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
        rounded
    } = props

    const [defaultData, setDefaultData] = useState(value)

    const clickhandler = (item: string) => {
        setDefaultData(item)
        changeHandler(name, item)
    }

    return (
        <>
        
        <div className=' w-full md:flex hidden flex-col !text-white placeholder:text-white relative ' >
            {/* <Select.Root value={defaultData} onValueChange={clickhandler}   >
                <Select.Trigger color="gray"  style={{ color: "white", borderRadius: rounded ?? "8px" }} className=' !h-[54px] !bg-primary !text-white placeholder:text-white !font-bold ' placeholder={placeholder} />
                <Select.Content  color="gray" variant="solid" >
                    {list?.length > 0 && (
                        <Select.Group className=' !bg-primary text-white ' >  
                            {list?.map((item: string, index: number) => {
                                return (
                                    <Select.Item key={index} value={item} className=' !h-8 ' ><p className=' !text-white ' >{item}</p></Select.Item>
                                )
                            })}
                        </Select.Group>
                    )}
                    {interest?.length > 0 && (
                        <Select.Group className=' !bg-primary text-white ' >
                            {interest?.map((item, index) => {
                                return (
                                    <Select.Item key={index} value={item?._id} ><p className=' !text-white ' >{item?.name}</p></Select.Item>
                                )
                            })}
                        </Select.Group>
                    )}
                </Select.Content>
            </Select.Root> */}
            <DropdownMenu.Root >
                <DropdownMenu.Trigger style={{ color: "white", borderRadius: rounded ?? "8px" }} className=' !h-[54px] !bg-primary !text-white placeholder:text-white !font-semibold text-sm ' >
                    <div className=' w-full px-4 flex justify-between items-center gap-4 ' >
                        {defaultData ? defaultData : placeholder}
                        <div className=' w-fit ' >
                            <DropdownMenu.TriggerIcon />
                        </div>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className=' w-full ' >
                    <DropdownMenu.Item onClick={() => clickhandler("")} >{placeholder}</DropdownMenu.Item>
                    {list?.map((item: string, index: number) => {
                        return (
                            <DropdownMenu.Item className={` ${item === defaultData ? " bg-primary text-white " : ""}`} key={index} onClick={() => clickhandler(item)} >{item}</DropdownMenu.Item>
                        )
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>}
        </div>

        <div className=' w-full flex md:hidden flex-col !text-white placeholder:text-white relative ' >
            {/* <Select.Root value={defaultData} onValueChange={clickhandler}   >
                <Select.Trigger color="gray"  style={{ color: "white", borderRadius: rounded ?? "8px" }} className=' !h-[54px] !bg-primary !text-white placeholder:text-white !font-bold ' placeholder={placeholder} />
                <Select.Content  color="gray" variant="solid" >
                    {list?.length > 0 && (
                        <Select.Group className=' !bg-primary text-white ' >  
                            {list?.map((item: string, index: number) => {
                                return (
                                    <Select.Item key={index} value={item} className=' !h-8 ' ><p className=' !text-white ' >{item}</p></Select.Item>
                                )
                            })}
                        </Select.Group>
                    )}
                    {interest?.length > 0 && (
                        <Select.Group className=' !bg-primary text-white ' >
                            {interest?.map((item, index) => {
                                return (
                                    <Select.Item key={index} value={item?._id} ><p className=' !text-white ' >{item?.name}</p></Select.Item>
                                )
                            })}
                        </Select.Group>
                    )}
                </Select.Content>
            </Select.Root> */}
            <DropdownMenu.Root >
                <DropdownMenu.Trigger style={{ color: "white", borderRadius: rounded ?? "8px" }} className=' !h-[54px] !bg-primary !text-white placeholder:text-white !font-semibold text-sm ' >
                    <div className=' w-full px-4 flex justify-between items-center gap-4 ' >
                        {defaultData ? defaultData : placeholder}
                        <div className=' w-fit ' >
                            <DropdownMenu.TriggerIcon />
                        </div>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className=' !w-[90vw] overflow-hidden ' >
                    <DropdownMenu.Item onClick={() => clickhandler("")} >{placeholder}</DropdownMenu.Item>
                    {list?.map((item: string, index: number) => {
                        return (
                            <DropdownMenu.Item className={` ${item === defaultData ? " bg-primary text-white " : ""} ${item?.length >= 35 ? "!h-14" : "" } `} key={index} onClick={() => clickhandler(item)} >{item}</DropdownMenu.Item>
                        )
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
            {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>}
        </div>
        </>
    )
}
