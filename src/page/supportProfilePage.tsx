import { Text } from "@radix-ui/themes";
import PageHeader from "../components/shared/pageHeader";
import { CallIcon, HelpIcon, MailIcon, MeetingIcon, SupportIcon } from "../svg";
import { IoIosArrowDown } from "react-icons/io";

export default function SupportPage() {
    return (
        <div className=' w-full flex flex-col gap-6 py-4 ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader notification={true} second={true} back={true} header="Contact Support" body="" />
            </div>
            <div className=" w-full flex flex-col gap-4 " >
                <div className=" w-full max-w-[400px] flex flex-col gap-4 px-4  " >
                    <div role="button" className=" w-full flex gap-2 items-center " >
                        <div className=" w-fit " >
                            <SupportIcon width="24" />
                        </div>
                        <div className=" flex flex-col " >
                            <Text className=" text-sm font-bold text-primary " >Contact Us On:</Text>
                        </div>
                    </div> 
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >Phone Support</Text>
                        <CallIcon />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >Email Support</Text>
                        <MailIcon />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >Live Chat</Text>
                        <MeetingIcon />
                    </div>
                </div>
                <div className=" w-full max-w-[400px] flex flex-col gap-4 px-4  " >
                    <div role="button" className=" w-full flex gap-2 items-center " >
                        <div className=" w-fit " >
                            <HelpIcon width="24" />
                        </div>
                        <div className=" flex flex-col " >
                            <Text className=" text-sm font-bold text-primary " >Contact Us On:</Text>
                        </div>
                    </div> 
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >How do i sign up?</Text>
                        <IoIosArrowDown />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >How do i split donations?</Text>
                        <IoIosArrowDown />
                    </div>
                    <div className=" w-full flex items-center justify-between pl-6 " >
                        <Text className=" text-sm text-primary font-semibold " >How do i delete my account?</Text>
                        <IoIosArrowDown />
                    </div>
                </div>
            </div>
        </div>
    )
}
