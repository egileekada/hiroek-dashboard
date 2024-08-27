import { EventSupport } from "../../components/event";
import PageHeader from "../../components/shared/pageHeader";


export default function EventSupportPage() {
    return (
        <div className=' w-full h-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Event Support" body="Effortless Event Creation and Community Engagement." />
            <EventSupport />
        </div>
    )
}
