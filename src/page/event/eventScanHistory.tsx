import { Text } from "@radix-ui/themes";
import { BackArrowIcon } from "../../svg";


export default function EventScanHistory() {
    return (
        <div className=' w-full ' >
            <div className=" w-full flex sticky top-0 flex-col bg-white gap-1 pb-2 h-[20vh] rounded-t-3xl pt-3 lg:px-3 px-4  " >
                <div className=" w-full flex items-center justify-center " >
                    <div className=' w-fit lg:hidden absolute left-4 ' >
                        <div role='button' className=' w-11 h-11 lg:w-[62px] lg:h-[62px] flex justify-center bg-primary bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                            <BackArrowIcon />
                        </div>
                    </div>
                    <Text className=" text-[28px] font-black text-primary " >Chat Support</Text>
                </div>
            </div>
        </div>
    )
}
