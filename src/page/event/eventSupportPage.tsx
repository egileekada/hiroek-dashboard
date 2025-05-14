import { useState } from "react";
import { EventSupport } from "../../components/event";
import PageHeader from "../../components/shared/pageHeader"; 
import { useParams, useSearchParams } from "react-router-dom";


export default function EventSupportPage() {

    const [tab, setTab] = useState(false) 
    const { id } = useParams();
    const [searchParams] = useSearchParams(); 
    const index = searchParams.get("message");
    const member = searchParams.get("member");

    return (
        <div className=' w-full h-full flex flex-col gap-6 lg:pt-0 pt-4  ' >
            <div className={` w-full ${tab ? " lg:block hidden " : ""} `} > 
                <PageHeader back={true} path={member? `/dashboard/event/details/bymembers/${id}` : index ? `/dashboard/message` : `/dashboard/event/details/${id}`} header="Event Messages" body="View & respond to messages from your supporters" /> 
            </div>
            <EventSupport tab={tab} setTab={setTab} />
        </div>
    )
}
