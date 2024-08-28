import CommunityCardList from "../../components/shared/communityCardList";
import PageHeader from "../../components/shared/pageHeader";


export default function CommunityPage() {
    return (
        <div className=' w-full flex flex-col gap-6 ' >
            <PageHeader header="Communities" body="Effortless Event Creation and Community Engagement." />
            <div className=" w-full flex flex-col gap-6 lg:px-0 px-4 " >
                <CommunityCardList notitle={true} />
                <CommunityCardList title="Communities Curated By Members" />
            </div>
        </div>
    )
}
