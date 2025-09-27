// import { CustomButton } from '../shared'
import { Text } from '@radix-ui/themes'
import { textLimit } from '../../utils/textlimit'
import useGetEventData from '../../hooks/eventHooks/useGetEventData'
import { IoIosClose } from 'react-icons/io'
// import { useFieldArray } from 'react-hook-form'
import Cookies from "js-cookie"

export default function OrganizationCardWithId({ index, }: { index: string, name: string, value?: any }) {

    const { data: item, isLoading } = useGetEventData().getOrganizationById(index)
    const userId = Cookies.get("user-index") as string

    // const { remove, append } = useFieldArray({
    //     control,
    //     name: name, // Name of the array in your form
    // });  


    return (
        <>
            {!isLoading && (
                <div className=" w-full flex items-center py-2 gap-3 shadow-md border rounded-full px-4  " >
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
                        {/* <Text className=" font-semibold text-sm " >{item?.email}</Text> */}
                    </div>
                    {userId !== index && (
                        <div className=' ml-auto cursor-pointer ' >
                            <IoIosClose color='red' size={"30px"} />
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
