import EventForm from "../../components/event/eventForm";
import PageHeader from "../../components/shared/pageHeader";


export default function CreateEventPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader back={true} header="Create New Event" body="Effortless Event Creation and Community Engagement." />
            <EventForm />
        </div>
    )
}