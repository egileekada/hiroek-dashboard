import { Select, Text } from '@radix-ui/themes'
import { IInterest } from '../../model/interest' 

interface IProps {
    changeHandler?: (by: string) => void;
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

    return (
        <div className=' flex flex-col ' > 
            <Select.Root value={value} onValueChange={changeHandler} size={"3"} >
                <Select.Trigger placeholder={placeholder} />
                <Select.Content >
                    {list?.length > 0 && (
                        <Select.Group >
                            {list?.map((item: string, index: number) => {
                                return (
                                    <Select.Item key={index} value={item} ><p className=' !text-primary ' >{item}</p></Select.Item>
                                )
                            })}
                        </Select.Group>
                    )}
                    {interest?.length > 0 && (
                        <Select.Group >
                            {interest?.map((item, index) => {
                                return (
                                    <Select.Item key={index} value={item?._id} ><p className=' !text-primary ' >{item?.name}</p></Select.Item>
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
