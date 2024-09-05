import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/shared";
import CommunityCardList from "../../components/shared/communityCardList";
import PageHeader from "../../components/shared/pageHeader";
import { CommunityIcon } from "../../svg";


export default function CommunityPage() {

    const router = useNavigate()

    return (
        <div className=' w-full flex flex-col gap-6 relative ' >
            <div className=" w-full flex items-center justify-between " >
                <PageHeader header="Community" body="Create and Nuture a Close-Knit Community centred around your cause, fostering a sense of belonging among your supporters and strengthening your network. Keep them engaged with push notifications for important updates, changes, and reminders." />
                <div className=" w-fit lg:block hidden text-white ">
                    <CustomButton width="270px" onClick={() => router("/dashboard/community/create")} hasFrontIcon={true} icon={
                        <CommunityIcon />
                    } >
                        Create New Communities
                    </CustomButton>
                </div>
            </div>
            {/* <PageHeader header="Communities" body="Effortless Event Creation and Community Engagement." /> */}
            <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                <CommunityCardList notitle={true} />
                <CommunityCardList title="Communities Curated By Members" />
            </div>
            <div className=" w-fit mt-auto lg:hidden sticky bottom-2 ml-auto mr-6 right-0 ">
                <CustomButton rounded="44px" bgColor="linear-gradient(180deg, #4C49ED 0%, rgba(55, 19, 127, 0.9) 100%)" onClick={() => router("/dashboard/event/create")} hasFrontIcon={true} icon={
                    <CommunityIcon />
                } >
                    Create New Communities
                </CustomButton>
            </div>
        </div>
    )
}
