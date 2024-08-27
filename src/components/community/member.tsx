import { Text } from "@radix-ui/themes"


export default function ComunityMember() {
    return (
        <div className=" w-full flex flex-col gap-4 " >
            <div className=" max-w-[564px] w-full flex flex-col " >
                <div className=" w-full flex flex-col gap-3 " >
                    <Text className=" text-primary text-opacity-50 font-bold text-xs " >Moderators</Text>
                    <div className=" w-full flex flex-col gap-3 " >
                        <div className=" w-full flex flex-row items-center justify-between " >
                            <div className=" w-full flex flex-row gap-2 items-center " >
                                <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >

                                </div>
                                <Text className=" text-xs font-bold tracking-[1%] text-primary " >Tanya Mandal</Text>
                            </div>
                            <button className=" bg-[#CE4646] rounded-[44px] w-fit ] h-[40px] px-4 text-white text-xs font-bold " >Remove</button>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex flex-col gap-3 mt-6 " >
                    <Text className=" text-primary text-opacity-50 font-bold text-xs " >Members</Text>
                    <div className=" w-full flex flex-col gap-3 " >
                        <div className=" w-full flex flex-row items-center justify-between " >
                            <div className=" w-full flex flex-row gap-2 items-center " >
                                <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >

                                </div>
                                <Text className=" text-xs font-bold tracking-[1%] text-primary " >Valentina González</Text>
                            </div>
                            <button className=" bg-primary bg-opacity-15 rounded-[44px] w-[135px] h-[40px] text-[#2E008B] text-xs font-bold " >Add Moderator</button>
                        </div>
                        <div className=" w-full flex flex-row items-center justify-between " >
                            <div className=" w-full flex flex-row gap-2 items-center " >
                                <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >

                                </div>
                                <Text className=" text-xs font-bold tracking-[1%] text-primary " >José Sánchez</Text>
                            </div>
                            <button className=" bg-primary bg-opacity-15 rounded-[44px] w-[135px] h-[40px] text-[#2E008B] text-xs font-bold " >Add Moderator</button>
                        </div>
                        <div className=" w-full flex flex-row items-center justify-between " >
                            <div className=" w-full flex flex-row gap-2 items-center " >
                                <div className=" w-10 h-10 rounded-full border border-primary border-opacity-30 " >

                                </div>
                                <Text className=" text-xs font-bold tracking-[1%] text-primary " >Salma Khan</Text>
                            </div>
                            <button className=" bg-primary bg-opacity-15 rounded-[44px] w-[135px] h-[40px] text-[#2E008B] text-xs font-bold " >Add Moderator</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}