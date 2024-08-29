import { CustomButton } from "../../components/shared";
import PageHeader from "../../components/shared/pageHeader";
import { SendIcon } from "../../svg";


export default function PostReportPage() {
    return (
        <div className=' w-full h-full relative flex flex-col gap-6 ' >

            <div className=" w-full flex items-center justify-between " >
                <PageHeader back={true} header="Add New Impact Report" body="Effortless Event Creation and Community Engagement." />
                <div className=" lg:block hidden w-fit "> 
                        <CustomButton hasFrontIcon={true} icon={
                            <SendIcon color="white" size="24px" />
                        } >
                            Save Report
                        </CustomButton> 
                </div>
            </div>
            <div className=" lg:max-w-[600px] w-full h-full lg:px-0 px-4 " >
                <textarea className=" w-full h-full p-4 border rounded-md " placeholder="Start Typing Here" />
            </div>
        </div>
    )
}
