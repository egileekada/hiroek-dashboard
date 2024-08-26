import EventCardList from "../../components/shared/eventCardList";
import PageHeader from "../../components/shared/pageHeader";


export default function EventPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header="My Events" body="Effortless Event Creation and Community Engagement." />
            <EventCardList title="Curated Events" filter={true} />
            <EventCardList title="Events Curated B`y Members" />
        </div>
    )
}