import { useNavigate } from "react-router-dom";
import EventCardList from "../../components/shared/eventCardList";
import PageHeader from "../../components/shared/pageHeader";
import { CustomButton } from "../../components/shared";
import { EventIcon } from "../../svg";
import { useEventDetail } from "../../global-state/useEventDetails";
import EventCardMembersList from "../../components/shared/eventCardListForMembers";
import { useMap } from "../../global-state/useMapStore";


export default function EventPage() {

    const router = useNavigate()
    const { updateEvent } = useEventDetail((state) => state)
    const { updateMap } = useMap((state) => state);

    const clickHandler = () => {
        updateEvent({} as any)
        updateMap("")
        router("/dashboard/event/create")
    }

    return (
        <div className=' w-full flex flex-col gap-6 flex-1 relative ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Events" body="Effortless Event Creation and Community Engagement." />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton className=" px-3 " width="230px" onClick={clickHandler} hasFrontIcon={true} icon={
                        <EventIcon />
                    } >
                        Create New Event
                    </CustomButton>
                </div>
            </div>
            <div className=" w-full flex flex-col lg:px-0 px-5 gap-6 " >
                <div className=" w-full" >
                    <EventCardList title="Curated Events" details="View Events Created By Your Supporters In Aid of Your Mission. Chat With The Event Creators To Support Their Effort." filter={true} />
                </div>
                <div className=" w-full lg:hidden " >
                    <EventCardMembersList mobile={true} title="Events Curated by members" />
                </div>
                <div className=" w-full lg:block hidden " >
                    <EventCardMembersList title="Events Curated by members" />
                </div>
            </div>
            <div className=" w-fit lg:hidden md:bottom-6 fixed bottom-28 ml-auto mr-6 right-0 ">
                <CustomButton rounded="44px" height="45px" fontSize="14px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={clickHandler} hasFrontIcon={true} icon={
                    <EventIcon size="18px" />
                } >
                    Create New Event
                </CustomButton>
            </div>
        </div>
    )
}