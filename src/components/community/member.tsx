import { Text } from "@radix-ui/themes"
import useGetMembers from "../../hooks/communityHooks/useGetMembers"
import LoadingAnimation from "../shared/loadingAnimation"
import { CustomButton } from "../shared"
import { useState } from "react"


export default function ComunityMember() {

    const { data, isLoading } = useGetMembers().getMemberData()
    const { data: moderator, isLoading: loading } = useGetMembers().getModeratorData()
    const { addModerator, removeModerator } = useGetMembers()

    const [currentId, setCurrentId] = useState("")

    const removeHandler = (item: string) => {
        setCurrentId(item)
        removeModerator?.mutate({
            memberId: item
        })
    }
    const addHandler = (item: string) => {
        setCurrentId(item)
        addModerator?.mutate({
            memberId: item
        })
    }

    return (
        <div className=" w-full flex flex-col gap-4 " >
            <div className=" max-w-[564px] w-full flex lg:px-0 px-4 flex-col " >
                <div className=" w-full flex flex-col gap-3 " >
                    <Text className=" text-primary text-opacity-50 font-bold text-xs " >Moderators</Text>
                    <LoadingAnimation loading={loading} >
                        <div className=" w-full flex flex-col gap-3 " >
                            {moderator?.map((item, index) => {
                                return (
                                    <div key={index} className=" w-full flex flex-row items-center justify-between " >
                                        <div className=" w-full flex flex-row gap-2 items-center " >
                                            <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >
                                                <img src={item?.photo} alt={item?.photo} className=" w-full h-full object-cover rounded-full " />
                                            </div>
                                            <Text className=" text-xs font-bold tracking-[1%] text-primary " >{item?.fullname}</Text>
                                        </div>
                                        <CustomButton onClick={() => removeHandler(item?._id)} loading={removeModerator?.isLoading && item?._id === currentId} bgColor="#CE4646" width="130px" height="40px" rounded="999px" fontSize="12px" >Remove</CustomButton>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                </div>
                <div className=" w-full flex flex-col gap-3 mt-6 " >
                    <Text className=" text-primary text-opacity-50 font-bold text-xs " >Members</Text>
                    <LoadingAnimation loading={isLoading} >
                        <div className=" w-full flex flex-col gap-3 " >
                            {data?.map((item, index) => {
                                return (
                                    <div key={index} className=" w-full flex flex-row items-center justify-between " >
                                        <div className=" w-full flex flex-row gap-2 items-center " >
                                            <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >
                                                <img src={item?.photo} alt={item?.photo} className=" w-full h-full object-cover rounded-full " />
                                            </div>
                                            <Text className=" text-xs font-bold tracking-[1%] text-primary " >{item?.fullname}</Text>
                                        </div>
                                        <CustomButton onClick={() => addHandler(item?._id)} loading={addModerator?.isLoading && item?._id === currentId} bgColor="#E2DCEC" color="#2E008B" width="200px" height="40px" rounded="999px" fontSize="12px" >Assign Moderator</CustomButton>
                                    </div>
                                )
                            })}
                        </div>
                    </LoadingAnimation>
                </div>
            </div>
        </div >
    )
}