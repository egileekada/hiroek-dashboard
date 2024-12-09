import { Select, Text } from '@radix-ui/themes'
import { IInterest } from '../../model/interest'
import { useState } from 'react';

interface IProps {
    changeHandler?: any;
    list?: Array<string>;
    interest?: Array<IInterest>;
    placeholder: string,
    name: string,
    formState: any,
    value?: string
}

export default function CustomSelect(props: IProps) {

    const {
        changeHandler,
        list = [],
        interest = [],
        placeholder,
        value,
        name,
        formState
    } = props

    const [defaultData, setDefaultData] = useState(value)

    const clickhandler = (item: string) => {
        setDefaultData(item)
        changeHandler(name, item)
    }

    return (
        <div className=' flex flex-col !text-white placeholder:text-white ' >
            <Select.Root value={defaultData} onValueChange={clickhandler}   >
                <Select.Trigger style={{ color: "white" }} className=' !h-[54px] !bg-primary !rounded-2xl !text-white placeholder:!text-white !font-bold ' placeholder={placeholder} />
                <Select.Content >
                    {list?.length > 0 && (
                        <Select.Group className=' !bg-primary text-white ' >  
                            {list?.map((item: string, index: number) => {
                                return (
                                    <Select.Item key={index} value={item} ><p className=' !text-white ' >{item}</p></Select.Item>
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
            </Select.Root>
            {formState?.errors[name] && <Text className=" text-left text-xs text-red-500 font-semibold mt-1 " >{formState?.errors[name]?.message as string}</Text>}
        </div>
    )
}
