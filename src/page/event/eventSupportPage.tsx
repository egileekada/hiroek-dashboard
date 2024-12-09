import { useState } from "react";
import { EventSupport } from "../../components/event";
import PageHeader from "../../components/shared/pageHeader";


export default function EventSupportPage() {

    const [tab, setTab] = useState(false)

    return (
        <div className=' w-full h-full flex flex-col gap-6 ' >
            {!tab && (
                <PageHeader back={true} header="Event Messages" body="View & respond to messages from your supporters" />
            )}
            <EventSupport tab={tab} setTab={setTab} />
        </div>
    )
}
