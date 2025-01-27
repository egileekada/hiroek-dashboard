import { CustomButton } from '../shared'
import { Text } from '@radix-ui/themes'
import { textLimit } from '../../utils/textlimit'
import useGetEventData from '../../hooks/eventHooks/useGetEventData'
import { useFieldArray } from 'react-hook-form'
import Cookies from "js-cookie"

export default function OrganizationCardWithId({ index, control, name, value }: { index: string, control: any, name: string, value: any }) {

    const { data: item, isLoading } = useGetEventData().getOrganizationById(index)
    const userId = Cookies.get("user-index")

    const { remove, append } = useFieldArray({
        control,
        name: name, // Name of the array in your form
    });  
    

    return (
        <>
            {!isLoading && (
                <div className=" w-full flex items-center py-2 gap-3 " >
                    {item?.logo ? (
                        <div className=" w-fit " >
                            <img className=" w-10 h-10 rounded-lg object-cover " src={item?.logo} alt={item?.name} />
                        </div>
                    ) : (
                        <div className=" w-fit h-fit " >
                            <div className=" w-10 h-10 rounded-lg bg-red-400 shadow-md flex justify-center items-center " >
                                <Text className=" text-[8px] "  >No Media</Text>
                            </div>
                        </div>
                    )}
                    <div className=" flex flex-col gap-2 " >
                        <Text className=" font-semibold text-sm " >{textLimit(item?.name, 40)}</Text>
                        <Text className=" font-semibold text-sm " >{item?.email}</Text>
                    </div>
                    {userId !== item?._id && (
                        <div className=" ml-auto flex gap-3 " >
                        {value?.includes(item?._id) ?
                            <CustomButton onClick={() => remove(value?.indexOf(item?._id))} bgColor="red" height="40px" fontSize="14px" >Remove</CustomButton> :
                            <CustomButton onClick={() => append(item?._id, { shouldFocus: false })} bgColor="green" height="40px" fontSize="14px" >Add</CustomButton>
                        }
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
