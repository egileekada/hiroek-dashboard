import EventCardList from "../../components/shared/eventCardList";
import PageHeader from "../../components/shared/pageHeader";


export default function EventPage() {
    return (
        <div className=' w-full flex flex-col gap-6 flex-1 ' >
            <PageHeader header="My Events" body="Effortless Event Creation and Community Engagement." />
            <div className=" w-full flex flex-col lg:px-0 px-5 gap-6 " >
                <EventCardList title="Curated Events" filter={true} />
                <div className=" w-full lg:hidden " >
                    <EventCardList mobile={true} title="Events Curated B`y Members" />
                </div>
                <div className=" w-full lg:block hidden " >
                    <EventCardList title="Events Curated B`y Members" />
                </div>
            </div>
        </div>
    )
}