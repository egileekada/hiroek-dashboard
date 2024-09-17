import { useNavigate } from "react-router-dom";
import EventCardList from "../../components/shared/eventCardList";
import PageHeader from "../../components/shared/pageHeader";
import { CustomButton } from "../../components/shared";
import { EventIcon } from "../../svg";


export default function EventPage() {

    const router = useNavigate() 
    return (
        <div className=' w-full flex flex-col gap-6 flex-1 relative ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Events" body="Create and Manage Events Seamlessly. Send Push Notifications For Important Updates, Changes, or Reminders Directly to Participants." />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton className=" px-3 " width="200px" onClick={() => router("/dashboard/event/create")} hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        Create New Event
                    </CustomButton>
                </div>
            </div>
            <div className=" w-full flex flex-col lg:px-0 px-5 gap-6 " >
                <EventCardList title="Curated Events" details="View Events Created By Your Supporters In Aid of Your Mission. Chat With The Event Creators To Support Their Effort." filter={true} />
                <div className=" w-full lg:hidden " >
                    <EventCardList mobile={true} title="Events created by members" />
                </div>
                <div className=" w-full lg:block hidden " >
                    <EventCardList title="Events created by members"  />
                </div>
            </div>
            <div className=" w-fit lg:hidden sticky bottom-2 ml-auto mr-6 right-0 ">
                <CustomButton rounded="44px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={() => router("/dashboard/event/create")} hasFrontIcon={true} icon={
                    <EventIcon />
                } >
                    Create New Event
                </CustomButton>
            </div>
        </div>
    )
}